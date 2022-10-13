import { groupModel } from "./model";
import IGroup from "./interface";
import { personModel } from "../person/model";
import IPerson from "../person/interface";

export const deleteGroupByID = async (id: string | null | undefined) => {
    const group = await groupModel.findById(id);

    await personModel.find({} , (err: Error, allPeople: IPerson[]) => {
        if(err)
            console.log("error in getting documents");
            
            allPeople.map(async (personFromAll) => {
            if(personFromAll.groups.includes(group?._id))
            personFromAll?.groups.splice(personFromAll?.groups.indexOf(group?._id), 1);
                await personModel.updateOne({_id: personFromAll._id}, { firstName: personFromAll.firstName, lastName: personFromAll.lastName,
                    age: personFromAll.age, groups: personFromAll?.groups});
        })
    })

    if (group?.groups.length == 0)
        return groupModel.findOneAndRemove({_id:id});

    else {
        const groups: string[] | undefined = group?.groups;
        groups?.forEach(async (group) => {
            await groupModel.findOneAndRemove({_id:group});
            await groupModel.find({} , (err: Error, allGroups: IGroup[]) => {
                if(err)
                    console.log("error in getting documents");
                    
                allGroups.map(async (groupFromAll) => {
                    if(groupFromAll.groups.includes(group))
                        groupFromAll?.groups.splice(groupFromAll?.groups.indexOf(group), 1);
                        await groupModel.updateOne({_id: groupFromAll._id}, { people: groupFromAll?.people, groups: groupFromAll?.groups});
                })
            })
        });

        return await groupModel.findOneAndRemove({_id:id});
    }

    // see if return is needed here
}


export const createGroup = (groupName: string) => { 

    return groupModel.create({name: groupName,
                              persons: [], 
                              groups: []}); 
};

export const updateGroupByID = async (group: IGroup, groupID: string) => { // update also groups of group 
    const foundGroup = await groupModel.findById(groupID);
    if(foundGroup)
    {
        group.people.forEach( async (person: string) => {
            const groupPerson: IPerson | null = await personModel.findById(person);
            if(!groupPerson?.groups.includes(groupID))
                {
                    const newGroupPersonGroups: string[] | undefined = groupPerson?.groups; 
                    newGroupPersonGroups?.push(groupID);
                    await personModel.updateOne({_id: person}, { firstName: groupPerson?.firstName,
                        lastName: groupPerson?.lastName, age: groupPerson?.age, groups: newGroupPersonGroups});
                }
        });

        const allPeople: IPerson[] = await personModel.find({});
        allPeople.map(async (personFromAll) => {
            if((!group.people.includes(personFromAll._id!)) && personFromAll.groups.includes(groupID))
            {
                personFromAll?.groups.splice(personFromAll?.groups.indexOf(groupID), 1);
                await personModel.updateOne({_id: personFromAll._id}, { firstName: personFromAll?.firstName,
                    lastName: personFromAll?.lastName, age: personFromAll?.age, groups: personFromAll.groups});
            }
        });
    }
    return groupModel.updateOne({_id: groupID}, group);
}

export const getAllGroupsAndPeopleInGroup = async (id: string) => {
    return groupModel.findById(id).populate('groups').populate('people');
};

export const getGroupByID = (id: string) => {
    return groupModel.findById(id); 
};

export const getAllGroups = () => {
    return groupModel.find({}); 
};