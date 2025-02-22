
const { User } = require("../Schema/UserSchema");
const ObjectId = require("mongoose").Types.ObjectId;


 const AddProjects = async(req ,res)=>{
    // console.log(req.body)
    // console.log(req.params);
   try {
     const { theme,reason,category,startDate,type,priority,endDate,department,location,status,division} = req.body;
 
     const id = req.user._id;
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
  // console.log(req.user._id ,"user");
      try {
        const id = req.user._id;
        // console.log(req)
   
    const projects = await User.findById(id).select("AllProjects")
    // console.log(projects.AllProjects.length)

      //if No Project has created then it will give this error
    if (projects.AllProjects.length === 0) {
        return res.status(404).json({ message: 'You havent created any project !!!' });
      }

    // sending project list as a json   
    res.status(200).json(projects.AllProjects);

      } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

const UpdateStates = async(req, res)=>{
   
    const id = req.user._id;
//     console.log(id , req.body )
// console.log(req.params.id)
  
    try {
const user = await User.findById(id);

const projectIndex = user.AllProjects.findIndex(project => project._id.toString() === req.params.id);
// console.log(projectIndex)
if (projectIndex === -1) {
  return res.status(404).json({message:'Project not found'});
}


 user.AllProjects[projectIndex].status = req.body.status; 

// Save the updated user document
await user.save();

res.json(user.AllProjects[projectIndex]);
       
       
   
    } catch (error) {
      res.status(500).json("server error");
    }
   
}

const Department = async (req, res) => {
  try {
    const id = req.user._id;
    // const user = await User.findById(id);
    // console.log(id)
      const results = await User.aggregate([
        { $match: { _id: new ObjectId(id) } },
          { $unwind: '$AllProjects' },
          {
              $group: {
                  _id: '$AllProjects.Department',
                  total_registered: { $sum: 1 },
                  total_closed: { $sum: { $cond: [{ $eq: ['$AllProjects.status', 'Closed'] }, 1, 0] } }
              }
          }
      ]);
// console.log(results);
      const data = results.map(result => ({
          department: result._id,
          total_registered: result.total_registered,
          total_closed: result.total_closed
      }));

      res.json(data);
  } catch (error) {
      // console.error(error);
      res.status(500).json('Server error');
  }
}

const searchResult = async (req, res)=>{
        //  console.log(req.query)
         try {
          const id = req.user._id;
           let searchValue = req.query.query;
           const capitalizeFirstLetter = (str) => {
            if (str.length === 0) return str; // handleing empty string
            return str.charAt(0).toUpperCase() + str.slice(1);
          };
          const capitalizedString = capitalizeFirstLetter(searchValue);
          // console.log(capitalizedString)
       
           const user = await User.findById(id);

    //  console.log(searchValue ,";;;;")
         const results = user.AllProjects.filter(project => {
          return (
            project.ProjectName.includes(capitalizedString) ||
            project.Reason.includes(capitalizedString) ||
            project.Category.includes(capitalizedString) ||
            project.Type.includes(capitalizedString) ||
            project.Priority.includes(capitalizedString) ||
            project.Department.includes(capitalizedString) ||
            project.Location.includes(capitalizedString) ||
            project.status.includes(capitalizedString) ||
            project.Division.includes(capitalizedString) ||
            (project.StartDate instanceof Date && project.StartDate.toISOString().includes(capitalizedString)) || // Check if StartDate is a Date object
            (project.EndDate instanceof Date && project.EndDate.toISOString().includes(capitalizedString)) // Check if EndDate is a Date object
          );
        });
      
            // console.log(results)
          res.json(results)
         } catch (error) {
          console.log(error);
         }


}

const GetCardData = async(req,res)=>{
       try {
        const id = req.user._id;
        const results = await User.aggregate([
          { $match: { _id: new ObjectId(id) } },
            { $unwind: '$AllProjects' },
            {
                $group: {
                 _id :null,
                    total_Projects:{$sum : 1},
                    total_Cancelled: { $sum: { $cond: [{ $eq: ['$AllProjects.status', 'Cancelled'] }, 1, 0] } },
                    total_Running: { $sum: { $cond: [{ $eq: ['$AllProjects.status', 'Running'] }, 1, 0] } },
                    total_Closed: { $sum: { $cond: [{ $eq: ['$AllProjects.status', 'Closed'] }, 1, 0] } },
                    total_delay: { $sum: { $cond: [{
                       $and: [ { $eq :['$AllProjects.status', 'Running'] },
                        { $lt: ['$AllProjects.EndDate', new Date()] }
                       ] }, 1, 0] } }
                }
            }
        ]); 
       res.status(201).json(results);   
       } catch (error) {
         console.log(error);
       }
}


module.exports={AddProjects,GetProjects , UpdateStates, Department ,searchResult , GetCardData};