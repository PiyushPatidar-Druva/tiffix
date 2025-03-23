import express, { RequestHandler } from "express";
import { authenticate, authorize } from "../middleware/auth";
import { updateProfile } from "../controllers/customerController";
import { getCustomerProfile } from "../controllers/customerController";

const router = express.Router();
// All routes require authentication and vendor role
router.use(authenticate as RequestHandler);
router.use(authorize("customer") as RequestHandler);

// Define the route for getting the customer profile
router.get("/profile", getCustomerProfile);

// Define the route for updating the customer profile
router.put("/profile", updateProfile);

export default router;
