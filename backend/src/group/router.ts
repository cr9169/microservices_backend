import express, { Router } from 'express';
import { getGroupByIDC, deleteGroupByIDC, createGroupC, updateGroupByIDC, getAllGroupsAndPeopleInGroupC, getPopulatedGroups, getAllGroupsC } from "./controller";

const groupRoute : Router = express.Router();

groupRoute.get("/AllGroups", getAllGroupsC); //
groupRoute.get("/:id", getGroupByIDC); //
groupRoute.get("/All/:id", getAllGroupsAndPeopleInGroupC); // ..
groupRoute.get("/populated", getPopulatedGroups); // .. 

groupRoute.delete("/:id", deleteGroupByIDC); //
  
groupRoute.post("/", createGroupC); //
groupRoute.post("/update/:id", updateGroupByIDC); // ..

export default groupRoute;