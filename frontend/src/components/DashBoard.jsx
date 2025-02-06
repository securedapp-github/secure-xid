import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKycStatus = async () => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Decode JWT token to extract user_id
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.user_id; // Ensure this matches the structure of your token
        console.log(token)
        if (!userId) {
          setError("User ID not found in token.");
          setLoading(false);
          return;
        }

        // Make GET request to fetch KYC status
        const response = await axios.get(
          `https://8082-38-137-52-117.ngrok-free.app/kyc-status/${54}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        setKycStatus(response.data.status); // Set response data to state

      } catch (err) {
        console.error("Error fetching KYC status:", err);
        setError("Failed to fetch KYC status.");
      } finally {
        setLoading(false);
      }
    };

    fetchKycStatus();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p><strong>KYC Status:</strong> {kycStatus || "Unknown"}</p>
     
    </div>
  );
};

export default Dashboard;
