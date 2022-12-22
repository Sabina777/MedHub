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

//@desc- get users profiles
//@route -GET /api/users/profile
//@access -private
const getUsersProfile = asyncHandler(async (req, res) => {
  //find the user by the req.user.id from the protect middleware
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc- update the user profile
//@route -PUT /api/users/profile
//@access -private

const updateUserProfile = asyncHandler(async (req, res) => {
  //find the user by the req.user.id from the protect middleware
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc- get all users
//@route -GET /api/users/
//@access -private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc- get user by id and update
//@route -GET /api/users/:id
//@access -private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc- update the user profile
//@route -PUT /api/users/profile
//@access -private

const updateUser = asyncHandler(async (req, res) => {
  //find the user by the req.user.id from the protect middleware
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});
//@desc- delete the user
//@route -DELETE /api/users/:id
//@access -private
const deleteUser = asyncHandler(async (req, res) => {
  //find all the users
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ msg: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUsersProfile, updateUserProfile };
