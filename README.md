#  💵 CurrentCy

## Overview

CurrentCy is a full-stack currency converter app featuring an Angular frontend and a Node.js backend powered by Prisma ORM. The app allows users to convert between different currencies using up-to-date exchange rates, with a clean and user-friendly interface.

## Features

- Real-time currency conversion
- Supports multiple currencies
- Responsive and intuitive Angular UI
- Node.js API with Prisma ORM for robust backend logic
- Modular TypeScript codebase

## Project Structure

```
CurrentCy/
├── UI/       # Angular frontend
├── API/      # Node.js + Prisma backend
├── README.md
├── package.json
```

### UI (Frontend)

- Built with [Angular](https://angular.io/)
- Contains all client-side code, components, services, and styling

### API (Backend)

- Built with [Node.js](https://nodejs.org/) and [Prisma](https://www.prisma.io/)
- Contains RESTful endpoints for currency conversion and exchange rate retrieval
- Handles database interactions and business logic

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Angular CLI (for frontend)
- Prisma CLI (for backend, optional)

### Installation

Clone the repository:

```bash
git clone https://github.com/TaigaTi/CurrentCy.git
cd CurrentCy
```

#### Backend Setup

```bash
cd CurrentCy_API
npm install
# Configure your database connection in .env
npx prisma generate
npx prisma migrate dev
npm start
```

#### Frontend Setup

```bash
cd ../CurrentCy_UI
npm install
ng serve
```

Frontend will run (by default) at [http://localhost:4200](http://localhost:4200).

## Usage

- Start the backend server from the `CurrentCy_API` folder.
- Start the frontend from the `CurrentCy_UI` folder.
- Access the application in your browser and use the currency converter.