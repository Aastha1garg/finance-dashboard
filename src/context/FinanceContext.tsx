import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from "react";
import { Transaction, UserRole, TransactionType, Category } from "@/types/finance";
import { mockTransactions } from "@/data/mockData";

interface FinanceState {
  transactions: Transaction[];
}

type FinanceAction =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "EDIT_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] };

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
}

function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem("finance-transactions");
    if (stored) return JSON.parse(stored);
  } catch {}
  return mockTransactions;
}

function loadRole(): UserRole {
  try {
    const stored = localStorage.getItem("finance-role");
    if (stored === "admin" || stored === "viewer") return stored;
  } catch {}
  return "admin";
}

function loadDarkMode(): boolean {
  try {
    const stored = localStorage.getItem("finance-dark-mode");
    if (stored !== null) return stored === "true";
  } catch {}
  return false;
}

interface FinanceContextType {
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
  role: UserRole;
  setRole: (role: UserRole) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, { transactions: loadTransactions() });
  const [role, setRoleState] = useState<UserRole>(loadRole);
  const [darkMode, setDarkMode] = useState<boolean>(loadDarkMode);

  useEffect(() => {
    localStorage.setItem("finance-transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem("finance-role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("finance-dark-mode", String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const setRole = useCallback((r: UserRole) => setRoleState(r), []);
  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  return (
    <FinanceContext.Provider
      value={{ state, dispatch, role, setRole, darkMode, toggleDarkMode, isAdmin: role === "admin" }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
