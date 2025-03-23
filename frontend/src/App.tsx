import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProfile from "./pages/customer/Profile";
import CustomerSubscriptions from "./pages/customer/Subscriptions";
import CustomerOrders from "./pages/customer/Orders";
import CustomerBilling from "./pages/customer/Billing";

// Vendor Pages
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProfile from "./pages/vendor/Profile";
import VendorMenu from "./pages/vendor/Menu";
import VendorOrders from "./pages/vendor/Orders";
import VendorSubscriptions from "./pages/vendor/Subscriptions";
import VendorBilling from "./pages/vendor/Billing";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import UserManagement from "./pages/admin/UserManagement";
import VendorManagement from "./pages/admin/VendorManagement";
import ProtectedRoute from './components/auth/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Customer Routes */}
          <Route
            path="/customer/*"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="customer">
                  <CustomerDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/profile"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="customer">
                  <CustomerProfile />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/subscriptions"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="customer">
                  <CustomerSubscriptions />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/orders"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="customer">
                  <CustomerOrders />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/billing"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="customer">
                  <CustomerBilling />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />

          {/* Vendor Routes */}
          <Route
            path="/vendor/*"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/profile"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorProfile />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/menu"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorMenu />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/orders"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorOrders />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/subscriptions"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorSubscriptions />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/billing"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="vendor">
                  <VendorBilling />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="admin">
                  <AdminDashboard />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="admin">
                  <AdminProfile />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="admin">
                  <UserManagement />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/vendors"
            element={
              <ProtectedRoute>
                <RoleBasedRoute role="admin">
                  <VendorManagement />
                </RoleBasedRoute>
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Router>
  );
};

export default App;
