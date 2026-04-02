import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyData } from "@/data/mockData";

export function BalanceChart() {
  return (
    <Card className="border shadow-sm animate-slide-up" style={{ animationDelay: "240ms", animationFillMode: "both" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Balance Trend</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--income))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--income))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--expense))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--expense))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area type="monotone" dataKey="income" stroke="hsl(var(--income))" fill="url(#incomeGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="hsl(var(--expense))" fill="url(#expenseGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
