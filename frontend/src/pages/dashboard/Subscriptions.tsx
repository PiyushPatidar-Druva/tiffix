import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}

interface Subscription {
  id: number;
  plan: string;
  status: string;
  startDate: string;
  nextBilling: string;
  mealsPerDay: number;
  price: number;
}

const Subscriptions: React.FC = () => {
  // Sample data - In a real app, this would come from an API
  const [subscription] = useState<Subscription>({
    id: 1,
    plan: 'Premium Plan',
    status: 'Active',
    startDate: '2024-03-01',
    nextBilling: '2024-04-01',
    mealsPerDay: 2,
    price: 4999,
  });

  const [dailyMenu] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Paneer Butter Masala',
      description: 'Creamy paneer curry with rich tomato gravy',
      category: 'Lunch',
      image: '/menu/paneer-butter-masala.jpg',
    },
    {
      id: 2,
      name: 'Dal Tadka',
      description: 'Yellow lentils tempered with Indian spices',
      category: 'Dinner',
      image: '/menu/dal-tadka.jpg',
    },
  ]);

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number>(0);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be sent to an API
    console.log('Feedback submitted:', { rating, feedback });
    setFeedback('');
    setRating(0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Meal Subscriptions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your meal subscription plans and preferences.
          </p>
        </div>

        {/* Active Subscription Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Subscription</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900">{subscription.plan}</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    Status: <span className="text-green-600 font-medium">{subscription.status}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Start Date: <span className="font-medium">{subscription.startDate}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Next Billing: <span className="font-medium">{subscription.nextBilling}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Meals per day: <span className="font-medium">{subscription.mealsPerDay}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-900 mt-4">
                    ₹{subscription.price}/month
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                  Change Plan
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                  Cancel Subscription
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Billing History
                </button>
                <button className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Update Payment Method
                </button>
                <button className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Download Invoices
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Menu Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dailyMenu.map((item) => (
              <div key={item.id} className="flex space-x-4 bg-gray-50 rounded-lg p-4">
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/96';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              View Full Week's Menu →
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your experience
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`p-1 focus:outline-none ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                Your feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions; 