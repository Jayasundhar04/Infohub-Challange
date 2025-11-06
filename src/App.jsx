import React, { useState } from "react";
import "./App.css";
import WeatherModule from "./Components/Wheather";
import CurrencyConverter from "./Components/CurrencyConverter";
import QuoteGenerator from "./Components/Quote";

const App = () => {
  const [activeTab, setActiveTab] = useState("Weather");

  return (
    <div className="app-container">
      <h1> InfoHub — ByteXL Challenge</h1>

      <div className="tabs">
        {["Weather", "Currency", "Quote"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="module-container">
        {activeTab === "Weather" && <WeatherModule />}
        {activeTab === "Currency" && <CurrencyConverter />}
        {activeTab === "Quote" && <QuoteGenerator />}
      </div>

      <footer>
        © {new Date().getFullYear()} ByteXL InfoHub | Built with Love using React + Node.js
      </footer>
    </div>
  );
};

export default App;
