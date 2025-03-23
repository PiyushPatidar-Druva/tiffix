import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authAPI } from "../../services/api";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

const VerifyOTP: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, verifyOTP } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  
  const email = (location.state as any)?.email;
  const userId = (location.state as any)?.userId;

  useEffect(() => {
    if (!email || !userId) {
      navigate("/register");
      return;
    }
    // Store userId in localStorage for persistence
    localStorage.setItem("pendingUserId", userId);
  }, [email, userId, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0 || !userId) return;

    setIsLoading(true);
    try {
      await authAPI.resendOTP({ userId });
      setTimeLeft(60);
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRoleDashboard = (role: string) => {
    switch (role) {
      case 'customer':
        navigate('/customer/dashboard');
        break;
      case 'vendor':
        navigate('/vendor/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/customer/dashboard');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6 || !userId) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOTP({ userId, otp });
      localStorage.removeItem("pendingUserId"); // Clean up
      localStorage.setItem("token", response.token);
      // Set the token in the API instance
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      
      // Navigate based on user role
      navigateToRoleDashboard(response.user.role);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Tiffix"
            style={{ maxWidth: "120px" }}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a 6-digit code to {email}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="otp" className="sr-only">
              Enter OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={otp}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className={`
                group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                ${
                  isLoading || otp.length !== 6
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }
              `}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={timeLeft > 0 || isLoading}
              className={`text-sm text-indigo-600 hover:text-indigo-500 ${
                timeLeft > 0 || isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {timeLeft > 0
                ? `Resend code in ${timeLeft}s`
                : "Resend verification code"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
