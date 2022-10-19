import { getPersonByIDM, deletePersonByIDM, createPersonM, updatePersonByIDM, getPersonInGroupByNameM, getAllGroupsOfPersonM, populatePeople, getAllPeopleM, updatePersonObjectByIDM, simplyCreatePersonM } from "./manager";
import express from "express";

export const getPersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonByIDM(req.params.id));
};

export const getAllPeopleC = async (req:express.Request, res:express.Response) => {
    
    res.json(await getAllPeopleM());
};

export const deletePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await deletePersonByIDM(req.params.id));
};

export const simplyCreatePersonC = async (req:express.Request, res:express.Response) => {
    
    res.json(await simplyCreatePersonM(req.body));
};

export const createPersonC = async (req:express.Request, res:express.Response) => {
    
    res.json(await createPersonM(req.body));
};

export const updatePersonByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updatePersonByIDM(req.body, req.params.id));
};

export const updatePersonObjectByIDC = async (req:express.Request, res:express.Response) => {
    res.json(await updatePersonObjectByIDM(req.body, req.params.id));
};

export const getPersonInGroupByNameC = async (req:express.Request, res:express.Response) => {
    res.json(await getPersonInGroupByNameM(req.params.name, req.params.id));
};

export const getAllGroupsOfPersonC = async (req:express.Request, res:express.Response) => {
    res.json(await getAllGroupsOfPersonM(req.params.id));
};

export const getPopulatedPeople = async (req:express.Request, res:express.Response) => {
    res.json(await populatePeople());
};