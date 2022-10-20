import express from "express";
import {getPersonInGroupByName, getAllGroupsOfPerson, deletePersonByID, createPerson, updatePersonByID, getAllGroupsAndPeopleInGroup, updateGroupByID, deleteGroupByID} from "./manager"

// Person

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



// Group 

export const deleteGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deleteGroupByID(req.params.id));
};

export const updateGroupByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updateGroupByID(req.params.id, req.body));
};

export const getAllGroupsAndPeopleInGroupC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsAndPeopleInGroup(req.params.id));
};
