import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [options, setOptions] = useState({});
  let [from, setFrom] = useState("usd");
  let [to, setTo] = useState("inr");
  let [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    let getOptions = async () => {
      let res = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
      );
      let resJson = await res.json();
      setOptions(resJson[from]);
    };
    getOptions();
  }, [from]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let convertedData = Number((options[to] * amount).toFixed(2));
    setConvertedAmount(convertedData);
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };
  const handleToChange = (e) => {
    setTo(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleConvertedAmountChange = (e) => {
    setConvertedAmount(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E7ECEF] text-[#274C77]">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Currency Converter
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="space-y-6"
        >
          <div>
            <label className="block text-lg font-medium mb-2">Amount</label>
            <input
              type="number"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => handleAmountChange(e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274C77]"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">From</label>
            <select
              value={from}
              onChange={(e) => handleFromChange(e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274C77]"
            >
              {Object.keys(options).map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Converted Amount
            </label>
            <input
              type="number"
              readOnly
              onChange={handleConvertedAmountChange}
              value={convertedAmount}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">To</label>
            <select
              value={to}
              onChange={(e) => handleToChange(e)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274C77]"
            >
              {Object.keys(options).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#274C77] text-white py-3 rounded-md hover:bg-[#1B3A61] transition duration-200"
          >
            Convert
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
