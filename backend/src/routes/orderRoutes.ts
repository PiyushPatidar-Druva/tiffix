import express, { RequestHandler } from "express";
import { getOrders } from "../controllers/orderController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();
// All routes require authentication and vendor role
router.use(authenticate as RequestHandler);
router.use(authorize("vendor") as RequestHandler);

// Define the route for getting orders
router.get("/", getOrders as RequestHandler);

export default router;
