import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import menuRoutes from "./menuRoutes";
import dashboardRoutes from "./dashboardRoutes";
import orderRoutes from "./orderRoutes";
import customerRoutes from "./customerRoutes";


const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log("Main routes hit:", req.method, req.path);
  next();
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/vendor/menu", menuRoutes);
router.use("/vendor/dashboard", dashboardRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);
// 404 handler
router.use((req, res) => {
  console.log("404 for path:", req.path);
  res.status(404).json({ message: "Route not found" });
});

export default router;
