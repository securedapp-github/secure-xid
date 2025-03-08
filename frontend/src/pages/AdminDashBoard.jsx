import React, { useEffect, useState } from 'react';

const AdminDashBoard = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://119a-38-183-11-215.ngrok-free.app/admin/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the Bearer token
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
        console.log('Fetched users:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  // Handle KYC approval
  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`https://api.example.com/users/${userId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the user's KYC status in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, kycStatus: 'verified' } : user
          )
        );
      } else {
        console.error('Failed to approve user');
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  // Handle KYC rejection
  const handleReject = async (userId) => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`https://api.example.com/users/${userId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the user's KYC status in the local state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, kycStatus: 'rejected' } : user
          )
        );
      } else {
        console.error('Failed to reject user');
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold">
            SECURE<span className="text-[#00FF85]">X</span>-ID
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.userDetails.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.userDetails.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.kycDetails.walletAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.kycDetails.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(user.userDetails.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                        disabled={user.kycDetails.status === 'verified'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.userDetails.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                        disabled={user.kycDetails.status === 'rejected'}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;