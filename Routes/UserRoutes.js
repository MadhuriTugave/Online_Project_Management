const express = require ("express");
const controller = require("../Controllers/UserController");


const UserRouter = express.Router();

UserRouter.post("/SignUp", controller.SignUp);

UserRouter.post("/Login", controller.Login);





module.exports = UserRouter;