import { Response } from "express";
import { User } from "../models/User"; // Ensure this path is correct
import { AuthRequest } from "../middleware/auth";

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const updatedData = req.body;

  try {
    const updatedProfile = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCustomerProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user?._id;
  const customerProfile = await User.findById(userId);
  res.json(customerProfile);
};
