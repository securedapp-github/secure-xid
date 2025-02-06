import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: ""
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
      const response = await fetch("https://8082-38-137-52-117.ngrok-free.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
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
      const response = await fetch("https://8082-38-137-52-117.ngrok-free.app/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: formData.email, otp })
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
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
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md sm:w-96 md:w-[28rem] lg:w-[32rem]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Signup</h2>
      {!isOtpSent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" type="text" name="full_name" placeholder="Full Name" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="text" name="phone_number" placeholder="Phone Number" required onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button className="w-full bg-blue-500 text-white p-3 rounded text-lg md:text-xl">Create</button>
        </form>
      ) : (
        <div className="space-y-4">
          <input className="w-full p-3 border rounded" type="text" placeholder="Enter OTP" value={otp} onChange={handleOtpChange} required />
          <button className="w-full bg-green-500 text-white p-3 rounded text-lg md:text-xl" onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
      <p className="text-center mt-4">Already have an account? <button className="text-blue-500" onClick={toggleForm}>Login</button></p>
    </div>
  );
};

const Login = ({ toggleForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://8082-38-137-52-117.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        alert('Login successful!');
        localStorage.setItem("authToken", data.token);
        navigate('/kyc');  
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md sm:w-96 md:w-[28rem] lg:w-[32rem]">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-3 border rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input className="w-full p-3 border rounded" type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button className="w-full bg-blue-500 text-white p-3 rounded text-lg md:text-xl" type="submit">Login</button>
      </form>
      <p className="text-center mt-4">Don't have an account? <button className="text-blue-500" onClick={toggleForm}>Signup</button></p>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 bg-gray-100">
      {isLogin ? <Login toggleForm={() => setIsLogin(false)} /> : <Signup toggleForm={() => setIsLogin(true)} />}
    </div>
  );
};

export default AuthPage;
