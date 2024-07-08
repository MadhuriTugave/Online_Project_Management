const mongoose =require("mongoose");

require("dotenv").config();

const MONGODB_URL= process.env.MONGODB_URL ;

module.exports = connection = async ()=>{
    await mongoose.connect(MONGODB_URL, { authSource: "admin" },{ useNewUrlParser: true, useUnifiedTopology: true })
     .then(()=>{
      console.log("Connected to MongoDB !!!");
     })
     .catch(err => console.log(err));
    }

