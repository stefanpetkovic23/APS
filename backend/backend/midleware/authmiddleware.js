const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the request contains a valid JWT in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Decode the token to get user information
      const decoded = jwt.verify(token, "12313");

      // Retrieve the user from the database based on the decoded user ID
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  // If no valid token is found
  if (!token) {
    res.status(401).json({ error: "Not authorized, no token" });
  }
});

module.exports = { protect };
