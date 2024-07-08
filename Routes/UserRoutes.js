const express = require ("express");
const controller = require("../Controllers/UserController");
const authenticateToken = require("../Authenticate");

const UserRouter = express.Router();

UserRouter.post("/SignUp", controller.SignUp);

UserRouter.post("/Login", controller.Login);

UserRouter.use("/me",authenticateToken);



module.exports = UserRouter;