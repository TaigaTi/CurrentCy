import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all currencies
router.get('/', async (req, res) => {
  try {
    const currencies = await prisma.currency.findMany();
    res.json(currencies);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const [fromCurrency, toCurrency] = await Promise.all([
      prisma.currency.findUnique({ where: { code: from as string } }),
      prisma.currency.findUnique({ where: { code: to as string } })
    ]);
    if (!fromCurrency || !toCurrency) {
      return res.status(404).json({ error: 'Currency not found' });
    }
    // For demo, just return a fake conversion rate
    const conversionRate = 1.23;
    const convertedAmount = (Number(amount) * conversionRate).toFixed(2);
    res.json({ result: `${amount} ${from} ≈ ${convertedAmount} ${to}` });
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
