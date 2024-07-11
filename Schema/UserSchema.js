const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique: true
    },
    password_hashed:{
        type: String,
        required : true
    },
    AllProjects:[
        {
            
            ProjectName:{
                type: String,
                required: true
            },
            Reason:{
                type: String,
                required: true
            },
            Type:{
                type: String,
                required: true
            },
            Division:{
                type: String,
                required: true
            },
            Category:{
                type: String,
                required: true
            },
            Priority:{
                type: String,
                required: true
            },
            Department:{
                type: String,
                required: true
            },
            Location:{
                type: String,
                required: true
            },
            status:{
                type: String,
                required: true
            },
            StartDate:{
                type : Date,
                require:true
            },
            EndDate:{
                type : Date,
                require:true
            }
          
        }
    ]
});

const User = mongoose.model("UserProject",UserSchema);


module.exports={ User }



