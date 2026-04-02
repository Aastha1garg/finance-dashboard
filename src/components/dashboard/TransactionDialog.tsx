import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinance } from "@/context/FinanceContext";
import { Transaction, TransactionType, Category } from "@/types/finance";
import { categories } from "@/data/mockData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction;
}

export function TransactionDialog({ open, onOpenChange, transaction }: Props) {
  const { dispatch } = useFinance();
  const isEdit = !!transaction;

  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Other" as Category,
    type: "expense" as TransactionType,
  });

  useEffect(() => {
    if (transaction) {
      setForm({
        date: transaction.date,
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
      });
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0],
        description: "",
        amount: "",
        category: "Other",
        type: "expense",
      });
    }
  }, [transaction, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;

    const tx: Transaction = {
      id: transaction?.id || crypto.randomUUID(),
      date: form.date,
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
    };

    dispatch({ type: isEdit ? "EDIT_TRANSACTION" : "ADD_TRANSACTION", payload: tx });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g. Grocery shopping"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v as TransactionType })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as Category })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save Changes" : "Add Transaction"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
