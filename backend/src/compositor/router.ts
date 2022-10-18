import express, { Router } from 'express';
import {getPersonInGroupByNameC, getAllGroupsOfPersonC, getPopulatedPeopleC, deletePersonByIDC, createPersonC, updatePersonByIDC, getAllGroupsAndPeopleInGroupC, getPopulatedGroupsC, updateGroupByIDC, deleteGroupByIDC} from "./controller";

const compositorRoute : Router = express.Router();

// Group:

compositorRoute.get("/group/AllGroups", getAllGroupsC); // 
compositorRoute.get("/group/:id", getGroupByIDC); //
compositorRoute.get("/group/All/:id", getAllGroupsAndPeopleInGroupC); // ..
compositorRoute.get("/group/populated", getPopulatedGroupsC); // ..

compositorRoute.delete("/group/:id", deleteGroupByIDC); //
  
compositorRoute.post("/group", createGroupC); //
compositorRoute.post("/group/update/:id", updateGroupByIDC); // ..


// Person:

compositorRoute.get("/person/All/The/People", getAllPeopleC);
compositorRoute.get("/person/:id", getPersonByIDC); //
compositorRoute.get("/person/:name/:id", getPersonInGroupByNameC); // ..
compositorRoute.get("/person/All/groups/:id", getAllGroupsOfPersonC); // ..
compositorRoute.get("/person/populated", getPopulatedPeopleC); // ..

compositorRoute.delete("/person/:id", deletePersonByIDC); // ..

compositorRoute.post("/person", createPersonC); // ..
compositorRoute.post("/person/update/:id", updatePersonByIDC); // ..
export default compositorRoute;