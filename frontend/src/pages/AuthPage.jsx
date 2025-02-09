import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logosecuredapp.png";

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
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
    try {
      const response = await fetch(
        "https://8082-38-137-52-117.ngrok-free.app/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        "https://8082-38-137-52-117.ngrok-free.app/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );
      const data = await response.json();

      if (response.ok ) {
        alert("OTP Verified! Now log in.");
        toggleForm();
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {!isOtpSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" type="text" name="full_name" placeholder="Full Name" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="text" name="phone_number" placeholder="Phone Number" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button className="w-full bg-blue-500 text-white p-3 rounded text-lg">Create</button>
        </form>
      ) : (
        <div className="space-y-4">
          <input className="w-full p-3 border rounded" type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} required />
          <button className="w-full bg-green-500 text-white p-3 rounded text-lg" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
      <p className="mt-4 text-blue-500 cursor-pointer" onClick={toggleForm}>
        Already have an account? Login
      </p>
    </div>
  );
};

const Login = ({ toggleForm }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://8082-38-137-52-117.ngrok-free.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("authToken", data.token);
        navigate("/kyc");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input className="w-full p-3 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <p className="text-blue-500 cursor-pointer">Forgot Password?</p>
        </div>
        <button className="w-full bg-blue-500 text-white p-3 rounded text-lg" type="submit">Sign in</button>
      </form>
      <p className="mt-4 text-blue-500 cursor-pointer" onClick={toggleForm}>
        Create Account
      </p>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          <p className="text-blue-500 mt-2 cursor-pointer" onClick={() => setIsLogin(false)}>
            Create Account
          </p>
        </div>

        {/* Right Side (Form) */}
        <div className="w-full sm:w-2/3 ">{isLogin ? <Login toggleForm={() => setIsLogin(false)} /> : <Signup toggleForm={() => setIsLogin(true)} />}</div>
      </div>

      {/* SecureDApp Logo */}
      <div className="absolute bottom-8 flex items-center space-x-2">
        <img src={logo} alt="SecureDApp Logo" className="w-20" />
        <p className="font-semibold text-lg">SecureDApp</p>
      </div>
    </div>
  );
};

export default AuthPage;
