import { Transaction, MonthlyData } from "@/types/finance";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-03-28", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-03-27", description: "Grocery Store", amount: 89.5, category: "Food & Dining", type: "expense" },
  { id: "3", date: "2026-03-26", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "4", date: "2026-03-25", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "5", date: "2026-03-24", description: "Electric Bill", amount: 142, category: "Bills & Utilities", type: "expense" },
  { id: "6", date: "2026-03-23", description: "Uber Rides", amount: 34.2, category: "Transportation", type: "expense" },
  { id: "7", date: "2026-03-22", description: "Online Course", amount: 49.99, category: "Education", type: "expense" },
  { id: "8", date: "2026-03-21", description: "Dividend Payment", amount: 320, category: "Investments", type: "income" },
  { id: "9", date: "2026-03-20", description: "Restaurant Dinner", amount: 67.8, category: "Food & Dining", type: "expense" },
  { id: "10", date: "2026-03-19", description: "New Headphones", amount: 199, category: "Shopping", type: "expense" },
  { id: "11", date: "2026-03-18", description: "Doctor Visit", amount: 85, category: "Healthcare", type: "expense" },
  { id: "12", date: "2026-03-17", description: "Weekend Trip", amount: 350, category: "Travel", type: "expense" },
  { id: "13", date: "2026-03-15", description: "Freelance Design", amount: 800, category: "Freelance", type: "income" },
  { id: "14", date: "2026-03-14", description: "Coffee Shop", amount: 12.5, category: "Food & Dining", type: "expense" },
  { id: "15", date: "2026-03-12", description: "Internet Bill", amount: 59.99, category: "Bills & Utilities", type: "expense" },
  { id: "16", date: "2026-03-10", description: "Gas Station", amount: 45, category: "Transportation", type: "expense" },
  { id: "17", date: "2026-03-08", description: "Clothing Store", amount: 128, category: "Shopping", type: "expense" },
  { id: "18", date: "2026-03-05", description: "Stock Gains", amount: 450, category: "Investments", type: "income" },
  { id: "19", date: "2026-03-03", description: "Gym Membership", amount: 39.99, category: "Healthcare", type: "expense" },
  { id: "20", date: "2026-03-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
];

export const monthlyData: MonthlyData[] = [
  { month: "Oct", income: 6200, expenses: 3800 },
  { month: "Nov", income: 5800, expenses: 4100 },
  { month: "Dec", income: 7100, expenses: 4900 },
  { month: "Jan", income: 6400, expenses: 3600 },
  { month: "Feb", income: 5900, expenses: 4200 },
  { month: "Mar", income: 7970, expenses: 4350 },
];

export const categories = [
  "Salary", "Freelance", "Investments", "Food & Dining", "Shopping",
  "Transportation", "Entertainment", "Bills & Utilities", "Healthcare",
  "Travel", "Education", "Other",
] as const;

export const categoryColors: Record<string, string> = {
  "Salary": "hsl(var(--chart-2))",
  "Freelance": "hsl(var(--chart-6))",
  "Investments": "hsl(var(--chart-5))",
  "Food & Dining": "hsl(var(--chart-4))",
  "Shopping": "hsl(var(--chart-3))",
  "Transportation": "hsl(var(--chart-1))",
  "Entertainment": "hsl(var(--chart-5))",
  "Bills & Utilities": "hsl(var(--chart-3))",
  "Healthcare": "hsl(var(--chart-6))",
  "Travel": "hsl(var(--chart-4))",
  "Education": "hsl(var(--chart-2))",
  "Other": "hsl(var(--muted-foreground))",
};
