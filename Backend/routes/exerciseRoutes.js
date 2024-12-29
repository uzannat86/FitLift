import { Router } from "express";
import {
  createExercise,
  getAllExercises,
} from "../controllers/exerciseController.js";
import verifyToken from "../middleware/authMiddleware.js"; // Make sure this import is correct
import { uploadMultiple } from "../middleware/upload.js";

const router = Router();

router.get("/all", getAllExercises);

router.post(
  "/create",
  verifyToken, // Ensure req.user is set by this middleware
  uploadMultiple.single("media"), // Handles file upload
  createExercise
);

export default router;
