const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;


const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Success is not in what you have, but who you are.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Push yourself, because no one else is going to do it for you."
];


app.get("/api/quote", (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json({ success: true, quote: randomQuote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ success: false, error: "Could not fetch quote." });
  }
});


app.get("/api/weather", async (req, res) => {
  try {
    const city = req.query.city || "London"; 
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
    const response = await axios.get(weatherUrl);

    const data = response.data;

    
    const weatherInfo = {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    res.json({ success: true, weather: weatherInfo });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ success: false, error: "Could not fetch weather data." });
  }
});




app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1; 

    const response = await axios.get("https://api.exchangerate.host/latest?base=INR");
    const rates = response.data.rates;

    
    const usd = (amount * rates.USD).toFixed(2);
    const eur = (amount * rates.EUR).toFixed(2);

    res.json({
      success: true,
      base: "INR",
      amount,
      converted: {
        USD: parseFloat(usd),
        EUR: parseFloat(eur)
      }
    });
  } catch (error) {
    console.error("Error fetching currency data:", error.message);
    res.status(500).json({ success: false, error: "Could not fetch currency data." });
  }
});



app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});


app.listen(PORT, () => {
  console.log(` Server started on http://localhost:${PORT}`);
});
