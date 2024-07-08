const { User } = require("../Schema/UserSchema");
const ObjectId = require("mongoose").Types.ObjectId;

 const AddProjects = async(req ,res)=>{
    // console.log(req.body)
    // console.log(req.params);
   try {
     const { theme,reason,category,startDate,type,priority,endDate,department,location,status,division} = req.body;
 
     const { id } = req.params;
     const user = await User.findOne({_id :id});
    //  console.log(user);
 
     await User.updateOne(
         { _id: id },
         { $push: { AllProjects : { _id: new ObjectId(),
            ProjectName :theme,
            Reason:reason ,
            Category :category ,
             StartDate :startDate,
             Type:type,
             Priority: priority,
             EndDate :endDate,
             Department :department,
             Location:location,
             status:status,
             Division :division,
         } }}
       );
       res.status(201).json({ message: "Project successfully added !!! "});
   } catch (error) {
    // console.log(error);
    res.status(500).json({
        message: "Server error",
       });
   }

}
const GetProjects = async (req,res)=>{
      try {
        const {id} = req.params;
   
    const projects = await User.findById(id).select("AllProjects")
    console.log(projects.AllProjects.length)

      //if No Project has created then it will give this error
    if (projects.AllProjects.length === 0) {
        return res.status(404).json({ message: 'You havent created any project !!!' });
      }

    // sending project as a json   
    res.status(200).json(projects.AllProjects);

      } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports={AddProjects,GetProjects};