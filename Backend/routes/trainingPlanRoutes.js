// routes/trainingPlanRoutes.js
import { Router } from 'express';
const trainingsPlanRouter = Router();

import {
  createTrainingPlan,
  getClientTrainingPlans,
  getTrainingPlanById,
  updateTrainingPlan,
  deleteTrainingPlan,
} from '../controllers/trainingPlanController.js';

import roleMiddleware from '../middleware/roleMiddleware.js';
import verifyTrainingPlanToken from './verifyTrainingPlanToken.js';

// Route to get all training plans for the logged-in client
trainingsPlanRouter.get(
  '/client-plans',
  verifyTrainingPlanToken,
  getClientTrainingPlans
);

// Route to get a single training plan by ID (for Coaches and Clients)
trainingsPlanRouter.get('/:id', verifyTrainingPlanToken, getTrainingPlanById);

// Route to create a new training plan (Coaches only)
trainingsPlanRouter.post(
  '/create',
  verifyTrainingPlanToken,
  roleMiddleware(['Coach']),
  createTrainingPlan
);

// Route to update a training plan by ID (Coaches only)
trainingsPlanRouter.put(
  '/:id',
  verifyTrainingPlanToken,
  roleMiddleware(['Coach']),
  updateTrainingPlan
);

// Route to delete a training plan by ID (Coaches only)
trainingsPlanRouter.delete(
  '/:id',
  verifyTrainingPlanToken,
  roleMiddleware(['Coach']),
  deleteTrainingPlan
);

export default trainingsPlanRouter;
