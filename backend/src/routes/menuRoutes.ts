import express, { Router, RequestHandler } from 'express';
import { menuController } from '../controllers/menuController';
import { authenticate, authorize } from '../middleware/auth';

const router: Router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log('Menu route hit:', req.method, req.path);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  next();
});

// All routes require authentication and vendor role
router.use(authenticate as RequestHandler);
router.use(authorize('vendor') as RequestHandler);

// Get all menu items for the vendor
router.get('/', menuController.getMenuItems as RequestHandler);

// Create a new menu item
router.post('/', menuController.createMenuItem as RequestHandler);

// Update a menu item
router.put('/:id', menuController.updateMenuItem as RequestHandler);

// Delete a menu item
router.delete('/:id', menuController.deleteMenuItem as RequestHandler);

// Toggle menu item availability
router.put('/:id/toggle-availability', menuController.toggleAvailability as RequestHandler);

// 404 handler for menu routes
router.use((req, res) => {
  res.status(404).json({ message: 'Menu route not found' });
});

export default router; 