import Exercise from "../models/Exercise.js";

import multer, { diskStorage } from "multer";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage }).single("media");

// export function createExercise(req, res) {
//   upload(req, res, async (err) => {
//     if (err) return res.status(500).json({ error: err.message });

//     const { title, description } = req.body;
//     const media = req.file ? req.file.path : null;

//     try {
//       const newExercise = new Exercise({
//         title,
//         description,
//         media,
//         createdBy: 'test',
//       });

//       await newExercise.save();
//       res.status(201).json(newExercise);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// }

export const getAllExercises = asyncHandler(async (req, res, next) => {
  const exercises = await Exercise.find().populate("createdBy");
  if (!exercises) throw new ErrorResponse("Exercise does not exist");
  res.json(exercises);
});

export const createExercise = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  const media = req.file ? req.file.path || req.file.location : null; // Use the path or URL for media
  console.log("req.user:", req.user);

  const createdBy = req.user.id; // Access user ID from req.user

  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "Title and description are required." });
  }

  const newExercise = await Exercise.create({
    title,
    description,
    media,
    createdBy, // Use authenticated user's ID
  });

  const populatedExercise = await Exercise.findById(newExercise._id).populate(
    "createdBy"
  );
  res.status(201).json(populatedExercise);
});
export default Exercise;
