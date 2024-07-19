
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Schema/UserSchema");
const KEY = process.env.JWT_SECRET_KEY;
// console.log(KEY);


const SignUp = async (req,res)=>{
    // console.log(req.body.email, req.body.password)
    try {
      const {email , password}= req.body;
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "User already exists, Please Login" }); // 409 Conflict
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
 
 
      // Save the user to the database
      const userCreated = await User.create({email:email,  password_hashed: hashedPassword});

      // Create a Response object to send back to the client with sensitive data excluded
      const responseUser = {
        _id: userCreated._id,
        email: email,
      };

      // Generate an access token for the newly created user
      const accessToken = jwt.sign(
        { _id: userCreated._id },
        KEY,
        {
          expiresIn: "1h",
        }
      );
  
      // Send the response back to the client
      res.status(201).json({
        success: true,
        message: "Successfully SignUp !!!",
        user: responseUser,
        access_token: accessToken,
        token_type: "Bearer",
        expiresIn: "3600",
      });
     
      
        } catch (err) {
          
          res.status(500).json({ success: false, message: "Error registering user" });
        }
}

const Login = async(req,res)=>{
  console.log(req.body.email)

   try {
    // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(emailRegex.test(req.body.email)){
    const user = await  User.findOne({email:req.body.email});
  // console.log(user)
    if(!user){
      // Hash the password
     const hashedPassword = await bcrypt.hash( req.body.password, 12);
       // Save the user to the database
       const userCreated = await User.create({email:req.body.email,  password_hashed: hashedPassword});
        // Create a Response object to send back to the client with sensitive data excluded
     const responseUser = {
       _id: userCreated._id,
       email: req.body.email,
     };

     // Generate an access token for the newly created user
     const accessToken = jwt.sign(
       { _id: userCreated._id },
       KEY,
       {
         expiresIn: "1h",
       }
     );
 
     // Send the response back to the client
     res.status(201).json({
       user: responseUser,
       access_token: accessToken,
       token_type: "Bearer",
       expiresIn: "3600",
     });
    
         }else{

           const isPasswordMatch = await bcrypt.compare(
             req.body.password,
             user.password_hashed
          ) 
         //  console.log(isPasswordMatch)
          if (!isPasswordMatch) {
             return res
               .status(401)
               .json({ success: false, message: "Invalid Credentials" }); // 401 Unauthorized
           }
            // Create a Response object to send back to the client with sensitive data excluded
            const responseUser = {
             _id: user._id,
             email: user.email,
           };
           // Generate an access token for the user
           const accessToken = jwt.sign({ _id: user._id }, KEY, {
             expiresIn: "1h",
           });
            // Send the response back to the client
            res.status(200).json({
             user: responseUser,
             access_token: accessToken,
             token_type: "Bearer",
             expiresIn: "3600",
           });

         }
   
  } else{
    res.status(401).json({
     success: false,
      message: "Invalid credentials "
    });
  }  
   } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Invalid credentials " });
   }

}

module.exports = { SignUp, Login };