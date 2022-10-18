import express, { Router } from 'express';
import { getPersonByIDC, deletePersonByIDC, createPersonC, updatePersonByIDC, getPersonInGroupByNameC, getAllGroupsOfPersonC, getPopulatedPeople, getAllPeopleC } from "./controller"

const personRoute: Router = express.Router();
  
personRoute.get("/All/The/People", getAllPeopleC); // 
personRoute.get("/:id", getPersonByIDC); //
personRoute.get("/:name/:id", getPersonInGroupByNameC); // ..
personRoute.get("/All/groups/:id", getAllGroupsOfPersonC); // ..
personRoute.get("/populated", getPopulatedPeople); // ..

personRoute.delete("/:id", deletePersonByIDC); // ..

personRoute.post("/", createPersonC); // ..
personRoute.post("/update/:id", updatePersonByIDC); // ..

export default personRoute;