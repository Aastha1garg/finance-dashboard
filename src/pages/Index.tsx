import { Header } from "@/components/dashboard/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingBreakdown } from "@/components/dashboard/SpendingBreakdown";
import { Insights } from "@/components/dashboard/Insights";
import { TransactionTable } from "@/components/dashboard/TransactionTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Header />
        <SummaryCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <BalanceChart />
          <SpendingBreakdown />
        </div>
        <div className="mb-6">
          <Insights />
        </div>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Index;
