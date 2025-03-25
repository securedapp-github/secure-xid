import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WalletConnectButton from "./WalletConnectButton";

const FaceId = ({ onBack, frontFile, backFile }) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isPhotoConfirmed, setIsPhotoConfirmed] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setIsPhotoConfirmed(false);
  };

  const retakePhoto = () => {
    setImageSrc(null);
    setIsPhotoConfirmed(false);
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ua = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ua[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const fetchUserRole = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${VITE_API_BASE_URL}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.role;
    } catch (error) {
      console.error("Error fetching user role:", error);
      toast.error("❌ Failed to fetch user role. Please try again.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!isPhotoConfirmed) {
      toast.warning("⚠️ Please confirm your photo before submitting.");
      return;
    }
    const countryName = localStorage.getItem('selectedCountryName');
    const token = localStorage.getItem("authToken");
    const walletAddress = localStorage.getItem("walletAddress");
    const country = localStorage.getItem("selectedCountry"); // Get country from localStorage
    
    if (!token) {
      toast.error("No token found, please log in.");
      return;
    }

    if (!country) {
      toast.error("Country not found. Please select your country first.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.user_id;
      if (!userId) {
        toast.error("User ID not found in token.");
        return;
      }

      if (frontFile && backFile && imageSrc) {
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("front_id", frontFile);
        formData.append("back_id", backFile);
        formData.append("selfie_with_id", dataURItoBlob(imageSrc));
        formData.append("wallet_address", walletAddress);
        formData.append("country", countryName); // Add country to the form data

        
        const response = await axios.post(
          `${VITE_API_BASE_URL}/upload-kyc`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          toast.success("✅ Your documents have been submitted successfully!");

          const userRole = await fetchUserRole(userId);
          if (userRole === "admin") {
            navigate("/admin-dashboard");
          } else if (userRole === "user") {
            navigate("/dashboard");
          } else {
            toast.error("❌ Unknown user role.");
          }
        }
      } else {
        toast.warning("⚠️ Please upload all required images.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("❌ Your documents could not be submitted. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg text-center">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Capture Your Photo</h2>

      {isPhotoConfirmed && (
        <h1 className="text-red-500 font-semibold mb-4">
          Once confirmed, no retake photo. Make sure you confirm the photo and
          connect your wallet before submitting.
        </h1>
      )}

      <div className="relative w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full"
          />
        )}

        <button
          onClick={imageSrc ? retakePhoto : capture}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {imageSrc ? "Retake Photo" : "Take Photo"}
        </button>
      </div>

      {imageSrc && (
        <div className="mt-4">
          {!isPhotoConfirmed ? (
            <button
              onClick={() => setIsPhotoConfirmed(true)}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              ✔️ Confirm Photo
            </button>
          ) : (
            <p className="text-green-600">Photo confirmed!</p>
          )}
        </div>
      )}

      <div className="mt-4">
        <WalletConnectButton onConnect={() => setIsWalletConnected(true)} />
        {isWalletConnected && <p className="text-green-600">Wallet connected!</p>}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FaceId;