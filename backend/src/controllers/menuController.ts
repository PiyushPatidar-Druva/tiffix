import { Request, Response } from 'express';
import { MenuItem, IMenuItem } from '../models/Menu';
import { Vendor } from '../models/Vendor';
import { AuthRequest } from '../middleware/auth';

export const menuController = {
  // Get all menu items for a vendor
  getMenuItems: async (req: AuthRequest, res: Response) => {
    try {
      console.log('getMenuItems - User:', req.user);
      const userId = req.user?._id;
      console.log('getMenuItems - User ID:', userId);
      
      const vendor = await Vendor.findOne({ userId });
      console.log('getMenuItems - Vendor:', vendor);

      if (!vendor) {
        console.log('getMenuItems - Vendor not found');
        return res.status(404).json({ message: 'Vendor profile not found' });
      }

      const menuItems = await MenuItem.find({ vendorId: vendor._id });
      console.log('getMenuItems - Menu Items:', menuItems);
      
      res.json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Error fetching menu items' });
    }
  },

  // Create a new menu item
  createMenuItem: async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?._id;
      const vendor = await Vendor.findOne({ userId });

      if (!vendor) {
        return res.status(404).json({ message: 'Vendor profile not found' });
      }

      const menuItem = new MenuItem({
        ...req.body,
        vendorId: vendor._id
      });
      await menuItem.save();
      res.status(201).json(menuItem);
    } catch (error) {
      console.error('Error creating menu item:', error);
      res.status(500).json({ message: 'Error creating menu item' });
    }
  },

  // Update a menu item
  updateMenuItem: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?._id;
      const vendor = await Vendor.findOne({ userId });

      if (!vendor) {
        return res.status(404).json({ message: 'Vendor profile not found' });
      }

      const menuItem = await MenuItem.findOneAndUpdate(
        { _id: id, vendorId: vendor._id },
        { $set: req.body },
        { new: true }
      );

      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.json(menuItem);
    } catch (error) {
      console.error('Error updating menu item:', error);
      res.status(500).json({ message: 'Error updating menu item' });
    }
  },

  // Delete a menu item
  deleteMenuItem: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?._id;
      const vendor = await Vendor.findOne({ userId });

      if (!vendor) {
        return res.status(404).json({ message: 'Vendor profile not found' });
      }

      const menuItem = await MenuItem.findOneAndDelete({ _id: id, vendorId: vendor._id });

      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      res.status(500).json({ message: 'Error deleting menu item' });
    }
  },

  // Toggle menu item availability
  toggleAvailability: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?._id;
      const vendor = await Vendor.findOne({ userId });

      if (!vendor) {
        return res.status(404).json({ message: 'Vendor profile not found' });
      }

      const menuItem = await MenuItem.findOne({ _id: id, vendorId: vendor._id });

      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }

      menuItem.isAvailable = !menuItem.isAvailable;
      await menuItem.save();

      res.json(menuItem);
    } catch (error) {
      console.error('Error toggling menu item availability:', error);
      res.status(500).json({ message: 'Error toggling menu item availability' });
    }
  }
}; 