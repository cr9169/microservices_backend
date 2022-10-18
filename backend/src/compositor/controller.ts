import express from "express";
import {deleteGroupByID, getPersonInGroupByName, getAllGroupsOfPerson, getPopulatedPeople, deletePersonByID, createPerson, updatePersonByID, getAllGroupsAndPeopleInGroup, getPopulatedGroups, updateGroupByID, getPersonByID, getAllPeople, getGroupByID, getAllGroups, createGroup} from "./manager"

// Person

export const getPersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonByID(req.params.id));
};

export const getAllPeopleC = async (req:express.Request, res:express.Response) => {
    
    res.json(await getAllPeople());
};

export const deletePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deletePersonByID(req.params.id));
};

export const createPersonC = async (req:express.Request, res:express.Response) => {
    
    res.json(await createPerson(req.body));
};

export const updatePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updatePersonByID(req.params.id, req.body));
};

export const getPersonInGroupByNameC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonInGroupByName(req.params.name, req.params.id));
};

export const getAllGroupsOfPersonC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsOfPerson(req.params.id));
};

export const getPopulatedPeopleC = async (req:express.Request, res:express.Response) => {
    res.json(await getPopulatedPeople());
};


// Group 

export const getGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getGroupByID(req.params.id));
};

export const getAllGroupsC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroups());
};

export const deleteGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deleteGroupByID(req.params.id));
};

export const createGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await createGroup(req.body.name));
};

export const updateGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updateGroupByID(req.params.id, req.body));
};

export const getAllGroupsAndPeopleInGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsAndPeopleInGroup(req.params.id));
};

export const getPopulatedGroupsC = async (req:express.Request, res:express.Response) => {
    res.json(await getPopulatedGroups());
};