import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinance } from "@/context/FinanceContext";
import { categoryColors } from "@/data/mockData";

const COLORS = [
  "hsl(var(--chart-4))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-2))",
];

export function SpendingBreakdown() {
  const { state } = useFinance();

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    state.transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [state.transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="border shadow-sm animate-slide-up" style={{ animationDelay: "320ms", animationFillMode: "both" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Spending Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[260px] text-muted-foreground text-sm">
            No expense data available
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-[200px] w-[200px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              {data.slice(0, 5).map((item, i) => (
                <div key={item.name} className="flex items-center justify-between gap-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="truncate text-card-foreground">{item.name}</span>
                  </div>
                  <span className="text-muted-foreground font-medium tabular-nums">
                    {((item.value / total) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
