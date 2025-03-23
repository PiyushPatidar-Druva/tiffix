import express, { RequestHandler } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require authentication and vendor role
router.use(authenticate as RequestHandler);
router.use(authorize('vendor') as RequestHandler);

// Get vendor dashboard statistics
router.get('/stats', dashboardController.getVendorStats as RequestHandler);

export default router; 