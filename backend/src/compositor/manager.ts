import axios from "axios";
import IPerson from './interfaces/personInterface';
import IGroup from './interfaces/groupInterface';
import { config } from "../../config";

// לכתוב רק פונציות שמשלבות אנשים וקבוצות, אם לא אז הוא ישתמש בפרוקסי שיעביר אותו לסרביסים בנפרד
// לשנות לשימוש בפונרציות אקסיוס פשוטות בשילוב עם לוגיקה על מנת לבצע את הפעולות למטה
// person:

export const getPersonInGroupByName = async(name: string, groupID: string): Promise<{groups: IGroup[]} | Error> => {

    const personGroups: { groups: IGroup[] } = { groups: [] };
    const group: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${groupID}`)).data;
    
    if(group)
    {
        for(const person of group.people) {
            let personFound: IPerson = (await axios.get(`${config.PERSON_API_BASE_URL}person/${person}`)).data;
            if (personFound && personFound.firstName == name)
            {
                personFound.groups.map( async(personFoundgroup: string) => {
                    let foundGroup: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${personFoundgroup}`)).data;
                    personGroups.groups.push(foundGroup);
                }) 
                return personGroups; // 
            }
        }
    }

    return (new Error("cant find group!!!"));

};


export const getAllGroupsOfPerson = async(id: string): Promise<IGroup[]> => {
    const groupsOfPerson: IGroup[] = [];
    const prs: IPerson = (await axios.get(`${config.PERSON_API_BASE_URL}person/${id}`)).data;
    prs.groups.map( async(group: string) => {
        let foundGroup: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${group}`)).data;
        groupsOfPerson.push(foundGroup);
    })

    return groupsOfPerson;
};

export const deletePersonByID = async(id: string): Promise<void> => {
    const person: IPerson = (await axios.get(`${config.PERSON_API_BASE_URL}person/${id}`)).data;

    if (person?.groups.length == 0)
    {
        await axios.delete(`${config.PERSON_API_BASE_URL}person/${id}`);
    }

    else {
        const personGroups: string[] | undefined = person?.groups;
        personGroups!.forEach(async (group) => {
            const groupToUpdate: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${group}`)).data;
            groupToUpdate?.people.splice(groupToUpdate?.people.indexOf(id), 1);
            await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${group}`, { people: groupToUpdate?.people, groups: groupToUpdate?.groups});
        });

        await axios.delete(`${config.PERSON_API_BASE_URL}person/${id}`);
    }
};

export const createPerson = async(person: IPerson): Promise<void> => {

    const createdPerson: IPerson = (await axios.post(`${config.PERSON_API_BASE_URL}person/simply/create/${person}`)).data;

	createdPerson.groups.forEach( async (group) => {
        const foundGroup : IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${group}`)).data;
        if(foundGroup)
        {
            let name: string = foundGroup.name;
            let groups: string[] = foundGroup.groups;
            let persons: string[] = foundGroup.people; 
            persons.push(createdPerson._id!.toString());
            await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${group}`, { name: name, groups: groups, people: persons });
        }
        else
            console.error("cant find group");
    });
};

export const updatePersonByID = async(id: string, person: IPerson): Promise<void> => {
    const foundPerson: IPerson = (await axios.get(`${config.PERSON_API_BASE_URL}person/${id}`)).data;
    if(foundPerson)
    {
        person.groups.forEach( async (group: string) => {
            const personGroup: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${group}`)).data;
            if(!personGroup?.people.includes(id))
                {
                    const newPersonGroupPeople: string[] | undefined = personGroup?.people; 
                    newPersonGroupPeople?.push(id);
                    await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${group}`, { name: personGroup.name, people: newPersonGroupPeople, groups: personGroup?.groups});
                }
        });

        const allGroups: IGroup[] = (await axios.get(`${config.GROUP_API_BASE_URL}group/AllGroups`)).data;
        allGroups.map(async (groupFromAll) => {
            if((!person.groups.includes(groupFromAll._id!)) && groupFromAll.people.includes(id))
            {
                groupFromAll?.people.splice(groupFromAll?.people.indexOf(id), 1);
                await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${groupFromAll._id}`, { name: groupFromAll.name, people: groupFromAll?.people, groups: groupFromAll?.groups});
            }
        });
    }

    await axios.post(`${config.PERSON_API_BASE_URL}person/update/person/object/${id}`, person);
};

