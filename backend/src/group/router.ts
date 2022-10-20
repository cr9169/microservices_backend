import express, { Router } from 'express';
import { getGroupByIDC, deleteGroupByIDRagularC, deleteGroupByIDC, createGroupC, updateGroupByIDC, getAllGroupsAndPeopleInGroupC, getPopulatedGroups, getAllGroupsC, updateGroupObjectByIDC } from "./controller";

const groupRoute : Router = express.Router();

groupRoute.get("/AllGroups", getAllGroupsC); //
groupRoute.get("/:id", getGroupByIDC); //
groupRoute.get("/All/:id", getAllGroupsAndPeopleInGroupC); // ..
groupRoute.get("/populated", getPopulatedGroups); // .. 

groupRoute.delete("/:id", deleteGroupByIDC); //
groupRoute.delete("/ragular/:id", deleteGroupByIDRagularC); //

groupRoute.post("/", createGroupC); //
groupRoute.post("/update/:id", updateGroupByIDC); // ..
groupRoute.post("/update/group/object/:id", updateGroupObjectByIDC); // 


export default groupRoute;