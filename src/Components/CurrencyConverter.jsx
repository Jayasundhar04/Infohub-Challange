import React, { useState } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const convertCurrency = async () => {
    if (!amount) return setError("Please enter an amount in INR");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/api/currency?amount=${amount}`);
      const data = await response.json();

      if (data.success) setResult(data.converted);
      else setError(data.error || "Failed to convert currency");
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        placeholder="Amount in INR"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={convertCurrency} style={{ marginLeft: "10px" }}>
        Convert
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "10px" }}>
          <p>USD: {result.USD}</p>
          <p>EUR: {result.EUR}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
