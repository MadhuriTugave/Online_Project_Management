const express = require ("express");
const controller = require("../Controllers/ProjectListController");

const ProjectRoute = express.Router();

//to post a project in thet specific user account
ProjectRoute.post("/:id", controller.AddProjects);

//to get all the Projects of that specific user
ProjectRoute.get("/:id",controller.GetProjects);


module.exports = ProjectRoute;