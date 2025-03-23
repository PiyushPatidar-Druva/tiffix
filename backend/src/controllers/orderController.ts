import { Response } from "express";
import { Order } from "../models/Order";
import { Vendor } from "../models/Vendor";
import { AuthRequest } from "../middleware/auth";

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const vendor = await Vendor.findOne({ userId });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor profile not found" });
    }
    // Fetch orders for the specific vendor
    const orders = await Order.find({ vendorId: vendor._id }); // Filter orders by vendorId
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
