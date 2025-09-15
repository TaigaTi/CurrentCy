import express from 'express';
import { PrismaClient } from '@prisma/client';
import currencyRoutes from './routes/currencyRoutes';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/currencies', currencyRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
