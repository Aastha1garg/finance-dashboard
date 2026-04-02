import { useMemo } from "react";
import { Lightbulb, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { monthlyData } from "@/data/mockData";

export function Insights() {
  const { state } = useFinance();

  const insights = useMemo(() => {
    const expenses = state.transactions.filter((t) => t.type === "expense");
    const categoryMap: Record<string, number> = {};
    expenses.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });

    const sorted = Object.entries(categoryMap).sort(([, a], [, b]) => b - a);
    const highestCategory = sorted[0];

    const curr = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    const expenseChange = prev
      ? (((curr.expenses - prev.expenses) / prev.expenses) * 100).toFixed(1)
      : "0";
    const incomeChange = prev
      ? (((curr.income - prev.income) / prev.income) * 100).toFixed(1)
      : "0";

    const savingsRate = curr ? (((curr.income - curr.expenses) / curr.income) * 100).toFixed(0) : "0";

    return { highestCategory, expenseChange, incomeChange, savingsRate };
  }, [state.transactions]);

  const items = [
    {
      icon: BarChart3,
      title: "Highest Spending",
      value: insights.highestCategory
        ? `${insights.highestCategory[0]} — $${insights.highestCategory[1].toFixed(2)}`
        : "No data",
      color: "text-expense",
    },
    {
      icon: TrendingUp,
      title: "Income Change",
      value: `${Number(insights.incomeChange) >= 0 ? "+" : ""}${insights.incomeChange}% vs last month`,
      color: Number(insights.incomeChange) >= 0 ? "text-income" : "text-expense",
    },
    {
      icon: TrendingDown,
      title: "Expense Change",
      value: `${Number(insights.expenseChange) >= 0 ? "+" : ""}${insights.expenseChange}% vs last month`,
      color: Number(insights.expenseChange) <= 0 ? "text-income" : "text-expense",
    },
    {
      icon: Lightbulb,
      title: "Savings Rate",
      value: `${insights.savingsRate}% of income saved`,
      color: Number(insights.savingsRate) >= 20 ? "text-income" : "text-expense",
    },
  ];

  return (
    <Card className="border shadow-sm animate-slide-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Lightbulb className="h-4 w-4" /> Financial Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <item.icon className={`h-4 w-4 mt-0.5 ${item.color}`} />
              <div>
                <p className="text-xs font-medium text-muted-foreground">{item.title}</p>
                <p className="text-sm font-semibold text-card-foreground mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
