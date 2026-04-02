# 💰 Finance Dashboard UI

A clean and interactive Finance Dashboard UI built to help users track income, expenses, and financial insights through an intuitive interface.

This project focuses on frontend design, component structure, and state management rather than backend integration.

---



---

## 📌 Project Overview

This dashboard allows users to:

- View overall financial summary (balance, income, expenses)
- Analyze spending patterns through charts
- Explore and manage transactions
- Gain useful financial insights
- Experience role-based UI behavior (Admin / Viewer)

The goal of this project is to demonstrate clean UI design, structured frontend architecture, and effective state management.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Charts:** Recharts / Chart.js
- **State Management:** Context API
- **Data:** Mock data (no backend)

---

## ✨ Features

### 📊 Dashboard Overview
- Summary cards:
  - Total Balance
  - Total Income
  - Total Expenses
- Balance trend chart (time-based)
- Spending breakdown chart (category-based)

---

### 📋 Transactions Section
- Displays transactions with:
  - Date
  - Amount
  - Category
  - Type (Income / Expense)
- Features:
  - Search functionality
  - Filtering by category/type
  - Sorting (date/amount)

---

### 🔐 Role-Based UI (Simulated)
- **Viewer:**
  - Can only view data
- **Admin:**
  - Can add/edit transactions

Role can be switched using a dropdown for demonstration.

---

### 📈 Insights Section
- Highest spending category
- Monthly comparison
- Basic financial observations based on data

---

## 🧠 State Management

The application uses **React Context API** to manage global state:

- Transactions data
- Filters (search, category, type)
- User role (Admin / Viewer)

This ensures a clean and scalable state flow across components.

---
## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Aastha1garg/finance-dashboard.git
cd finance-dashboard

### Install dependencies
npm install
### Start the development server
npm run dev
### Open in browser
http://localhost:8080