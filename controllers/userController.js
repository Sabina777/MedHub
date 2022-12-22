import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
//@desc- get auth user and token
//@route -POST /api/user/login
//@access -private

const authUser = asyncHandler(async (req, res) => {
  //get the user inputs from req body
  const { email, password } = req.body;
  //find user with the same email
  const user = await User.findOne({ email });

  //if the user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc- register the new user
//@route -POST /api/users/create
//@access -public
const registerUser = asyncHandler(async (req, res) => {
  //get the user inputs from req body
  const { name, email, password, role } = req.body;
  //find user with the same email
  const existUser = await User.findOne({ email: email });

  //if the user already exists , then throw the error
  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  //else create the new user

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //after the user is created, return json data
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser };
