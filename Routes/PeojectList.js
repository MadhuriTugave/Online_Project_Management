const express = require ("express");
const controller = require("../Controllers/ProjectListController");

const ProjectRoute = express.Router();

//to post a project in thet specific user account
ProjectRoute.post("/", controller.AddProjects);

//to get all the Projects of that specific user
ProjectRoute.get("/",controller.GetProjects);

//to get all the Projects of that specific user
ProjectRoute.put("/:id",controller.UpdateStates);

module.exports = ProjectRoute;