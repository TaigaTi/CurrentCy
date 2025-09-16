# Currency Converter Project Plan

## Features (From Simple to Advanced)

### ✅ Core Functionality
- Input amount and select two currencies (e.g., USD → EUR).
- Fetch current exchange rate.
- Show converted result.

---

## ✅ Backend Responsibilities (Node.js + Prisma)
- Store a list of currencies.
- Fetch and store exchange rates from an external API:
  - [exchangerate.host](https://exchangerate.host)
  - [OpenExchangeRates](https://openexchangerates.org)
  - [CurrencyLayer](https://currencylayer.com)
- Optionally cache exchange rates to reduce API calls.

### 📡 API Endpoints
- `GET /currencies` – List available currencies.
- `GET /convert?from=USD&to=EUR&amount=100` – Convert and return result.
- `POST /conversion-history` – Save a user's conversion.
- `GET /conversion-history` – Return previous conversions.

---

## ✅ Frontend Responsibilities (Angular)
- Currency conversion form.
- Result display.
- Conversion history (optional).
- Chart of past conversions or historical exchange rate (optional).
- Angular Material UI for polished interface.

---

## ✅ Database Models (Prisma)

### `Currency` Model
```prisma
model Currency {
  code      String   @id         // e.g., USD, EUR
  name      String
  symbol    String?
  createdAt DateTime @default(now())
}
```

### `Conversion` Model
```prisma
model Conversion {
  id         Int      @id @default(autoincrement())
  from       String   // Currency code
  to         String   // Currency code
  amount     Float
  result     Float
  rate       Float
  createdAt  DateTime @default(now())
}
```

✅ Optional Advanced Features
- Historical Data - Show past exchange rates via chart or table
- Analytics	Track most common conversions, total usage, etc.
- Authentication	Users can log in and view their personal conversion history
- Localization	Support currency symbols and number formatting per region
- Offline Mode	Cache latest exchange rates in browser (e.g., IndexedDB/localStorage)