import React, { useState, useEffect } from "react";

const QuoteGenerator = () => {
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/api/quote");
      const data = await response.json();
      if (data.success) setQuote(data.quote);
      else setError("Failed to fetch quote");
    } catch {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <h2>Motivational Quote</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {quote && <blockquote style={{ fontStyle: "italic" }}>"{quote}"</blockquote>}
      <button onClick={fetchQuote} style={{ marginTop: "10px" }}>🔁 New Quote</button>
    </div>
  );
};

export default QuoteGenerator;
