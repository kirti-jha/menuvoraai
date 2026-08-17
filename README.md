# Menuvora AI - Separate Frontend & Backend Monorepo

This repository is organized into separate **Frontend** and **Backend** folders:

```text
Restoral/
├── backend/            # Express Node.js + Neon DB (Serverless PostgreSQL) MERN API
│   ├── src/
│   │   ├── config/
│   │   │   └── neon.ts # Neon DB Connection & Schema
│   │   └── server.ts   # Express API endpoints (/api/auth/login, /api/checkout, /api/health)
│   ├── tsconfig.json
│   └── package.json
├── frontend/           # Next.js 14 + React + Tailwind CSS + Framer Motion UI
│   ├── app/
│   │   ├── page.tsx
│   │   ├── signin/
│   │   ├── dashboard/
│   │   └── checkout/
│   ├── components/
│   ├── lib/
│   └── package.json
├── package.json        # Root workspace runner
├── vercel.json         # Vercel separate deployment configuration
└── README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Run Locally

**Run Backend API (`http://localhost:5000`):**
```bash
cd backend
npm run dev
```

**Run Frontend UI (`http://localhost:3000`):**
```bash
cd frontend
npm run dev
```

---

## 🔑 Default Sign In Credentials

- **Email:** `menuvoraai@gmail.com`
- **Password:** `nonu8198@A`
