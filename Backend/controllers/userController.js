import User from '../models/UserSChema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { unlink } from 'fs/promises';

// Get All Users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().select('-password');

  if (!users) {
    throw new ErrorResponse('No users found', 404);
  }

  res.json(users);
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, phoneNumber, email } = req.body;

  const updatedData = {
    name,
    phoneNumber,
    email,
  };

  if (req.file) {
    updatedData.profileImage = req.file.path;
  }

  const updatedUser = await User.findByIdAndUpdate(req.uid, updatedData, {
    new: true,
  }).select('-password');

  if (!updatedUser) {
    throw new ErrorResponse('User not found', 404);
  }

  res.json(updatedUser);
});

// Delete User Account
export const deleteUserAccount = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  await User.findByIdAndDelete(req.uid);

  res.clearCookie('token');

  res.json({ message: 'Account deleted successfully' });
});
