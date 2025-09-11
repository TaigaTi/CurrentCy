import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const currency = await prisma.currency.createMany({
        data: [
            { code: 'USD', name: 'United States Dollar', symbol: '$' },
            { code: 'EUR', name: 'Euro', symbol: '€' },
            { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
            { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
            { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
            { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
            { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
            { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
            { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
            { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
        ],
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
