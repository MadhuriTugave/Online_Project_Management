const express = require("express");
const cors = require("cors");
const connection = require("./DB/index")
const app = express();
const dotenv = require("dotenv");
const UserRouter = require("./Routes/UserRoutes");
const ProjectRoute = require("./Routes/PeojectList");
dotenv.config();

const port = process.env.PORT || 5000;

//Middlewares;
app.use(cors());
app.use(express.json());

connection();


// app.use("/",(req,res)=>{
//     res.send("Welcome !!!");
// });

//creating user routes for signup and login
app.use("/User", UserRouter);

// to add a projects in Project List
app.use("/ProjectList",ProjectRoute);



app.listen(port ,()=>{
    console.log(`server is running on ${port}`);
})




