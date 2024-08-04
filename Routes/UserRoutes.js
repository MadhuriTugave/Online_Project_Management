const express = require ("express");
const controller = require("../Controllers/UserController");


const UserRouter = express.Router();

//signup user
UserRouter.post("/SignUp", controller.SignUp);

//login User
UserRouter.post("/Login", controller.Login);

// to to forgotpassword
UserRouter.post("/ForgotPassword" , controller.ForgotPassword);

//to reset a password
UserRouter.post("/reset_Password/:id/:token" , controller.ResetPassword);



module.exports = UserRouter;