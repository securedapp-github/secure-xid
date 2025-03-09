import React, { useEffect, useState } from 'react';
import { Clock, FileText, Calendar, LayoutGrid, PieChart, User, Network } from 'lucide-react';

const AdminDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For search functionality
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [calculationType, setCalculationType] = useState('annual');
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [profile, setProfile] = useState({
    status: '',
    wallet_address: '',
  });

  // Fetch all users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch('https://0x-idbackend.vercel.app/admin/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
        console.log('Fetched users:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.user_id;

        if (!userId) {
          console.error('User ID not found in token');
          return;
        }

        // Fetch profile data
        const response = await fetch(`https://0x-idbackend.vercel.app/kyc-status/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({
            status: data.status,
            wallet_address: data.wallet_address,
          });
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  // Handle KYC approval
  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`https://0x-idbackend.vercel.app/users/${userId}/approve`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
        setFilteredUsers((prevUsers) =>
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
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch(`https://0x-idbackend.vercel.app/users/${userId}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
        setFilteredUsers((prevUsers) =>
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

  // Handle search by name
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.userDetails.fullName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 w-full fixed top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-2xl font-bold">
            SECURE<span className="text-[#00FF85]">X</span>-ID
          </span>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-8 mt-16"> {/* Add margin-top to avoid overlap with navbar */}
        {/* Sidebar and Content */}
        <div className="flex flex-col md:flex-row">
          {/* Left Sidebar */}
          <div className="hidden md:flex w-24 min-h-screen bg-white border-r border-gray-200 flex-col items-center">
            <div className="w-full py-5 flex justify-center">
              <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="text-gray-600 w-6 h-6" />
              </div>
            </div>

            {/* Icons */}
            {[Clock, FileText, Calendar, LayoutGrid, PieChart, User, Network].map((Icon, index) => (
              <div key={index} className="w-full py-5 flex justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="text-gray-600 w-6 h-6" />
                </div>
              </div>
            ))}

            {/* Bottom Logo */}
            <div className="mt-auto mb-10 w-full flex justify-center">
              <div className="bg-blue-700 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">X</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Filter Section */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center space-x-4 bg-blue-500 p-3 rounded-lg shadow-md">
                {/* Calculation Type Dropdown */}
                <label className="text-white">
                  Calculation Type:
                  <select
                    value={calculationType}
                    onChange={(e) => setCalculationType(e.target.value)}
                    className="ml-2 bg-blue-500 text-white border-none focus:outline-none"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </select>
                </label>

                {/* Year Dropdown */}
                <label className="text-white">
                  Year:
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="ml-2 bg-transparent text-white border-none focus:outline-none"
                  >
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <option key={year} value={year} className="bg-blue-500">
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Month Dropdown (only shown for monthly calculation) */}
                {calculationType === 'monthly' && (
                  <label className="text-white">
                    Month:
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                      className="ml-2 bg-transparent text-white border-none focus:outline-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month} className="bg-blue-500">
                          {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {/* Apply and Clear Buttons */}
                <button
                  onClick={() => setIsFilterApplied(true)}
                  className="bg-white text-blue-500 py-1 px-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Apply
                </button>
                <button
                  onClick={() => setIsFilterApplied(false)}
                  className="bg-white text-blue-500 py-1 px-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>

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
                      X-ID Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
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
                        {user.xidScore || 'N/A'}
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
      </div>
    </div>
  );
};

export default AdminDashBoard;