import { Moon, Sun, Shield, Eye } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";

export function Header() {
  const { role, setRole, darkMode, toggleDarkMode, isAdmin } = useFinance();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Track your income, expenses, and financial insights
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRole(isAdmin ? "viewer" : "admin")}
          className="gap-2 text-xs"
        >
          {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {isAdmin ? "Admin" : "Viewer"}
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
