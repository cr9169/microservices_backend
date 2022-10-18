import axios from "axios";
import IPerson from './interfaces/personInterface';
import IGroup from './interfaces/groupInterface';
import { config } from "../../config";

// AXIOS =>

// person:

export const getPersonInGroupByName = async(name: string, groupID: string): Promise<IPerson> => {
    const person: IPerson = await (await axios.get(`${config.PERSON_API_BASE_URL}person/${name}/${groupID}`)).data;
    return person;
};

export const getAllGroupsOfPerson = async(id: string): Promise<IPerson> => {
    const person: IPerson = await (await axios.get(`${config.PERSON_API_BASE_URL}person/All/groups/${id}`)).data;
    return person;
};

export const getPopulatedPeople = async(): Promise<IPerson> => {
    const person: IPerson = await (await axios.get(`${config.PERSON_API_BASE_URL}person/populated`)).data;
    return person;
};

export const deletePersonByID = async(id: string): Promise<void> => {
    await axios.delete(`${config.PERSON_API_BASE_URL}person/${id}`);
};

export const createPerson = async(person: IPerson): Promise<void> => {
    await axios.post(`${config.PERSON_API_BASE_URL}person`, person);
};

export const updatePersonByID = async(id: string, person: IPerson): Promise<void> => {
    await axios.post(`${config.PERSON_API_BASE_URL}person/update/${id}`, person);
};


// group: 

export const getAllGroupsAndPeopleInGroup = async(id: string): Promise<any> => {
    const groupsAndPeople = await axios.get(`${config.GROUP_API_BASE_URL}/group/All/${id}`);
    return groupsAndPeople;
};

export const getPopulatedGroups = async(): Promise<any> => {
    const populatedGroups = await axios.get(`${config.GROUP_API_BASE_URL}/group/populated`);
    return populatedGroups;
};

export const updateGroupByID = async(id: string, group: IGroup): Promise<void> => {
    await axios.post(`${config.GROUP_API_BASE_URL}group/update/${id}`, group);
};

export const deleteGroupByID = async(id: string): Promise<void> => {
    await axios.delete(`${config.GROUP_API_BASE_URL}group/${id}`);
};


// PROXY => 