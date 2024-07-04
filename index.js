import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const countriesData = JSON.parse(fs.readFileSync("data.json", "utf8"));

const getDocs = (req, res) => {
  const fileContent = JSON.parse(
    fs.readFileSync("./documentation/countriesWithCurrency.json", "utf8")
  );
  if (!fileContent) {
    return res.status(400).json({ error: "Docs not found" });
  }

  res.json({ docs: fileContent });
};

const getCurrencyOfCountry = (req, res) => {
  const { input } = req.body || {};

  if (!input) {
    return res.status(400).json({ error: "Country code not provided" });
  }

  const country = countriesData.find(
    (country) => country.code === input.toUpperCase()
  );

  if (!country) {
    return res.status(404).json({ error: "Country not found" });
  }

  res.json({ output: country.currency });
};

app.get("/functions/getCurrencyOfCountry", getDocs);
app.post("/functions/getCurrencyOfCountry", getCurrencyOfCountry);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
