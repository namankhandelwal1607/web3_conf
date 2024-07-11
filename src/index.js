import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';
import Stock from './pages/Stock';
import Homes from './pages/Homes';
import CryptoDetails from './components/CryptoDetails';
import reportWebVitals from './reportWebVitals';
import { wallets } from '@cosmos-kit/keplr-extension';
import { ChainProvider } from '@cosmos-kit/react';
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import mantra from './chainconfig';
import abiAssetManager from "./contracts/AssetManager.json";
import abiBet from "./contracts/Bet.json";
import { ethers } from "ethers";
import AssetManager from "./components/AssetManager";
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contractAssetManager: null,
    contractBet: null
  });
  const [account, setAccount] = useState("None");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddressAssetManager = "0x43Eb7948a0B74a95bbaE35b39835EBF9cB5FC6d5";
      const contractABIAssetManager = abiAssetManager.abi;

      const contractAddressBet = "0x7Bb8a73D2AD7d3e4B8BDb1700F5326863BA3df73";
      const contractABIBet = abiBet.abi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          if (!isConnecting) {
            setIsConnecting(true);

            const provider = new ethers.providers.Web3Provider(ethereum);
            // Request user permission for wallet connection (recommended)
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]); // Assuming only one account is connected

            const signer = provider.getSigner();
            const contractAssetManager = new ethers.Contract(contractAddressAssetManager, contractABIAssetManager, signer);
            const contractBet = new ethers.Contract(contractAddressBet, contractABIBet, signer);

            setState({ provider, signer, contractAssetManager, contractBet });

            // Listen for network changes and reload app
            ethereum.on("chainChanged", () => window.location.reload());

            // Listen for account changes and reload app
            ethereum.on("accountsChanged", () => window.location.reload());
          }
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        if (error.code === -32002) {
          console.log("MetaMask is already processing a request. Please wait.");
        } else {
          console.error(error);
        }
      } finally {
        setIsConnecting(false);
      }
    };

    connectWallet();
  }, [isConnecting]);

  console.log(state);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Crypto />,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        },
        {
          path: "/trending",
          element: <Trending />,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        },
        {
          path: "/saved",
          element: <Saved state={state}/>,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        },

        {
          path: "/assetManager",
          element: <AssetManager state={state}/>,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        },

        {
          path: "/stock",
          element: <Stock />,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        },
        {
          path: "/homes",
          element: <Homes />,
          children: [
            {
              path: ":coinId",
              element: <CryptoDetails />
            }
          ]
        }
      ]
    },
  ]);

  return (
    <ChainProvider
      chains={[...chains, mantra]}
      assetLists={assets}
      wallets={wallets}
    >
      <RouterProvider router={router} />
    </ChainProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
