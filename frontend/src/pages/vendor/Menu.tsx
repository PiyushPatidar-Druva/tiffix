import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Vendor } from '../../types/user';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import menuApi, { MenuItem, CreateMenuItemDto } from '../../services/menuApi';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Menu: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<CreateMenuItemDto>({
    name: '',
    description: '',
    price: 0,
    category: 'lunch',
    isVegetarian: true,
    isAvailable: true
  });
  const [hasVendorProfile, setHasVendorProfile] = useState(false);

  useEffect(() => {
    const checkVendorProfile = async () => {
      try {
        const response = await api.get('/users/vendor/profile');
        if (response.data.exists) {
          setHasVendorProfile(true);
          // Fetch menu items if profile exists
          const menuResponse = await menuApi.getMenuItems();
          setMenuItems(menuResponse);
        } else {
          setHasVendorProfile(false);
        }
      } catch (error) {
        console.error('Error checking vendor profile:', error);
        setHasVendorProfile(false);
      } finally {
        setLoading(false);
      }
    };

    checkVendorProfile();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasVendorProfile) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Vendor Profile Required</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>You need to create your vendor profile before you can manage your menu items.</p>
                  <div className="mt-4">
                    <Link
                      to="/vendor/profile"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleToggleAvailability = async (itemId: string) => {
    try {
      if (!itemId) {
        toast.error('Invalid menu item');
        return;
      }
      console.log('Attempting to toggle availability for item:', itemId);
      const updatedItem = await menuApi.toggleAvailability(itemId);
      console.log('Toggle availability response:', updatedItem);
      setMenuItems(menuItems.map(item =>
        item._id === itemId ? updatedItem : item
      ));
      toast.success('Item availability updated');
    } catch (error: any) {
      console.error('Error toggling availability:', error);
      // Log more details about the error
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      toast.error('Failed to update item availability');
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setIsEditing(true);
    setCurrentItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isVegetarian: item.isVegetarian,
      isAvailable: item.isAvailable
    });
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    setIsEditing(false);
    setCurrentItem({
      name: '',
      description: '',
      price: 0,
      category: 'lunch',
      isVegetarian: true,
      isAvailable: true
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentItem({
      name: '',
      description: '',
      price: 0,
      category: 'lunch',
      isVegetarian: true,
      isAvailable: true
    });
  };

  const handleSubmit = async () => {
    if (currentItem.name && currentItem.description && currentItem.price && currentItem.category) {
      try {
        let updatedItem: MenuItem;
        if (isEditing) {
          const itemToEdit = menuItems.find(item => item.name === currentItem.name);
          if (!itemToEdit?._id) {
            toast.error('Failed to find item to edit');
            return;
          }
          updatedItem = await menuApi.updateMenuItem({
            ...currentItem,
            _id: itemToEdit._id
          });
          setMenuItems(menuItems.map(item =>
            item._id === updatedItem._id ? updatedItem : item
          ));
          toast.success('Menu item updated successfully');
        } else {
          updatedItem = await menuApi.createMenuItem(currentItem);
          setMenuItems([...menuItems, updatedItem]);
          toast.success('Menu item added successfully');
        }
        handleModalClose();
      } catch (error) {
        toast.error(isEditing ? 'Failed to update menu item' : 'Failed to add menu item');
        console.error('Error handling menu item:', error);
      }
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      if (!itemId) {
        toast.error('Invalid menu item');
        return;
      }
      await menuApi.deleteMenuItem(itemId);
      setMenuItems(menuItems.filter(item => item._id !== itemId));
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete menu item');
      console.error('Error deleting menu item:', error);
    }
  };

  const handleEditItem = async (item: MenuItem) => {
    try {
      const updatedItem = await menuApi.updateMenuItem(item);
      setMenuItems(menuItems.map(menuItem =>
        menuItem._id === item._id ? updatedItem : menuItem
      ));
      toast.success('Menu item updated successfully');
    } catch (error) {
      toast.error('Failed to update menu item');
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Menu Management
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={handleAddNewClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add New Item
            </button>
          </div>
        </div>

        {menuItems.length === 0 ? (
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">No Menu Items Yet</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Get started by adding your first menu item. You can add different categories like breakfast, lunch, and dinner items.
                </p>
                <button
                  type="button"
                  onClick={handleAddNewClick}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Your First Item
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item._id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 flex flex-col h-full"
              >
                {item.image && (
                  <div className="w-full h-48 bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="px-4 py-5 sm:p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 
                      className="text-lg font-medium text-gray-900 truncate max-w-[70%]" 
                      title={item.name}
                    >
                      {item.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800 whitespace-nowrap ml-2">
                      {item.category}
                    </span>
                  </div>
                  <p 
                    className="text-sm text-gray-500 line-clamp-3 min-h-[3rem]"
                    title={item.description}
                  >
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-900">₹{item.price}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    <button
                      onClick={() => handleToggleAvailability(item._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                  </div>
                </div>
                <div className="px-4 py-4 sm:px-6 bg-gray-50">
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => handleEditClick(item)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item._id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Item Modal */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Menu Item</h3>
                  <div className="mt-5">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={currentItem.name}
                          onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          value={currentItem.description}
                          onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={currentItem.price}
                          onChange={(e) => setCurrentItem({ ...currentItem, price: Number(e.target.value) })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          name="category"
                          id="category"
                          value={currentItem.category}
                          onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value as MenuItem['category'] })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="isVegetarian" className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <select
                          name="isVegetarian"
                          id="isVegetarian"
                          value={currentItem.isVegetarian ? 'veg' : 'nonveg'}
                          onChange={(e) => setCurrentItem({ ...currentItem, isVegetarian: e.target.value === 'veg' })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="veg">Vegetarian</option>
                          <option value="nonveg">Non-Vegetarian</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Menu; 