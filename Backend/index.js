import express from "express";
import "./config/db.js";
import cors from "cors";
import trainingPlanRoutes from "./routes/trainingPlanRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import coachRoutes from "./routes/coachRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;
const allowedOrigin = [process.env.FRONTEND_URL, process.env.DEPLOYMENT_URL];

// Enable CORS for frontend
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route setups
app.use("/auth", authRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/user", userRouter);
app.use("/coaches", coachRoutes);
app.use("/trainingPlans", trainingPlanRoutes);

// Error handling middleware
// Must be the last middleware

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
