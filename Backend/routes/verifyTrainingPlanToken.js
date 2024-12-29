import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const verifyTrainingPlanToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new ErrorResponse('Please login to access your training plans', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.uid, role: decoded.role };

    next();
  } catch (error) {
    throw new ErrorResponse('Invalid token for accessing training plans', 401);
  }
});

export default verifyTrainingPlanToken;
