import React, { useState } from "react";

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Enter New Password
  const [message, setMessage] = useState("");
  const VITE_API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
  const handleSendOtp = async () => {
    try {
      const response = await fetch(
       `${VITE_API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("OTP sent to your email");
        setStep(2); // Move to OTP verification step
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
       `${VITE_API_BASE_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("OTP verified successfully");
        setStep(3); // Move to reset password step
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `${VITE_API_BASE_URL}/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully");
        onBackToLogin(); // Go back to login page
      } else {
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {step === 1 && (
        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-500 text-white p-3 rounded text-lg"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-500 text-white p-3 rounded text-lg"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-500 text-white p-3 rounded text-lg"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
      )}
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={onBackToLogin}
      >
        Back to Login
      </p>
      
    </div>
  );
};

export default ForgotPassword;