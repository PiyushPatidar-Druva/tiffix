import { Request, Response, NextFunction } from "express";
import { User, Vendor } from "../models";
import { AuthRequest } from "../middleware/auth";

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Current password is incorrect" });
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const createVendorProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const existingVendor = await Vendor.findOne({ userId });
    if (existingVendor) {
      res.status(400).json({ message: "Vendor profile already exists" });
      return;
    }

    const vendorData = {
      ...req.body,
      userId,
      status: "pending",
      rating: 0,
      totalRatings: 0,
    };

    const vendor = await Vendor.create(vendorData);
    res.status(201).json(vendor);
  } catch (error) {
    next(error);
  }
};

export const getVendorProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const vendor = await Vendor.findOne({ userId });
    if (!vendor) {
      res.json({ 
        exists: false,
        message: "Vendor profile not found" 
      });
      return;
    }

    res.json({ 
      exists: true,
      profile: vendor 
    });
  } catch (error) {
    next(error);
  }
};
