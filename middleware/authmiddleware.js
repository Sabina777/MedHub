import jwt from "jsonwebtoken";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
const protect = asyncHandler(async (req, res, next) => {
  //declare the variable

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get the token from the header]
      token = req.headers.authorization.split(" ")[1];
      //decode the token using jwt
      const decoded = jwt.verify(token, "sabmar123");
      //find the req user by decoded id
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("not authorized ,no token found");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized ,no token found");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    // console.log(req.user);
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
