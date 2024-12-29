import express from 'express';
import {
  createCoachProfile,
  updateCoachProfile,
  getAllCoaches,
  getCoachProfile,
  createAd,
  bookCoach,
  getBookingRequests,
  acceptClient,
  getAcceptedClients,
} from '../controllers/coachController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

router.get(
  '/bookings',
  authMiddleware,
  roleMiddleware(['Coach']),
  getBookingRequests
);

router.post(
  '/accept-client',
  authMiddleware,
  roleMiddleware(['Coach']),
  acceptClient
);

router.get(
  '/clients',
  authMiddleware,
  roleMiddleware(['Coach']),
  getAcceptedClients
);

router.post('/', authMiddleware, roleMiddleware(['Coach']), createCoachProfile);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['Coach']),
  updateCoachProfile
);

router.post(
  '/create-ad',
  authMiddleware,
  roleMiddleware(['Coach']),
  uploadSingle.single('photo'),
  createAd
);

router.post(
  '/:coachId/book',
  authMiddleware,
  roleMiddleware(['Client']),
  bookCoach
);

router.get('/', getAllCoaches);
router.get('/:id', getCoachProfile);

export default router;