// group: 

export const getAllGroupsAndPeopleInGroup = async(id: string): Promise<any> => {
    const peopleOfGroup: IPerson[] = [];
    const groupsOfGroup: IGroup[] = [];
    const group: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${id}`)).data;
    group.people.map( async (person: string) => {
        let foundPerson: IPerson = (await axios.get(`${config.PERSON_API_BASE_URL}person/${person}`)).data;
        peopleOfGroup.push(foundPerson);
    });
    group.groups.map( async (group: string) => {
        let foundGroup: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${group}`)).data;
        groupsOfGroup.push(foundGroup);
    });
    const groupsAndPeopleInGroup: { people: IPerson[], groups: IGroup[] } = {
        people: peopleOfGroup,
        groups: groupsOfGroup
    }

    return groupsAndPeopleInGroup;
};


export const updateGroupByID = async(groupID: string, group: IGroup): Promise<void> => {
    let foundGroup: IGroup = await axios.get(`${config.GROUP_API_BASE_URL}group/${groupID}`);
    if(foundGroup)
    {
        group.people.forEach( async (person: string) => {
            const groupPerson: IPerson | null = (await axios.get(`${config.PERSON_API_BASE_URL}group/${person}`)).data;
            if(!groupPerson?.groups.includes(groupID))
                {
                    const newGroupPersonGroups: string[] | undefined = groupPerson?.groups; 
                    newGroupPersonGroups?.push(groupID);
                    
                    await axios.post(`${config.PERSON_API_BASE_URL}person/update/person/object/${person}`, { firstName: groupPerson?.firstName,
                        lastName: groupPerson?.lastName, age: groupPerson?.age, groups: newGroupPersonGroups});
                }
        });

        const allPeople: IPerson[] = (await axios.get(`${config.PERSON_API_BASE_URL}person/All/The/People`)).data;
        allPeople.map(async (personFromAll) => {
            if((!group.people.includes(personFromAll._id!)) && personFromAll.groups.includes(groupID))
            {
                personFromAll?.groups.splice(personFromAll?.groups.indexOf(groupID), 1);
                await axios.post(`${config.PERSON_API_BASE_URL}person/update/person/object/${personFromAll._id}`, { firstName: personFromAll?.firstName,
                    lastName: personFromAll?.lastName, age: personFromAll?.age, groups: personFromAll.groups});
            }
        });
    }

    await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${groupID}`, group);
};

export const deleteGroupByID = async(id: string): Promise<void> => {
    const group: IGroup = (await axios.get(`${config.GROUP_API_BASE_URL}group/${id}`)).data;

    const allPeople: IPerson[] = (await axios.get(`${config.PERSON_API_BASE_URL}person/All/The/People`)).data;
            
    allPeople.map(async (personFromAll) => {
        if(personFromAll.groups.includes(group._id!))
        personFromAll?.groups.splice(personFromAll?.groups.indexOf(group._id!), 1);
        await axios.post(`${config.PERSON_API_BASE_URL}person/update/person/object/${personFromAll._id}`, { firstName: personFromAll.firstName, lastName: personFromAll.lastName,
            age: personFromAll.age, groups: personFromAll?.groups});
    });

    if (group?.groups.length == 0)
    {
        await axios.delete(`${config.GROUP_API_BASE_URL}group/${id}`);
        return;
    }

    else {
        const groups: string[] | undefined = group?.groups;
        groups?.forEach(async (group) => {
            await axios.delete(`${config.GROUP_API_BASE_URL}group/${group}`);
            
            const allGroups: IGroup[] = (await axios.get(`${config.GROUP_API_BASE_URL}group/AllGroups`)).data;
            
            allGroups.map(async (groupFromAll) => {
                if(groupFromAll.groups.includes(group))
                    groupFromAll?.groups.splice(groupFromAll?.groups.indexOf(group), 1);

                    await axios.post(`${config.GROUP_API_BASE_URL}group/update/group/object/${groupFromAll._id}`, { people: groupFromAll?.people, groups: groupFromAll?.groups});
            });
        });

        await axios.delete(`${config.GROUP_API_BASE_URL}group/${id}`);
    }
};

