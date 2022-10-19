import axios from "axios";
import IPerson from './interfaces/personInterface';
import IGroup from './interfaces/groupInterface';
import { config } from "../../config";

// לכתוב רק פונציות שמשלבות אנשים וקבוצות, אם לא אז הוא ישתמש בפרוקסי שיעביר אותו לסרביסים בנפרד
// לשנות לשימוש בפונרציות אקסיוס פשוטות בשילוב עם לוגיקה על מנת לבצע את הפעולות למטה
// person:

export const getPersonInGroupByName = async(name: string, groupID: string): Promise<IPerson> => {//
    const person: IPerson =  (await axios.get(`${config.PERSON_API_BASE_URL}person/${name}/${groupID}`)).data;
    return person;
};


export const getAllGroupsOfPerson = async(id: string): Promise<IPerson> => {//
    const person: IPerson =  (await axios.get(`${config.PERSON_API_BASE_URL}person/All/groups/${id}`)).data;
    return person;
};

export const deletePersonByID = async(id: string): Promise<void> => {//
    await axios.delete(`${config.PERSON_API_BASE_URL}person/${id}`);
};

export const createPerson = async(person: IPerson): Promise<void> => {//
    await axios.post(`${config.PERSON_API_BASE_URL}person`, person);
};

export const updatePersonByID = async(id: string, person: IPerson): Promise<void> => {//
    await axios.post(`${config.PERSON_API_BASE_URL}person/update/${id}`, person);
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
    const groupsAndPeopleInGroup: Object = {
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

