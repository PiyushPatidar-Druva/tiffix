import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Vendor } from '../../types/user';

interface VendorData extends Vendor {
  totalCustomers: number;
  totalOrders: number;
  averageRating: number;
  lastOrderDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

const sampleVendors: VendorData[] = [
  {
    id: 'VEN001',
    name: 'Spice Kitchen',
    email: 'contact@spicekitchen.com',
    phone: '+91 9876543210',
    role: 'vendor',
    status: 'active',
    businessName: 'Spice Kitchen',
    description: 'Authentic Indian cuisine with a modern twist',
    businessAddress: '123, Food Street, Cooking Lane',
    serviceAreas: ['Area 1', 'Area 2', 'Area 3'],
    deliveryAreas: ['Mumbai', 'Thane', 'Navi Mumbai'],
    rating: 4.5,
    capacity: 100,
    cuisine: ['North Indian', 'South Indian'],
    license: 'LIC123456',
    bankDetails: {
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      accountHolderName: 'Spice Kitchen'
    },
    subscriptionPlans: [{
      name: 'Basic Plan',
      description: 'Daily meals for individuals',
      price: 1000,
      duration: 30,
      mealsPerDay: 2
    }],
    totalCustomers: 150,
    totalOrders: 1250,
    averageRating: 4.5,
    lastOrderDate: '2024-03-15',
    verificationStatus: 'verified',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: 'VEN002',
    name: 'Healthy Bites',
    email: 'contact@healthybites.com',
    phone: '+91 9876543211',
    role: 'vendor',
    status: 'inactive',
    businessName: 'Healthy Bites',
    description: 'Fresh and healthy meals for fitness enthusiasts',
    businessAddress: '456, Health Avenue, Fitness Street',
    serviceAreas: ['Area 4', 'Area 5'],
    deliveryAreas: ['Mumbai', 'Andheri', 'Bandra'],
    rating: 4.2,
    capacity: 75,
    cuisine: ['Healthy', 'Continental'],
    license: 'LIC789012',
    bankDetails: {
      accountNumber: '0987654321',
      ifscCode: 'HDFC0005678',
      accountHolderName: 'Healthy Bites'
    },
    subscriptionPlans: [{
      name: 'Fitness Plan',
      description: 'Healthy meals for fitness goals',
      price: 1500,
      duration: 30,
      mealsPerDay: 3
    }],
    totalCustomers: 80,
    totalOrders: 750,
    averageRating: 4.2,
    lastOrderDate: '2024-03-14',
    verificationStatus: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-14')
  }
];

const VendorManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [vendors, setVendors] = useState<VendorData[]>(sampleVendors);
  const [selectedVendor, setSelectedVendor] = useState<VendorData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending' | 'rejected'>('all');

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vendor.verificationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (vendorId: string, newStatus: 'active' | 'inactive') => {
    setVendors(vendors.map(vendor =>
      vendor.id === vendorId ? { ...vendor, status: newStatus } : vendor
    ));
  };

  const handleVerificationChange = (vendorId: string, newStatus: VendorData['verificationStatus']) => {
    setVendors(vendors.map(vendor =>
      vendor.id === vendorId ? { ...vendor, verificationStatus: newStatus } : vendor
    ));
  };

  const getStatusBadgeColor = (status: VendorData['verificationStatus']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Vendor Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all vendors in the system including their business details, performance metrics, and verification status.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'verified' | 'pending' | 'rejected')}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Business Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Contact
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cuisine
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rating
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Verification
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {vendor.businessName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vendor.email}<br />
                        {vendor.phone}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vendor.cuisine.join(', ')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {vendor.rating} ★
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <select
                          value={vendor.status}
                          onChange={(e) => handleStatusChange(vendor.id, e.target.value as 'active' | 'inactive')}
                          className={`rounded-md text-sm ${
                            vendor.status === 'active'
                              ? 'text-green-800 bg-green-100'
                              : 'text-red-800 bg-red-100'
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <select
                          value={vendor.verificationStatus}
                          onChange={(e) => handleVerificationChange(vendor.id, e.target.value as VendorData['verificationStatus'])}
                          className={`rounded-md text-sm ${getStatusBadgeColor(vendor.verificationStatus)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() => setSelectedVendor(vendor)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Vendor Details</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Business Name:</span> {selectedVendor.businessName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Address:</span> {selectedVendor.businessAddress}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Service Areas:</span> {selectedVendor.serviceAreas.join(', ')}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">License Number:</span> {selectedVendor.license}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Capacity:</span> {selectedVendor.capacity} meals/day
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Total Customers:</span> {selectedVendor.totalCustomers}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Total Orders:</span> {selectedVendor.totalOrders}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Member Since:</span>{' '}
                      {new Date(selectedVendor.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setSelectedVendor(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagement; 