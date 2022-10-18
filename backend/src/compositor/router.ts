import express, { Router } from 'express';
import {deletePersonByIDC, createPersonC, updatePersonByIDC, getPersonInGroupByNameC, getAllGroupsOfPersonC, deleteGroupByIDC, updateGroupByIDC, getAllGroupsAndPeopleInGroupC} from "./controller";

const compositorRoute : Router = express.Router();
// להשאיר רק מסובכות

// Group:

compositorRoute.get("/group/All/:id", getAllGroupsAndPeopleInGroupC); // ..

compositorRoute.delete("/group/:id", deleteGroupByIDC); // ..
 
compositorRoute.post("/group/update/:id", updateGroupByIDC); // ..


// Person:

compositorRoute.get("/person/:name/:id", getPersonInGroupByNameC); // ..
compositorRoute.get("/person/All/groups/:id", getAllGroupsOfPersonC); // ..

compositorRoute.delete("/person/:id", deletePersonByIDC); // ..

compositorRoute.post("/person", createPersonC); // ..
compositorRoute.post("/person/update/:id", updatePersonByIDC); // ..

export default compositorRoute;