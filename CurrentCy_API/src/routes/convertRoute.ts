import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const API_KEY = process.env.API_KEY;

router.get("/", async (req, res) => {
  const { amount, from, to } = req.query;
  if (!amount || !from || !to) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const EXTERNAL_API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;
    const response = await axios.get(EXTERNAL_API_URL);
    const rates = response.data.conversion_rates;

    if (!rates[from as string] || !rates[to as string]) {
      return res.status(400).json({ error: "Invalid currency code" });
    }
    const convertedAmount =
      (Number(amount) / rates[from as string]) * rates[to as string];
    res.json({
      result: `${amount} ${from} ≈ ${convertedAmount.toFixed(2)} ${to}`,
    });
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
