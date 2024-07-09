const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


// Home Route
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Fetch Weather Route
app.post("/", async (req, res) => {
  const city = req.body.city;
  const apiKey = "80c11cc025534e2485846f968a85eeac";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data;
    const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    res.render("index", { weather: weatherText, error: null });
  } catch (error) {
    res.render("index", { weather: null, error: "Error, please try again" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});