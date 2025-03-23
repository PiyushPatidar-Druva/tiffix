import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  totalAmount: number;
}

const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    items: [
      { name: 'Paneer Butter Masala', quantity: 1, price: 250 },
      { name: 'Naan', quantity: 2, price: 60 }
    ],
    status: 'delivered',
    totalAmount: 370
  },
  {
    id: 'ORD002',
    date: '2024-03-14',
    items: [
      { name: 'Dal Tadka', quantity: 1, price: 180 },
      { name: 'Jeera Rice', quantity: 1, price: 120 }
    ],
    status: 'delivered',
    totalAmount: 300
  }
];

const Orders: React.FC = () => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              My Orders
            </h2>
          </div>
        </div>

        <div className="mt-8">
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {sampleOrders.map((order) => (
                <li key={order.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <p className="truncate text-sm font-medium text-indigo-600">Order #{order.id}</p>
                        <p className="mt-2 sm:mt-0 sm:ml-6 flex items-center text-sm text-gray-500">
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <div className="ml-2 flex flex-shrink-0">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="mr-6">
                            <dt className="text-sm font-medium text-gray-500">Items</dt>
                            {order.items.map((item, index) => (
                              <dd key={index} className="mt-1 text-sm text-gray-900">
                                {item.quantity}x {item.name}
                              </dd>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
                          <dd className="mt-1 text-sm font-semibold text-gray-900">₹{order.totalAmount}</dd>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders; 