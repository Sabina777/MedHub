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

export { authUser };
