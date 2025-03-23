import express from 'express';
import { changePassword, createVendorProfile, getVendorProfile } from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// POST /api/users/change-password
router.post('/change-password', authenticate, changePassword);

// Vendor profile routes
router.get('/vendor/profile', authenticate, authorize('vendor'), getVendorProfile);
router.post('/vendor/profile', authenticate, authorize('vendor'), createVendorProfile);

export default router; 