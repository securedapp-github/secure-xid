import React, { useState } from "react";
import  "./DashBoard.css"

const DashBoard = () => {
  // States for customer risk analysis
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [customerRiskScore, setCustomerRiskScore] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  // States for transaction analysis
  const [transactionThreshold, setTransactionThreshold] = useState(null);
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionRiskScore, setTransactionRiskScore] = useState(null);
  const [annualIncomeRange, setAnnualIncomeRange] = useState("");

  // States for transaction behavioral analysis
  const [transactionBehavior, setTransactionBehavior] = useState("");
  const [behavioralRiskScore, setBehavioralRiskScore] = useState(null);

  // State for the aggregated result
  const [aggregateScore, setAggregateScore] = useState(null);
  //new risk scoring
  const [transactionFrequency, setTransactionFrequency] = useState("");
  const [amountVariance, setAmountVariance] = useState("");
  const [timeGapConsistency, setTimeGapConsistency] = useState("");
  const [transactionDirection, setTransactionDirection] = useState("");
  const [crossWalletBehavior, setCrossWalletBehavior] = useState("");
  const [circularTransactionVolume, setCircularTransactionVolume] = useState("");

  // Data for scoring
  const countries = {
    Afghanistan: 80,
    Albania: 40,
    Algeria: 50,
    Andorra: 10,
    Angola: 70,
    Argentina: 45,
    Armenia: 35,
    Australia: 10,
    Austria: 15,
    Azerbaijan: 50,
    Bahrain: 20,
    Bangladesh: 55,
    Barbados: 10,
    Belarus: 60,
    Belgium: 20,
    Belize: 65,
    Benin: 50,
    Bhutan: 10,
    Bolivia: 70,
    Botswana: 40,
    Brazil: 80,
    Brunei: 10,
    Bulgaria: 50,
    "Burkina Faso": 60,
    Cambodia: 70,
    Cameroon: 65,
    Canada: 10,
    Chile: 30,
    China: 40,
    Colombia: 75,
    "Costa Rica": 40,
    Croatia: 30,
    Cuba: 50,
    Cyprus: 20,
    "Czech Republic": 20,
    Denmark: 5,
    Djibouti: 50,
    Dominica: 20,
    "Dominican Republic": 60,
    Ecuador: 55,
    Egypt: 50,
    "El Salvador": 85,
    Estonia: 10,
    Eswatini: 40,
    Ethiopia: 60,
    Fiji: 30,
    Finland: 5,
    France: 15,
    Gabon: 50,
    Gambia: 45,
    Georgia: 20,
    Germany: 15,
    Ghana: 50,
    Greece: 25,
    Grenada: 15,
    Guatemala: 75,
    Guinea: 65,
    Guyana: 55,
    Haiti: 80,
    Honduras: 90,
    Hungary: 30,
    Iceland: 5,
    India: 30,
    Indonesia: 40,
    Iran: 50,
    Iraq: 85,
    Ireland: 10,
    Israel: 20,
    Italy: 25,
    Jamaica: 75,
    Japan: 10,
    Jordan: 25,
    Kazakhstan: 45,
    Kenya: 60,
    "North Korea": 90,
    "South Korea": 10,
    Kuwait: 15,
    Kyrgyzstan: 50,
    Laos: 60,
    Latvia: 25,
    Lebanon: 70,
    Lesotho: 60,
    Liberia: 70,
    Libya: 85,
    Lithuania: 40,
    Luxembourg: 10,
    Madagascar: 60,
    Malawi: 55,
    Malaysia: 35,
    Maldives: 20,
    Mali: 65,
    Malta: 10,
    Mauritania: 60,
    Mauritius: 20,
    Mexico: 85,
    Moldova: 50,
    Monaco: 5,
    Mongolia: 40,
    Montenegro: 30,
    Morocco: 25,
    Mozambique: 60,
    Myanmar: 80,
    Namibia: 50,
    Nepal: 40,
    Netherlands: 15,
    "New Zealand": 10,
    Nicaragua: 65,
    Niger: 60,
    Nigeria: 85,
    Norway: 5,
    Oman: 15,
    Pakistan: 70,
    Panama: 40,
    Paraguay: 55,
    Peru: 55,
    Philippines: 60,
    Poland: 25,
    Portugal: 15,
    Qatar: 10,
    Romania: 30,
    Russia: 70,
    Rwanda: 20,
    "San Marino": 5,
    "Saudi Arabia": 20,
    Senegal: 50,
    Serbia: 40,
    Seychelles: 20,
    Singapore: 5,
    Slovakia: 25,
    Slovenia: 15,
    Somalia: 90,
    "South Africa": 80,
    Spain: 20,
    Sudan: 85,
    Suriname: 60,
    Sweden: 15,
    Switzerland: 5,
    Syria: 90,
    Taiwan: 10,
    Tajikistan: 50,
    Tanzania: 60,
    Thailand: 50,
    Togo: 55,
    Tonga: 20,
    Tunisia: 40,
    Turkey: 45,
    Turkmenistan: 50,
    Uganda: 65,
    Ukraine: 70,
    "United Arab Emirates": 10,
    "United Kingdom": 15,
    "United States": 20,
    Uruguay: 15,
    Uzbekistan: 50,
    Vanuatu: 20,
    Venezuela: 85,
    Vietnam: 40,
    Yemen: 90,
    Zambia: 50,
    Zimbabwe: 60,
    others: 50,
  };
  
  const occupations = {
    "Politically Exposed": 80,
    "Gambling Industry": 70,
    "Healthcare Worker": 20,
    Engineer: 10,
    Teacher: 10,
    Entrepreneur: 30,
    Lawyer: 40,
    Banker: 50,
    "Real Estate Agent": 60,
    "Casino Operator": 75,
    "Cryptocurrency Trader": 65,
    "Money Service Business Operator": 70,
    "Art Dealer": 55,
    "Precious Metals Dealer": 60,
    "Arms Dealer": 90,
    "Import/Export Business": 50,
    "NGO/Fundraiser": 35,
    Accountant: 40,
    "Stock Broker": 55,
    "High-Value Goods Dealer": 65,
    "Private Consultant": 45,
    "Pharmaceutical Distributor": 50,
    "Shipping/Logistics": 50,
    "Luxury Car Dealer": 60,
    "Sports Agent": 45,
    "Investment Advisor": 55,
    "Pawn Shop Owner": 65,
    "others":50
  };
  
   const kycScores = {
     "Fully Verified": 10,
     "Partially Verified": 50,
     "Not Verified": 80,
   };
 
  
  const transactionScores = { low: 10, medium: 50, high: 80 };
  
 
   const behaviorScores = {
     "Suspicious Past": 90,
     "Normal Past": 50,
     "Very Good Past": 10,
   };
 
   const incomeRanges = {
    '< $10,000': 10000 ,
    '$10,000 - $25,000': 25000 ,
    '$25,000 - $50,000': 50000 ,
    '$50,000 - $100,000': 100000,
    '$100,000 - $250,000': 250000, 
    '$250,000+': 500000 
   };



  const handleCountrySearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSelectedCountry(query);
    if (query) {
      const filtered = Object.keys(countries).filter((country) =>
        country.toLowerCase().startsWith(query)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  // Calculate Customer Risk Score
  const calculateCustomerRiskScore = () => {
    const countryScore = countries[selectedCountry] || 0;
    const occupationScore = occupations[selectedOccupation] || 0;
    const kycScore = kycScores[kycStatus] || 0;

    const totalRiskScore =
      0.3 * countryScore + 0.4 * occupationScore + 0.3 * kycScore;

    setCustomerRiskScore(totalRiskScore);
  };

  // Calculate Transaction Risk Score
  const calculateTransactionRiskScore = () => {
    const transactionValueNumber = parseFloat(transactionValue) || 0;
    const incomeMedian = incomeRanges[annualIncomeRange] || 0;
    const threshold = incomeMedian * 0.33;
    setTransactionThreshold(threshold);
    let score = 0;

    if (transactionValueNumber <= threshold) score = transactionScores.low;
    else if (transactionValueNumber <= 2 * threshold) score = transactionScores.medium;
    else score = transactionScores.high;

    setTransactionRiskScore(score);
  };

  // Calculate Behavioral Risk Score
  const calculateBehavioralRiskScore = () => {
    const behaviorScore = behaviorScores[transactionBehavior] || 0;
    setBehavioralRiskScore(behaviorScore);
  };

  const calculateNewRiskScores = () => {
    const frequencyScore = transactionFrequency === "high" ? 30 : transactionFrequency === "medium" ? 20 : 10;
    const varianceScore = amountVariance === "high" ? 30 : amountVariance === "medium" ? 20 : 10;
    const timeGapScore = timeGapConsistency === "high" ? 30 : timeGapConsistency === "medium" ? 20 : 10;
    const directionScore = transactionDirection === "high" ? 30 : transactionDirection === "medium" ? 20 : 10;
    const crossWalletScore = crossWalletBehavior === "high" ? 30 : crossWalletBehavior === "medium" ? 20 : 10;
    const circularVolumeScore = circularTransactionVolume === "high" ? 30 : circularTransactionVolume === "medium" ? 20 : 10;

    return {
      frequencyScore,
      varianceScore,
      timeGapScore,
      directionScore,
      crossWalletScore,
      circularVolumeScore,
    };
  };

  // Aggregate Results
  const aggregateResults = () => {
    const scores = [
      { score: transactionRiskScore, weight: 0.5 },
      { score: customerRiskScore, weight: 0.2 },
      { score: behavioralRiskScore, weight: 0.3 },
      ...Object.values(calculateNewRiskScores()).map(score => ({ score, weight: 0.1 })),
    ].filter((entry) => entry.score !== null);

    if (scores.length === 9) {
      const weightedScore = scores.reduce(
        (sum, { score, weight }) => sum + score * weight,
        0
      );
      const scaledScore = weightedScore * 10; // Scale to 1000
      setAggregateScore(scaledScore);
    } else {
      alert("Please calculate all scores before aggregating.");
    }
  };

  // Generate Quote Based on Aggregate Score
  const getQuote = (score) => {
    if (score > 700) {
      return "This transaction is suspicious! You are under government surveillance.";
    } else if (score > 400) {
      return "You are being monitored for potential risk. Please proceed cautiously.";
    } else {
      return "Your activity looks clean and secure. Keep up the good work!";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 sm:p-8">
      <header className="mb-8 text-center sm:text-left">
        <div className="flex justify-center sm:justify-start items-center">
          <span className="text-2xl font-bold">
            SECURE<span className="text-[#00FF85]">X</span>-ID
          </span>
        </div>
        
      </header>
      <div className="app-container">
        <h1>Risk Scoring Model</h1>
        <div className="analysis-container">
          {/* Customer Risk Analysis Section */}
          <div className="analysis-card">
            <h2>Customer Risk Analysis</h2>
            <label>
              Country:
              <input
                type="text"
                value={selectedCountry}
                onChange={handleCountrySearch}
                placeholder="Search country"
              />
            </label>
            {filteredCountries.length > 0 && (
              <ul className="autocomplete-list">
                {filteredCountries.map((country) => (
                  <li
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setFilteredCountries([]);
                    }}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
            <label>
              Occupation:
              <select
                value={selectedOccupation}
                onChange={(e) => setSelectedOccupation(e.target.value)}
              >
                <option value="">Select an Occupation</option>
                {Object.keys(occupations).map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </label>
            <label>
              KYC Status:
              <select
                value={kycStatus}
                onChange={(e) => setKycStatus(e.target.value)}
              >
                <option value="">Select KYC Status</option>
                {Object.keys(kycScores).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={calculateCustomerRiskScore}>
              Calculate Customer Risk Score
            </button>
            {customerRiskScore !== null && (
              <p>Customer Risk Score: {customerRiskScore.toFixed(2)}</p>
            )}
          </div>

          {/* Transaction Analysis Section */}
          <div className="analysis-card">
            <h2>Transaction Analysis</h2>
            <label>
            Annual Income Range:
              <select
                value={annualIncomeRange}
                onChange={(e) => setAnnualIncomeRange(e.target.value)}
              >
                <option value="">Select an Income Range</option>
                {Object.keys(incomeRanges).map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>
            {transactionThreshold !== null && (
              <p>Calculated Threshold: {transactionThreshold.toFixed(2)}</p>
            )}
            <label>
              Transaction Value:
              <input
                type="number"
                value={transactionValue}
                onChange={(e) => setTransactionValue(e.target.value)}
                placeholder="Enter transaction value"
              />
            </label>
            <button onClick={calculateTransactionRiskScore}>
              Calculate Transaction Risk Score
            </button>
            {transactionRiskScore !== null && (
              <p>Transaction Risk Score: {transactionRiskScore}</p>
            )}
          </div>

          {/* Transaction Behavioral Analysis Section */}
          <div className="analysis-card">
            <h2>Behavioral Analysis</h2>
            <label>
              Transaction Behavior:
              <select
                value={transactionBehavior}
                onChange={(e) => setTransactionBehavior(e.target.value)}
              >
                <option value="">Select a Behavior</option>
                {Object.keys(behaviorScores).map((behavior) => (
                  <option key={behavior} value={behavior}>
                    {behavior}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={calculateBehavioralRiskScore}>
              Calculate Behavioral Risk Score
            </button>
            {behavioralRiskScore !== null && (
              <p>Behavioral Risk Score: {behavioralRiskScore}</p>
            )}
          </div>

          <div className="analysis-card">
            <h2>Additional Risk Scoring Criteria</h2>
            <label>
              Frequency of Transactions with the Same Wallet:
              <select
                value={transactionFrequency}
                onChange={(e) => setTransactionFrequency(e.target.value)}
              >
                <option value="">Select Frequency</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
            <label>
              Transaction Amount Variance:
              <select
                value={amountVariance}
                onChange={(e) => setAmountVariance(e.target.value)}
              >
                <option value="">Select Variance</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
            <label>
              Time Gap Consistency:
              <select
                value={timeGapConsistency}
                onChange={(e) => setTimeGapConsistency(e.target.value)}
              >
                <option value="">Select Consistency</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
            <label>
              Direction of Transactions:
              <select
                value={transactionDirection}
                onChange={(e) => setTransactionDirection(e.target.value)}
              >
                <option value="">Select Direction</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
            <label>
              Cross-Wallet Behavior:
              <select
                value={crossWalletBehavior}
                onChange={(e) => setCrossWalletBehavior(e.target.value)}
              >
                <option value="">Select Behavior</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
            <label>
              Circular Transaction Volume:
              <select
                value={circularTransactionVolume}
                onChange={(e) => setCircularTransactionVolume(e.target.value)}
              >
                <option value="">Select Volume</option>
                <option value="high">High Risk (3 pts)</option>
                <option value="medium">Medium Risk (2 pts)</option>
                <option value="low">Low Risk (1 pt)</option>
              </select>
            </label>
          </div>

            {/* Aggregate Results Section */}
            <div className="analysis-card">
            <h2>X-ID Results</h2>
            <button onClick={aggregateResults}>Get X-ID Result</button>
            {aggregateScore !== null && (
              <div>
                <p>X-ID Score: {aggregateScore.toFixed(2)}</p>
                <p>{getQuote(aggregateScore)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

            
            
  );
};

export default DashBoard;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const Dashboard = () => {
//   const [kycStatus, setKycStatus] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchKycStatus = async () => {
//       const token = localStorage.getItem("authToken"); // Get token from localStorage

//       if (!token) {
//         setError("No authentication token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Decode JWT token to extract user_id
//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken?.user_id; // Ensure this matches the structure of your token
//         console.log(token)
//         if (!userId) {
//           setError("User ID not found in token.");
//           setLoading(false);
//           return;
//         }

//         // Make GET request to fetch KYC status
//         const response = await axios.get(
//           `https://8082-38-137-52-117.ngrok-free.app/kyc-status/${54}`,
//           {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//             },
//           }
//         );

//         setKycStatus(response.data.status); // Set response data to state

//       } catch (err) {
//         console.error("Error fetching KYC status:", err);
//         setError("Failed to fetch KYC status.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchKycStatus();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p><strong>KYC Status:</strong> {kycStatus || "Unknown"}</p>
     
//     </div>
//   );
// };

// export default Dashboard;
