import { personModel } from "./model";
import IPerson from "./interface";
import { groupModel } from "../group/model";
import IGroup from "../group/interface";

export const getPersonByID = (id: string) => {
    
    return personModel.findById(id) 
};

export const deletePersonByID = async (id: string) => {
    const person = await personModel.findById(id);

    if (person?.groups.length == 0)
        return personModel.findOneAndRemove({_id:id});

    const personGroups: string[] | undefined = person?.groups;
    personGroups!.forEach(async (group) => {
        const groupToUpdate: IGroup | null = await groupModel.findById(group);
        groupToUpdate?.people.splice(groupToUpdate?.people.indexOf(id), 1);
        await groupModel.updateOne({_id: group}, { people: groupToUpdate?.people, groups: groupToUpdate?.groups});
    });

    return personModel.findOneAndRemove({_id:id});
};

export const createPerson = async (person: IPerson) => {
    
    const createdPerson: IPerson = await personModel.create(person);

	createdPerson.groups.forEach( async (group) => {
        const foundGroup : IGroup | null = await groupModel.findById(group);
        if(foundGroup)
        {
            let name: string = foundGroup.name;
            let groups: string[] = foundGroup.groups;
            let persons: string[] = foundGroup.people; 
            persons.push(createdPerson._id!.toString());
            await groupModel.updateOne({_id: group}, { name: name, groups: groups, people: persons });
        }
        else
            console.error("cant find group");
    });
};

export const updatePersonByID = async (person: IPerson, id: string) => { // check if the actuall function is the problem in the backend (or the frontend)
    const foundPerson = await personModel.findById(id);
    if(foundPerson)
    {
        person.groups.forEach( async (group: string) => {
            const personGroup: IGroup | null = await groupModel.findById(group);
            if(!personGroup?.people.includes(id))
                {
                    const newPersonGroupPeople: string[] | undefined = personGroup?.people; 
                    newPersonGroupPeople?.push(id);
                    await groupModel.updateOne({_id: group}, { people: newPersonGroupPeople, groups: personGroup?.groups});
                }
        });

        const allGroups: IGroup[] = await groupModel.find({});
        allGroups.map(async (groupFromAll) => {
            if((!person.groups.includes(groupFromAll._id!)) && groupFromAll.people.includes(id))
            {
                groupFromAll?.people.splice(groupFromAll?.people.indexOf(id), 1);
                await groupModel.updateOne({_id: groupFromAll._id}, { people: groupFromAll?.people, groups: groupFromAll?.groups});
            }
        });
    }

    return personModel.updateOne({_id: id}, person);
};

export const updatePersonObjectByID = async (person: IPerson, id: string) => { // check if the actuall function is the problem in the backend (or the frontend)
    return personModel.updateOne({_id: id}, person);
};

export const getPersonInGroupByName = async (name: string, groupID: string) => {
    let personFound: IPerson | null = null;
    const group = await groupModel.findById(groupID);
    
    if(!group) {
        return 'group not found';
    }
    for(const person of group.people) {
        personFound = await personModel.findById(person);
        if (personFound && personFound.firstName == name)
            return personModel.findById(person).populate('groups');
    }
};

export const getAllGroupsOfPerson = async (id: string) => {
    const prs = await personModel.findById(id).populate('groups');
    console.log(prs);
    return prs;
};

export const getAllPeople = () => {
    
    return personModel.find({});
}