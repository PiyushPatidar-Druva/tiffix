import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Customer } from '../../types/user';

interface UserData extends Customer {
  subscriptionStatus: 'active' | 'inactive' | 'pending';
  lastOrderDate: string;
  totalOrders: number;
}

const sampleUsers: UserData[] = [
  {
    id: 'USR001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    role: 'customer',
    status: 'active',
    address: '123, ABC Street, XYZ City',
    subscriptionId: 'SUB001',
    subscriptionStatus: 'active',
    lastOrderDate: '2024-03-15',
    totalOrders: 25,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: 'USR002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 9876543211',
    role: 'customer',
    status: 'inactive',
    address: '456, DEF Street, XYZ City',
    subscriptionStatus: 'inactive',
    lastOrderDate: '2024-02-28',
    totalOrders: 15,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-10')
  }
];

const UserManagement: React.FC = () => {
  // const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserData[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive') => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users in the system including their name, email, status, and other details.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subscription
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total Orders
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.subscriptionStatus === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.subscriptionStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.totalOrders}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <select
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value as 'active' | 'inactive')}
                          className={`rounded-md text-sm ${
                            user.status === 'active'
                              ? 'text-green-800 bg-green-100'
                              : 'text-red-800 bg-red-100'
                          }`}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button
                          onClick={() => setSelectedUser(user)}
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

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">User Details</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Name:</span> {selectedUser.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Email:</span> {selectedUser.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Phone:</span> {selectedUser.phone}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Address:</span> {selectedUser.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Last Order:</span> {selectedUser.lastOrderDate}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Member Since:</span>{' '}
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setSelectedUser(null)}
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

export default UserManagement; 