const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../Schema/UserSchema");
const ObjectId = require("mongoose").Types.ObjectId;

// Initialize dotenv to load environment variables from.env file
dotenv.config();
const KEY = process.env.JWT_SECRET_KEY
const authenticateToken = (req, res, next) => {
  // Accept the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // 401 Unauthorized
  }

  jwt.verify(token,KEY, async (err, user) => {
    if (err) {
      return res.sendStatus(403); // 403 Forbidden
    }

    // If user does not exist return 404 Not Found
    if (!user) {
      // If no user exists with the given ID return 401 unauthorized
      return res.sendStatus(401); // 401 Unauthorized
    }

    // Fetch the user with the given ID
    const UserData = await Users.findOne(
      { _id: new ObjectId(user._id) },
      { projection: { password_hashed: 0 } }
    );

    // Set the user object on the request object
    req.user = UserData;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;