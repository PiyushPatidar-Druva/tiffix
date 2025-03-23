import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Order } from '../models/Order';
import { MenuItem } from '../models/Menu';
import { Vendor } from '../models/Vendor';

const DEFAULT_STATS = {
  todayOrders: 0,
  pendingDeliveries: 0,
  totalMenuItems: 0,
  todayRevenue: 0
};

export const dashboardController = {
  // Get vendor dashboard statistics
  getVendorStats: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?._id;
      const vendor = await Vendor.findOne({ userId });

      if (!vendor) {
        console.log('Vendor profile not found for user:', userId);
        return res.json(DEFAULT_STATS);
      }

      // Get today's date range
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      try {
        // Get today's orders
        const todayOrders = await Order.find({
          vendorId: vendor._id,
          date: {
            $gte: today,
            $lt: tomorrow
          }
        });

        // Get pending deliveries
        const pendingDeliveries = await Order.find({
          vendorId: vendor._id,
          status: { $in: ['pending', 'preparing', 'out_for_delivery'] }
        });

        // Get total menu items
        const totalMenuItems = await MenuItem.countDocuments({ vendorId: vendor._id });

        // Calculate today's revenue
        const todayRevenue = todayOrders.reduce((total, order) => total + order.totalAmount, 0);

        res.json({
          todayOrders: todayOrders.length,
          pendingDeliveries: pendingDeliveries.length,
          totalMenuItems,
          todayRevenue
        });
      } catch (error) {
        console.error('Error fetching individual stats:', error);
        // If any of the individual queries fail, return default stats
        return res.json(DEFAULT_STATS);
      }
    } catch (error) {
      console.error('Error in getVendorStats:', error);
      // Return default stats instead of error
      return res.json(DEFAULT_STATS);
    }
  }
}; 