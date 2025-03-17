import React, { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonAmoy, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My DApp",
  projectId: "252ad358c903d28a5b6610ef5c98dac9",
  chains: [polygonAmoy, sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

const WalletConnectButton = () => {
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      console.log("Previously connected wallet:", storedAddress);
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex justify-center items-center">
            <ConnectButton.Custom>
              {({ account, openConnectModal, openAccountModal }) => {
                useEffect(() => {
                  if (account?.address) {
                    localStorage.setItem("walletAddress", account.address);
                  } else {
                    localStorage.removeItem("walletAddress");
                  }
                }, [account]);

                return (
                  <button
                    className={`relative flex items-center gap-2 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-lg ${
                      account
                        ? "bg-gradient-to-r from-[#7F5AF0] to-[#00FF85] hover:scale-105"
                        : "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:scale-105"
                    } backdrop-blur-xl`}
                    onClick={account ? openAccountModal : openConnectModal}
                  >
                    {account ? (
                      <>
                        <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                        <span>{account.displayName}</span>
                      </>
                    ) : (
                      "Connect Wallet"
                    )}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletConnectButton;
