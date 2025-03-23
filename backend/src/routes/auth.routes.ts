import express from "express";
import {
  register,
  verifyOTP,
  login,
  resendOTP,
  getMe,
  refreshToken,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOTP);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/resend-otp
router.post("/resend-otp", resendOTP);

// POST /api/auth/refresh-token
router.post("/refresh-token", authenticate, refreshToken);

// GET /api/auth/me
router.get("/me", authenticate, getMe);

export default router;
