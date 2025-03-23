import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Vendor } from '../../types/user';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import api from '../../services/api';
import { toast } from 'react-toastify';

const VendorProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    cuisine: '',
    deliveryAreas: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    },
    subscriptionPlans: [{
      name: 'Basic Plan',
      description: 'Basic subscription plan',
      price: 1000,
      duration: 30,
      mealsPerDay: 2
    }]
  });

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await api.get('/users/vendor/profile');
        if (response.data.exists && response.data.profile) {
          const vendorData = response.data.profile;
          
          setFormData({
            businessName: vendorData.businessName || '',
            description: vendorData.description || '',
            cuisine: vendorData.cuisine?.join(', ') || '',
            deliveryAreas: vendorData.deliveryAreas?.join(', ') || '',
            bankDetails: vendorData.bankDetails || {
              accountNumber: '',
              ifscCode: '',
              accountHolderName: ''
            },
            subscriptionPlans: vendorData.subscriptionPlans || [{
              name: 'Basic Plan',
              description: 'Basic subscription plan',
              price: 1000,
              duration: 30,
              mealsPerDay: 2
            }]
          });
        }
      } catch (error) {
        console.error('Error fetching vendor profile:', error);
        // If profile doesn't exist, use user data as fallback
        if (user && (user as Vendor).businessName) {
          const vendor = user as Vendor;
          setFormData({
            businessName: vendor.businessName || '',
            description: vendor.description || '',
            cuisine: vendor.cuisine?.join(', ') || '',
            deliveryAreas: vendor.deliveryAreas?.join(', ') || '',
            bankDetails: vendor.bankDetails || {
              accountNumber: '',
              ifscCode: '',
              accountHolderName: ''
            },
            subscriptionPlans: vendor.subscriptionPlans || [{
              name: 'Basic Plan',
              description: 'Basic subscription plan',
              price: 1000,
              duration: 30,
              mealsPerDay: 2
            }]
          });
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchVendorProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format the data for the API
      const data = {
        ...formData,
        cuisine: formData.cuisine.split(',').map(c => c.trim()),
        deliveryAreas: formData.deliveryAreas.split(',').map(area => area.trim())
      };

      // Make the API call
      const response = await api.post('/users/vendor/profile', data);
      
      // Update the user context with new vendor data
      if (updateUser) {
        updateUser(response.data);
      }
      
      toast.success('Vendor profile saved successfully!');
    } catch (error) {
      console.error('Error saving vendor profile:', error);
      toast.error('Failed to save vendor profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Vendor Profile
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Business Information Section */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Business Information</h3>
                <p className="mt-1 text-sm text-gray-500">Enter your business details and service information.</p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      id="businessName"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Business Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
                      Cuisine Types
                    </label>
                    <input
                      type="text"
                      name="cuisine"
                      id="cuisine"
                      required
                      value={formData.cuisine}
                      onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter cuisine types separated by commas (e.g., Indian, North Indian, South Indian)"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="deliveryAreas" className="block text-sm font-medium text-gray-700">
                      Delivery Areas
                    </label>
                    <input
                      type="text"
                      name="deliveryAreas"
                      id="deliveryAreas"
                      required
                      value={formData.deliveryAreas}
                      onChange={(e) => setFormData({ ...formData, deliveryAreas: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Enter delivery areas separated by commas (e.g., Mumbai, Thane, Navi Mumbai)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Bank Details</h3>
                <p className="mt-1 text-sm text-gray-500">Enter your bank account information for payments.</p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      required
                      value={formData.bankDetails.accountNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      name="ifscCode"
                      id="ifscCode"
                      required
                      value={formData.bankDetails.ifscCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, ifscCode: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountHolderName"
                      id="accountHolderName"
                      required
                      value={formData.bankDetails.accountHolderName}
                      onChange={(e) => setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, accountHolderName: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Plans Section */}
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Subscription Plans</h3>
                <p className="mt-1 text-sm text-gray-500">Configure your subscription plans for customers.</p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      name="planName"
                      id="planName"
                      required
                      value={formData.subscriptionPlans[0].name}
                      onChange={(e) => setFormData({
                        ...formData,
                        subscriptionPlans: [{
                          ...formData.subscriptionPlans[0],
                          name: e.target.value
                        }]
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="planDescription" className="block text-sm font-medium text-gray-700">
                      Plan Description
                    </label>
                    <textarea
                      name="planDescription"
                      id="planDescription"
                      required
                      value={formData.subscriptionPlans[0].description}
                      onChange={(e) => setFormData({
                        ...formData,
                        subscriptionPlans: [{
                          ...formData.subscriptionPlans[0],
                          description: e.target.value
                        }]
                      })}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="planPrice" className="block text-sm font-medium text-gray-700">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="planPrice"
                      id="planPrice"
                      required
                      min="0"
                      value={formData.subscriptionPlans[0].price}
                      onChange={(e) => setFormData({
                        ...formData,
                        subscriptionPlans: [{
                          ...formData.subscriptionPlans[0],
                          price: parseInt(e.target.value)
                        }]
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="planDuration" className="block text-sm font-medium text-gray-700">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      name="planDuration"
                      id="planDuration"
                      required
                      min="1"
                      value={formData.subscriptionPlans[0].duration}
                      onChange={(e) => setFormData({
                        ...formData,
                        subscriptionPlans: [{
                          ...formData.subscriptionPlans[0],
                          duration: parseInt(e.target.value)
                        }]
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="mealsPerDay" className="block text-sm font-medium text-gray-700">
                      Meals per Day
                    </label>
                    <input
                      type="number"
                      name="mealsPerDay"
                      id="mealsPerDay"
                      required
                      min="1"
                      value={formData.subscriptionPlans[0].mealsPerDay}
                      onChange={(e) => setFormData({
                        ...formData,
                        subscriptionPlans: [{
                          ...formData.subscriptionPlans[0],
                          mealsPerDay: parseInt(e.target.value)
                        }]
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default VendorProfile; 