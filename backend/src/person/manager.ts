import { getPersonByID, deletePersonByID, createPerson, updatePersonByID, getPersonInGroupByName, getAllGroupsOfPerson, getAllPeople} from "./repository";
import IPerson from "./interface";
import { personModel } from "./model";

export const getPersonByIDM = (id: string) => {
    return getPersonByID(id);
};

export const getAllPeopleM = () => {
    
    return getAllPeople();
};

export const deletePersonByIDM = (id: string) => {
    return  deletePersonByID(id);
};

export const createPersonM = (person: IPerson) => {
    return createPerson(person);
};

export const updatePersonByIDM = (person: IPerson, id: string) => {
    return updatePersonByID(person, id);
};

export const getPersonInGroupByNameM = (name: string, groupID: string) => {
    return getPersonInGroupByName(name, groupID);
};

export const getAllGroupsOfPersonM = async(id: string) => {
    return await getAllGroupsOfPerson(id);
};

export const populatePeople = () => {
    return personModel.find().populate('groups');
}

