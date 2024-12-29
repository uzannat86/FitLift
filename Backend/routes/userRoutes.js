import { Router } from "express";
import {
  updateUserProfile,
  deleteUserAccount,
  getAllUsers,
} from "../controllers/userController.js";
import verifyUserToken from "../middleware/verifyUserToken.js"; // Import the new middleware
import { uploadSingle } from "../middleware/upload.js";

const userRouter = Router();

// Get all users
userRouter.get("/", verifyUserToken, getAllUsers);

// Update profile (with optional profile image)
userRouter.put(
  "/profile",
  verifyUserToken,
  uploadSingle.single("profileImage"),
  updateUserProfile
);

// Delete user account
userRouter.delete("/profile", verifyUserToken, deleteUserAccount);

export default userRouter;
