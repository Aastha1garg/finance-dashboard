import { useMemo } from "react";
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";

export function SummaryCards() {
  const { state } = useFinance();

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = state.transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = state.transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [state.transactions]);

  const cards = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      className: "bg-card",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      className: "bg-card",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "+3.1%",
      trendUp: false,
      className: "bg-card",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {cards.map((card, i) => (
        <Card
          key={card.label}
          className={`${card.className} border shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up`}
          style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-card-foreground">
              ${card.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1 mt-2">
              {card.trendUp ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-income" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-expense" />
              )}
              <span className={`text-xs font-medium ${card.trendUp ? "text-income" : "text-expense"}`}>
                {card.trend}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
