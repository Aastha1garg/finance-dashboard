import { useState, useMemo } from "react";
import { Search, Plus, ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFinance } from "@/context/FinanceContext";
import { Transaction } from "@/types/finance";
import { TransactionDialog } from "./TransactionDialog";

type SortKey = "date" | "amount" | "category";
type SortDir = "asc" | "desc";

export function TransactionTable() {
  const { state, dispatch, isAdmin } = useFinance();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | undefined>();

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let txs = state.transactions;
    if (search) {
      const q = search.toLowerCase();
      txs = txs.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (typeFilter !== "all") txs = txs.filter((t) => t.type === typeFilter);
    if (categoryFilter !== "all") txs = txs.filter((t) => t.category === categoryFilter);

    txs = [...txs].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      else if (sortKey === "amount") cmp = a.amount - b.amount;
      else cmp = a.category.localeCompare(b.category);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return txs;
  }, [state.transactions, search, typeFilter, categoryFilter, sortKey, sortDir]);

  const uniqueCategories = useMemo(
    () => Array.from(new Set(state.transactions.map((t) => t.category))).sort(),
    [state.transactions]
  );

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  return (
    <>
      <Card className="border shadow-sm animate-slide-up" style={{ animationDelay: "480ms", animationFillMode: "both" }}>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-base font-semibold">Transactions</CardTitle>
            {isAdmin && (
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setEditingTx(undefined);
                  setDialogOpen(true);
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Transaction
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[130px] h-9 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[160px] h-9 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="h-10 w-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">No transactions found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead
                      className="cursor-pointer select-none"
                      onClick={() => toggleSort("date")}
                    >
                      <span className="flex items-center gap-1">
                        Date <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead
                      className="cursor-pointer select-none"
                      onClick={() => toggleSort("category")}
                    >
                      <span className="flex items-center gap-1">
                        Category <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead
                      className="text-right cursor-pointer select-none"
                      onClick={() => toggleSort("amount")}
                    >
                      <span className="flex items-center justify-end gap-1">
                        Amount <ArrowUpDown className="h-3 w-3" />
                      </span>
                    </TableHead>
                    {isAdmin && <TableHead className="w-[80px]" />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((tx) => (
                    <TableRow key={tx.id} className="group">
                      <TableCell className="text-sm tabular-nums">{tx.date}</TableCell>
                      <TableCell className="text-sm font-medium">{tx.description}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs font-normal">
                          {tx.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs font-medium ${
                            tx.type === "income"
                              ? "bg-income-muted text-income border-0"
                              : "bg-expense-muted text-expense border-0"
                          }`}
                        >
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        <span className={tx.type === "income" ? "text-income" : "text-expense"}>
                          {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      {isAdmin && (
                        <TableCell>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleEdit(tx)}
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => handleDelete(tx.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={editingTx}
      />
    </>
  );
}
