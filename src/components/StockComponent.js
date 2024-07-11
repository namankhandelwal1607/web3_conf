import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from 'axios';

const TableComponent = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/stocks');
        setCryptoData(response.data);
        console.log('Crypto data fetched:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);




  const dataStock = async () => {
    console.log("Listing Stock");
    let symbol = formData.symbol;
    console.log(symbol);
    let name = formData.name;
    console.log(name);
    let price = formData.price;
    console.log(price);
    let stocks = formData.stocks;
    console.log(stocks);

    if (!symbol || !name || !price || !stocks) {
      console.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/list', {
        symbol,
        name,
        stocks,
        price
      });

      console.log(response.data.message); // Handle success message
    } catch (error) {
      console.error('Error adding stock:', error.response?.data?.message || error.message); // Handle error message
    }
  };

  const dataBuy = () => {
    console.log(formData.amount);
    console.log(selectedAsset.symbol);
  
  };
  

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [formData, setFormData] = useState({
    symbol: "",
    name: "",
    total_shares: "",
    available_shares: "",
    price_per_share: "",
    amount: "",
    price:"",
    stocks: "",
  });

  const openStockModal = () => {
    setIsStockModalOpen(true);
    setIsAssetModalOpen(false);
  };

  const closeStockModal = () => setIsStockModalOpen(false);

  const openAssetModal = (asset, index) => {
    setSelectedAsset({ ...asset, index });
    console.log(index);
    setIsAssetModalOpen(true);
    setIsStockModalOpen(false);
  };
  

  const closeAssetModal = () => setIsAssetModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dataStock();
    setFormData({
      symbol: "",
      name: "",
      total_shares: "",
      available_shares: "",
      price_per_share: "",
      amount: "",
    });
    closeStockModal();
  };

 

 

  const handleBuySubmit = async (e) => {
    e.preventDefault();
    const index = selectedAsset.index; // Ensure that selectedAsset has an index property
  
    console.log(index);
    console.log(selectedAsset);
  
    try {
      const response = await fetch(`http://localhost:3000/stock/${index}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
  
      // Optionally, update your frontend state here to reflect the change
      // e.g., removing the item from the displayed list of unbought stocks
  
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };
  
  
  

  return (
    <>
      <div className="relative">
        <button
          onClick={openStockModal}
          className="absolute top-[-6rem] right-[1rem] text-black font-semibold py-2 px-4 rounded bg-black hover:bg-gray-800 active:bg-gray-700 transition-colors duration-300 ease-in-out"
          style={{ backgroundColor: "#14FFEC", transition: "background-color 0.3s" }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0DA79A")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#14FFEC")}
        >
          List a Stock
        </button>
        {isStockModalOpen && (
          <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#212121] bg-opacity-90 p-6 rounded-lg shadow-lg text-white max-w-2xl w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Symbol:</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full rounded text-[#36454F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full rounded text-[#36454F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full rounded text-[#36454F]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">stocks</label>
                  <input
                    type="number"
                    name="stocks"
                    value={formData.stocks}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 w-full rounded text-[#36454F]"
                  />
                </div>
                <div className="flex justify-between">
                  <button onClick={dataStock} type="submit" className="bg-[#14FFEC] text-black font-semibold py-2 px-4 rounded hover:bg-[#0DA79A] transition-colors duration-300">
                    Submit
                  </button>
                  <button type="button" onClick={closeStockModal} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>

      <div className="flex flex-col mt-9 border border-gray-100 rounded">
      <table className="w-full table-auto">
          <thead className="capitalize text-base text-gray-100 font-medium border-b border-gray-100">
            <tr>
              <th className="py-1">symbol</th>
              <th className="py-1">name</th>
              <th className="py-1">price</th>
              <th className="py-1">stocks</th>
              <th className="py-1">Buy</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((data, index) => (
              <tr key={index} className="text-center text-base border-b border-gray-100 hover:bg-gray-200 last:border-b-0">
                <td className="py-4 flex items-center uppercase">{data.symbol}</td>
                <td className="py-4">{data.name}</td>
                <td className="py-4">{data.price}</td>
                <td className="py-4">{data.stocks}</td>
                <td className="py-4">
                  <button
                    onClick={() => openAssetModal(data, index)}
                    className="bg-[#14FFEC] text-black font-semibold py-2 px-4 rounded hover:bg-[#0DA79A] transition-colors duration-300"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 capitalize h-[2rem]">
          <span>
            Data provided by{" "}
            <a className="text-cyan" href="#" rel="noreferrer">
              HackHive
            </a>
          </span>
        </div>
      </div>

      <Pagination />

      {isAssetModalOpen && selectedAsset && (
        <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#212121] bg-opacity-90 p-6 rounded-lg shadow-lg text-white max-w-2xl w-full">
          <form onSubmit={(e) => handleBuySubmit(e)} className="space-y-4">
          <div>
                <label className="block text-sm font-medium">CONFIRM!</label>
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-[#14FFEC] text-black font-semibold py-2 px-4 rounded hover:bg-[#0DA79A] transition-colors duration-300">
                  Buy {selectedAsset.symbol}  
                </button>
                <button type="button" onClick={closeAssetModal} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300">
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      
    </>
  );
};

export default TableComponent;
