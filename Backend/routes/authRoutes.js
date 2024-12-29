import { Router } from 'express';
import {
  signUp,
  signIn,
  getUser,
  signOut,
} from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { uploadSingle } from '../middleware/upload.js';

const router = Router();

router.post('/signUp', uploadSingle.single('profileImage'), signUp);
router.post('/signIn', signIn);
router.post('/logout', verifyToken, signOut);
router.get('/me', verifyToken, getUser);

export default router;
