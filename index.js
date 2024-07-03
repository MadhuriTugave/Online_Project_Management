const express = require("express");
const cors = require("cors");
const connection = require("./DB/index")
const app = express();
const dotenv = require("dotenv")
dotenv.config();

const port = process.env.PORT || 5000;

//Middlewares;
app.use(cors());
app.use(express.json());

app.use("/",(req,res)=>{
    res.send("Welcome !!!");
})



app.listen(port ,()=>{
    console.log(`server is running on ${port}`);
})
