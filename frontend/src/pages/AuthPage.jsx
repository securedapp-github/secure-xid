import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logosecuredapp.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    reEnterPassword: "", // New field for re-entering password
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.reEnterPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://7571-38-183-11-158.ngrok-free.app/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        "https://7571-38-183-11-158.ngrok-free.app/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        toast.success("OTP Verified! Now log in.");
  
        // Delay the form toggle to allow the toast to be displayed
        setTimeout(() => {
          toggleForm();
        }, 2000); // 2 seconds delay
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {!isOtpSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="full_name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            required
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <input
            className="w-full p-3 border rounded"
            type="password"
            name="reEnterPassword"
            placeholder="Re-enter Password"
            required
            onChange={handleChange}
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded text-lg">
            Create
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <input
            className="w-full p-3 border rounded"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
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
      <p className="mt-4 text-blue-500 cursor-pointer" onClick={toggleForm}>
        Already have an account? Login
      </p>
    </div>
  );
};

const Login = ({ toggleForm, onForgotPassword }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", data.token);
       console.log(data.token);
        // Delay navigation to allow the toast to be displayed
        setTimeout(() => {
          navigate("/kyc");
        }, 2000); // 2000 milliseconds (2 seconds) delay
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          className="w-full p-3 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </p>
        </div>
        <button
          className="w-full bg-blue-500 text-white p-3 rounded text-lg"
          type="submit"
        >
          Sign in
        </button>
      </form>
      <p className="mt-4 text-blue-500 cursor-pointer" onClick={toggleForm}>
        Create Account
      </p>
    </div>
  );
};

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Enter New Password

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        "https://7571-38-183-11-158.ngrok-free.app/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to your email");
        setStep(2); // Move to OTP verification step
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      toast.error("No authentication token found. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://7571-38-183-11-158.ngrok-free.app/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Password reset successfully!");
  
        // Delay the navigation to allow the toast to be displayed
        setTimeout(() => {
          onBackToLogin();
        }, 2000); // 2 seconds delay
      } else {
        toast.error(data.message || "Invalid OTP or failed to reset password");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
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
          <input
            className="w-full p-3 border rounded"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-green-500 text-white p-3 rounded text-lg"
            onClick={handleVerifyOtp}
          >
            Verify OTP and Reset Password
          </button>
        </div>
      )}
      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={onBackToLogin}
      >
        Back to Login
      </p>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-8 flex flex-col justify-center items-center">
      {/* Header */}
      <header className="absolute top-4 left-4 text-2xl font-bold">
        SECURE<span className="text-[#00FF85]">X</span>-ID
      </header>

      {/* Auth Card - Wider than before */}
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-12 flex flex-col sm:flex-row">
        {/* Left Side */}
        <div className="w-full sm:w-1/3 flex flex-col justify-center items-center sm:items-start">
          <h2 className="text-xl font-semibold">Realtime Aml Security</h2>
          <p
            className="text-blue-500 mt-2 cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full sm:w-2/3">
          {showForgotPassword ? (
            <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
          ) : isLogin ? (
            <Login
              toggleForm={() => setIsLogin(false)}
              onForgotPassword={() => setShowForgotPassword(true)}
            />
          ) : (
            <Signup toggleForm={() => setIsLogin(true)} />
          )}
        </div>
      </div>

      {/* SecureDApp Logo */}
      <div className="absolute bottom-8 flex items-center space-x-2">
        <img src={logo} alt="SecureDApp Logo" className="w-20" />
        <p className="font-semibold text-lg">SecureDApp</p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AuthPage;