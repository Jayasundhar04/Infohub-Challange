import React, { useState, useEffect } from "react";

const WeatherModule = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/api/weather?city=London");
      const result = await response.json();

      if (result.success) {
        setData(result.weather);
        setError("");
      } else {
        setError(result.error || "Failed to fetch weather");
      }
    } catch (err) {
      setError("Could not load weather data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Weather Information</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Temperature:</strong> {data.temperature}°C</p>
          <p><strong>Condition:</strong> {data.condition}</p>
        </div>
      )}
      <button onClick={fetchWeather} style={{ marginTop: "10px" }}>🔄 Refresh</button>
    </div>
  );
};

export default WeatherModule;
