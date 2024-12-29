import User from "../models/UserSChema.js";
import Coach from "../models/Coach.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Sign Up
export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, phoneNumber, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorResponse("An account with this Email already exists", 409);
  }

  const hash = await bcrypt.hash(password, 10);
  const profileImage = req.file ? req.file.path : null;

  const newUser = await User.create({
    name,
    email,
    password: hash,
    phoneNumber,
    role,
    profileImage,
  });

  // Create a Coach profile if the role is "Coach"
  if (role === "Coach") {
    await Coach.create({
      user: newUser._id,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
      sportType: [], // Initialize sportType as an empty array
      experience: 0, // Default experience
      bio: "", // Default bio
    });
  }

  const token = jwt.sign(
    { uid: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 60 * 1000,
  });

  res.status(201).send({ token, role: newUser.role });
});

// Sign In
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new ErrorResponse("Email does not exist", 404);
  }

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) {
    throw new ErrorResponse("Password is incorrect", 401);
  }

  const token = jwt.sign(
    { uid: existingUser._id, role: existingUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  res.cookie("token", token, {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  }); // 30mn
  res.send({ status: "logged in", role: existingUser.role });
});

// Get User (protected route)
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }
  res.json(user);
});

// Logout
export const signOut = asyncHandler(async (req, res, next) => {
  //res.clearCookie("token");
  res.clearCookie("token", {
    maxAge: 1800000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  }); // 30mn
  res.send({ status: "logged out" });
});
