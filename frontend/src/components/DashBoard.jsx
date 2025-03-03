import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./DashBoard.css";

const DashBoard = () => {
  // States for customer risk analysis
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [customerRiskScore, setCustomerRiskScore] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  // States for transaction analysis
  const [threshold, setThreshold] = useState(0);
  const [totalUSDValue, setTotalUSDValue] = useState(0);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [thresholdRisk, setThresholdRisk] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riskLevel, setRiskLevel] = useState(0);
  const [varianceRisk, setVarianceRisk] = useState(0);
  const [timeGapConsistency, setTimeGapConsistency] = useState(0);
  const [directionRisk, setDirectionRisk] = useState(0);
  const [crossWalletRisk, setCrossWalletRisk] = useState(0);
  const [circularRisk, setCircularRisk] = useState(0);
  const [address, setAddress] = useState("");
  const [totalRiskScore, setTotalRiskScore] = useState(0);
  const [annualIncomeRange, setAnnualIncomeRange] = useState("");
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionThreshold, setTransactionThreshold] = useState(null);
  const [transactionRiskScore, setTransactionRiskScore] = useState(null);
  // States for transaction behavioral analysis
  const [transactionBehavior, setTransactionBehavior] = useState("");
  const [behavioralRiskScore, setBehavioralRiskScore] = useState(null);

  // State for the aggregated result
  const [aggregateScore, setAggregateScore] = useState(null);
  const [inputAddress, setInputAddress] = useState("");
  const [calculationType, setCalculationType] = useState("annual"); // 'annual' or 'monthly'
  const ALCHEMY_API_KEY = "gQ3YwPsTCsqwjr1ocrnONX63jiNZKkVT";

  const alchemyUrl = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;
  const coingeckoUrl = "https://api.coingecko.com/api/v3/simple/price";

  const [kycStatusFromAPI, setKycStatusFromAPI] = useState("");
  const [walletAddressFromAPI, setWalletAddressFromAPI] = useState("");
  const [kycLoading, setKycLoading] = useState(false);
  const [kycError, setKycError] = useState(null);

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
 
   const incomeRanges = {
    "< $25000": [25000, 25000], // [min, max]
    "$25000 - $50000": [25000, 50000],
    "$50000 - $100000": [50000, 100000],
    "$100000 - $500000": [100000, 500000],
    "$500000 - $1000000": [500000, 1000000],
    "$1000000+": [1000000, 1000000], // Use Infinity for the upper bound
  };
  
   const transactionScores = {
    low: 20,
    medium: 60,
    high: 100,
  };
  
 
   const behaviorScores = {
     "Suspicious Past": 90,
     "Normal Past": 50,
     "Very Good Past": 10,
   };


  useEffect(() => {
    if (!address) return;

    const fetchTransactions = async () => {
      try {
        const response = await axios.post(alchemyUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getAssetTransfers",
          params: [{
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: address,
            category: ["external", "erc20", "erc721", "erc1155"],
          }],
        });

        const transfers = response.data.result.transfers || [];
        await processTransactions(transfers, selectedYear, selectedMonth);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address, selectedYear, selectedMonth]);

  const processTransactions = async (transfers, selectedYear, selectedMonth) => {
    const txCountsByDay = {};
    const updatedTransactions = [];
    let stableValues = [];
    let totalUSD = 0;

    const uniqueAssets = [...new Set(transfers.map((tx) => tx.asset).filter(Boolean))];
    const exchangeRates = await fetchExchangeRates(uniqueAssets);

    for (let i = 0; i < transfers.length; i++) {
      const tx = transfers[i];

      try {
        const blockResponse = await axios.post(alchemyUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: [tx.blockNum, true],
        });

        const timestampHex = blockResponse?.data?.result?.timestamp;
        if (!timestampHex) {
          console.warn("❌ Missing timestamp for block:", tx.blockNum);
          continue;
        }

        const timestamp = parseInt(timestampHex, 16) * 1000;
        const dateObj = new Date(timestamp);

        if (isNaN(dateObj.getTime())) {
          console.warn("❌ Date conversion failed for timestamp:", timestamp);
          continue;
        }

        // Apply filter based on calculation type
        if (
          !isFilterApplied ||
          (calculationType === "annual" && dateObj.getFullYear() === selectedYear) ||
          (calculationType === "monthly" &&
            dateObj.getFullYear() === selectedYear &&
            dateObj.getMonth() + 1 === selectedMonth)
        ) {
          const formattedDate = dateObj.toISOString().split("T")[0];

          // Convert transaction value to USD
          const asset = tx.asset;
          const tokenValue = parseFloat(tx.value) || 0;
          const usdValue = await convertToUSD(asset, tokenValue, exchangeRates);

          stableValues.push(usdValue);
          totalUSD += usdValue;

          updatedTransactions.push({
            ...tx,
            metadata: { blockTimestamp: timestamp },
            usdValue,
          });

          const key = `${formattedDate}_${tx.from}_${tx.to}`;
          txCountsByDay[key] = (txCountsByDay[key] || 0) + 1;
        }
      } catch (error) {
        console.error("❌ Error fetching block data:", error);
      }
    }

    setTransactions(updatedTransactions);
    setTotalUSDValue(totalUSD);

    // Calculate threshold based on income range
    const [minIncome, maxIncome] = incomeRanges[annualIncomeRange] || [0, 0];
    let calculatedThreshold;

    if (maxIncome === 0) {
      // Unbounded above (e.g., "$1000000+")
      calculatedThreshold = minIncome * 0.33; // 33% of the lower bound
    } else if (minIncome === 0) {
      // Unbounded below (e.g., "< $25000")
      calculatedThreshold = maxIncome * 0.33; // 33% of the upper bound
    } else {
      // Bounded range (e.g., "$25000 - $50000")
      const medianIncome = (minIncome + maxIncome) / 2;
      calculatedThreshold = medianIncome * 0.33; // 33% of the median
    }

    // Adjust threshold based on calculation type (annual or monthly)
    if (calculationType === "monthly") {
      calculatedThreshold = calculatedThreshold / 12; // Monthly threshold
    }

    // Update the threshold state
    setThreshold(calculatedThreshold);

    let thresholdRiskScore = 0;
    if (totalUSD > calculatedThreshold * 2) {
      thresholdRiskScore = 100; // High risk
    } else if (totalUSD > calculatedThreshold) {
      thresholdRiskScore = 50; // Medium risk
    } else {
      thresholdRiskScore = 0; // Low risk
    }

    setThresholdRisk(thresholdRiskScore);

    // Calculate other risk factors
    calculateRiskLevel(txCountsByDay);
    calculateVarianceRisk(stableValues);
    analyzeTimeGapConsistency(updatedTransactions);
    analyzeTransactionDirection(updatedTransactions);
    analyzeCrossWalletBehavior(updatedTransactions);
    analyzeCircularTransactionVolume(updatedTransactions);
  };

  const fetchExchangeRates = async (assets) => {
    if (assets.length === 0) return {};

    try {
      const assetList = [...new Set(assets.map(asset => asset.toLowerCase()))];
      if (!assetList.includes("ethereum")) assetList.push("ethereum"); // Ensure ETH is included

      const response = await axios.get(coingeckoUrl, {
        params: { ids: assetList.join(","), vs_currencies: "usd" }
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error fetching exchange rates:", error);
      return {};
    }
  };

  useEffect(() => {
    // This effect will run whenever any of the risk scores change
    computeRiskScores();
  }, [riskLevel, varianceRisk, timeGapConsistency, directionRisk, crossWalletRisk, circularRisk]);

  const computeRiskScores = () => {
    const scores = [
      riskLevel,
      varianceRisk,
      timeGapConsistency,
      directionRisk,
      crossWalletRisk,
      circularRisk,
      thresholdRisk, // Include threshold risk
    ];

    const validScores = scores.filter(score => typeof score === "number");
    if (validScores.length === 0) {
      setTotalRiskScore(0);
      setTransactionRiskScore(0);
      return;
    }

    const sumScores = validScores.reduce((sum, score) => sum + score, 0);
    const averageRisk = sumScores / validScores.length;

    setTotalRiskScore(averageRisk.toFixed(2));
    setTransactionRiskScore(averageRisk.toFixed(2));
  };

  const calculateCustomerRiskScore = () => {
    const countryScore = countries[selectedCountry] || 0;
    const occupationScore = occupations[selectedOccupation] || 0;
    const kycScore = kycScores[kycStatus] || 0;

    const totalRiskScore =
      0.3 * countryScore + 0.4 * occupationScore + 0.3 * kycScore;

    setCustomerRiskScore(totalRiskScore);
  };

  const calculateBehavioralRiskScore = () => {
    const behaviorScore = behaviorScores[transactionBehavior] || 0;
    setBehavioralRiskScore(behaviorScore);
  };
  const renderCalculationTypeDropdown = () => (
    <label className="block mb-4">
      Calculation Type:
      <select
        value={calculationType}
        onChange={(e) => setCalculationType(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
      >
        <option value="annual">Annual</option>
        <option value="monthly">Monthly</option>
      </select>
    </label>
  );

  const convertToUSD = async (asset, amount, exchangeRates) => {
    if (!asset || !amount) return 0;

    let assetId = asset.toLowerCase();
    if (assetId === "eth") assetId = "ethereum";

    if (exchangeRates[assetId]) return amount * exchangeRates[assetId].usd;

    console.warn(`⚠️ Price unavailable for ${asset}`);
    return 0;
  };

  const calculateRiskLevel = (txCountsByDay) => {
    const maxTxPerDay = Math.max(...Object.values(txCountsByDay), 0);
    if (maxTxPerDay > 20) setRiskLevel(90);
    else if (maxTxPerDay >= 5) setRiskLevel(50);
    else setRiskLevel(10);
  };

  const calculateVarianceRisk = (values) => {
    if (values.length < 2) {
      setVarianceRisk("Insufficient data");
      return;
    }

    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const variance = values.map(val => Math.abs((val - mean) / mean) * 100);
    const highVarianceCount = variance.filter(v => v > 15).length;
    const mediumVarianceCount = variance.filter(v => v >= 5 && v <= 15).length;
    const totalTransactions = variance.length;

    if (highVarianceCount / totalTransactions >= 0.8) setVarianceRisk(90);
    else if (mediumVarianceCount / totalTransactions >= 0.5) setVarianceRisk(50);
    else setVarianceRisk(10);
  };

  const analyzeTimeGapConsistency = (timestamps) => {
    if (timestamps.length < 2) {
      setTimeGapConsistency("Insufficient data");
      return;
    }

    timestamps.sort((a, b) => a - b);

    let timeGaps = [];
    for (let i = 1; i < timestamps.length; i++) {
      const gap = (timestamps[i] - timestamps[i - 1]) / 1000 / 60;
      timeGaps.push(gap);
    }

    const avgGap = timeGaps.reduce((sum, gap) => sum + gap, 0) / timeGaps.length;
    const deviation = timeGaps.map(gap => Math.abs((gap - avgGap) / avgGap) * 100);

    const highDeviationCount = deviation.filter(d => d > 50).length;
    const mediumDeviationCount = deviation.filter(d => d >= 20 && d <= 50).length;
    const totalTransactions = deviation.length;

    if (highDeviationCount / totalTransactions >= 0.7) {
      setTimeGapConsistency(10);
    } else if (mediumDeviationCount / totalTransactions >= 0.5) {
      setTimeGapConsistency(50);
    } else {
      setTimeGapConsistency(10);
    }
  };

  const analyzeTransactionDirection = (transactions) => {
    const txMap = new Map();
    transactions.forEach(tx => {
      const key = `${tx.from}_${tx.to}`;
      if (!txMap.has(key)) txMap.set(key, []);
      txMap.get(key).push(tx.metadata.blockTimestamp);
    });

    let loopCount = 0, backAndForthCount = 0;
    for (let [key, timestamps] of txMap.entries()) {
      const [from, to] = key.split("_");
      const reverseKey = `${to}_${from}`;
      if (txMap.has(reverseKey)) {
        timestamps.sort((a, b) => a - b);
        const reverseTimestamps = txMap.get(reverseKey).sort((a, b) => a - b);

        timestamps.forEach(ts => {
          if (reverseTimestamps.some(rt => Math.abs(rt - ts) <= 24 * 60 * 60 * 1000)) {
            loopCount++;
          } else {
            backAndForthCount++;
          }
        });
      }
    }

    const totalPairs = txMap.size;
    if (loopCount / totalPairs >= 0.5) setDirectionRisk(90);
    else if (backAndForthCount / totalPairs >= 0.3) setDirectionRisk(50);
    else setDirectionRisk(10);
  };

  const analyzeCrossWalletBehavior = (transactions) => {
    const interactionMap = new Map();
    transactions.forEach(tx => {
      if (!interactionMap.has(tx.to)) {
        interactionMap.set(tx.to, new Set());
      }
      interactionMap.get(tx.to).add(tx.from);
    });

    let highRiskCount = 0, mediumRiskCount = 0, lowRiskCount = 0;
    interactionMap.forEach((senders, receiver) => {
      const senderCount = senders.size;
      if (senderCount > 10) highRiskCount++;
      else if (senderCount > 3) mediumRiskCount++;
      else lowRiskCount++;
    });

    if (highRiskCount > mediumRiskCount && highRiskCount > lowRiskCount) {
      setCrossWalletRisk(90);
    } else if (mediumRiskCount > lowRiskCount) {
      setCrossWalletRisk(50);
    } else {
      setCrossWalletRisk(10);
    }
  };

  const analyzeCircularTransactionVolume = (transactions) => {
    let totalSent = 0, totalReturned = 0;
    const sentMap = new Map();

    transactions.forEach(tx => {
      if (!sentMap.has(tx.from)) {
        sentMap.set(tx.from, 0);
      }
      sentMap.set(tx.from, sentMap.get(tx.from) + tx.usdValue);
    });

    transactions.forEach(tx => {
      if (sentMap.has(tx.to)) {
        totalReturned += tx.usdValue;
      }
      totalSent += tx.usdValue;
    });

    const returnPercentage = (totalReturned / totalSent) * 100;

    if (returnPercentage > 70) {
      setCircularRisk(90);
    } else if (returnPercentage > 30) {
      setCircularRisk(50);
    } else {
      setCircularRisk(10);
    }
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
  const aggregateResults = () => {
    const scores = [
      { score: totalRiskScore, weight: 0.5 }, // 50% weight
      { score: customerRiskScore, weight: 0.3 }, // 30% weight
      { score: behavioralRiskScore, weight: 0.2 }, // 20% weight
    ].filter((entry) => entry.score !== null); // Filter out null scores
    console.log(scores);

    // Check if all required scores are available
    if (scores.length === 3) {
      // Calculate the weighted score
      const weightedScore = scores.reduce(
        (sum, { score, weight }) => sum + score * weight,
        0
      );

      // Scale the score to 1000
      const scaledScore = weightedScore * 10; // Scale to 1000

      // Set the aggregate score
      setAggregateScore(scaledScore);
    } else {
      // Alert if any score is missing
      alert("Please calculate all scores before aggregating.");
    }
  };

  const getQuote = (score) => {
    if (score > 700) {
      return "This transaction is suspicious! You are under government surveillance.";
    } else if (score > 400) {
      return "You are being monitored for potential risk. Please proceed cautiously.";
    } else {
      return "Your activity looks clean and secure. Keep up the good work!";
    }
  }
 
 return (
  <div className="min-h-screen bg-[#FAFAFA] flex">
  {/* Left Sidebar */}
  <div className="w-60 bg-blue-500 text-white p-4">
    <div className="text-2xl font-bold mb-8">
      SECURE<span className="text-white">X</span>-ID
    </div>
    <h2 className="text-xl font-semibold mb-6">Risk Scoring Module</h2>
    <ul className="space-y-4">
      <li className="hover:bg-blue-800 p-2 rounded-md">Customer Risk Analysis</li>
      <li className="hover:bg-blue-800 p-2 rounded-md">Transaction Analysis</li>
      <li className="hover:bg-blue-800 p-2 rounded-md">Behavioral Analysis</li>
    </ul>
  </div>

  {/* Main Content */}
  <div className="flex-1 p-4 sm:p-8">
    {/* Header Section */}
    <header className="mb-8 flex justify-between items-center">
      <div className="flex items-center">
        {kycLoading ? (
          <span>Loading KYC status...</span>
        ) : kycError ? (
          <span className="text-red-500">{kycError}</span>
        ) : (
          <div className="flex items-center">
            <span className="mr-2">KYC Status: {kycStatusFromAPI}</span>
            <span className="mr-2">Wallet: {walletAddressFromAPI}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        )}
      </div>
    </header>

    {/* Filter Section */}
    <div className="flex justify-end mb-6">
      <div className="flex items-center space-x-4 bg-blue-500 p-3 rounded-lg shadow-md">
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

    {/* Main Content Section */}
    <div className="app-container">
      <h1 className="text-3xl font-bold mb-6">Risk Scoring Model</h1>
     
      <div className="mt-6">
        {isFilterApplied ? (
          <p className="text-lg font-semibold">
            Showing transactions for {new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })} {selectedYear}
          </p>
        ) : (
          <p className="text-lg font-semibold">Showing all transactions</p>
        )}
      </div>

      {/* Grid Layout for Analysis Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Customer Risk Analysis Section */}
        <div className="analysis-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Customer Risk Analysis</h2>
          <label className="block mb-4">
            Country:
            <input
              type="text"
              value={selectedCountry}
              onChange={handleCountrySearch}
              placeholder="Search country"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
            />
          </label>
          {filteredCountries.length > 0 && (
            <ul className="autocomplete-list mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setFilteredCountries([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
          <label className="block mb-4">
            Occupation:
            <select
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
            >
              <option value="">Select an Occupation</option>
              {Object.keys(occupations).map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            KYC Status:
            <select
              value={kycStatus}
              onChange={(e) => setKycStatus(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
            >
              <option value="">Select KYC Status</option>
              {Object.keys(kycScores).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button 
            onClick={calculateCustomerRiskScore}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Calculate Customer Risk Score
          </button>
          {customerRiskScore !== null && (
            <p className="mt-4 text-lg font-semibold">Customer Risk Score: {customerRiskScore.toFixed(2)}</p>
          )}
        </div>

        {/* Transaction Analysis Section */}
        <div className="analysis-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Transaction Analysis</h2>
          <input 
            type="text" 
            placeholder="Enter wallet address" 
            value={inputAddress} 
            onChange={(e) => setInputAddress(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
          />
          <button 
            onClick={() => setAddress(inputAddress)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mt-4"
          >
            Fetch Transactions
          </button>
          <label className="block mb-4 mt-6">
            Annual Income Range:
            <select
              value={annualIncomeRange}
              onChange={(e) => setAnnualIncomeRange(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
            >
              <option value="">Select Income Range</option>
              {Object.keys(incomeRanges).map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </label>
          {annualIncomeRange && (
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Annual Threshold: ${(((incomeRanges[annualIncomeRange][0] + incomeRanges[annualIncomeRange][1]) / 2) * 0.33).toFixed(2)}
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-lg font-semibold">
              Total USD Value: ${totalUSDValue.toFixed(2)}
            </p>
          </div>
          {transactionRiskScore !== null && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Transaction Risk Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Transaction Frequency Risk:</span>
                  <span>{riskLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction Amount Variance Risk:</span>
                  <span>{varianceRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time Gap Consistency:</span>
                  <span>{timeGapConsistency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction Direction Risk:</span>
                  <span>{directionRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cross-Wallet Behavior Risk:</span>
                  <span>{crossWalletRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Circular Transaction Volume Risk:</span>
                  <span>{circularRisk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Threshold Risk:</span>
                  <span>{thresholdRisk}</span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-lg font-semibold">Transaction Risk Score: {transactionRiskScore}</p>
              </div>
            </div>
          )}
        </div>

        {/* Behavioral Analysis Section */}
        <div className="analysis-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Behavioral Analysis</h2>
          <label className="block mb-4">
            Transaction Behavior:
            <select
              value={transactionBehavior}
              onChange={(e) => setTransactionBehavior(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00FF85] focus:border-transparent"
            >
              <option value="">Select a Behavior</option>
              {Object.keys(behaviorScores).map((behavior) => (
                <option key={behavior} value={behavior}>
                  {behavior}
                </option>
              ))}
            </select>
          </label>
          <button 
            onClick={calculateBehavioralRiskScore}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Calculate Behavioral Risk Score
          </button>
          {behavioralRiskScore !== null && (
            <p className="mt-4 text-lg font-semibold">Behavioral Risk Score: {behavioralRiskScore}</p>
          )}
        </div>
      </div>

      {/* Aggregate Results Section */}
      <div className="mt-8 analysis-card bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">X-ID Score</h2>
        <button 
          onClick={aggregateResults}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Get X-ID Score
        </button>
        {aggregateScore !== null && (
          <div className="mt-4">
            <p className="text-lg font-semibold">X-ID Score: {aggregateScore.toFixed(2)}</p>
            <p className="text-gray-600">{getQuote(aggregateScore)}</p>
          </div>
        )}
      </div>
    </div>

    {/* Transaction Details Section */}
    <div className="mt-8 analysis-card bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Hash</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value (USD)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((tx, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.metadata?.blockTimestamp ? new Date(tx.metadata.blockTimestamp).toISOString().split("T")[0] : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.hash?.slice(0, 10)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${tx.usdValue?.toFixed(20) || "0.00"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.asset || "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    );
};
export default DashBoard;