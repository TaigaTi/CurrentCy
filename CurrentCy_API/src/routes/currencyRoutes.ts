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


export default router;
