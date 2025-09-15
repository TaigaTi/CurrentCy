import express from 'express';
import { PrismaClient } from '@prisma/client';
import currencyRoutes from './routes/currencyRoutes';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/currencies', currencyRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
