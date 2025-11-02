"use client";

import { useEffect, useMemo, useState } from "react";

import { CategoryBreakdown } from "@/components/CategoryBreakdown";
import { ExpenseDraft, ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseTable } from "@/components/ExpenseTable";
import { MonthlyTrends } from "@/components/MonthlyTrends";
import { SummaryCards } from "@/components/SummaryCards";
import { formatMonthKey } from "@/lib/format";
import { Expense } from "@/types/expense";

const STORAGE_KEY = "expense-flow-data-v1";

const seedExpenses: Expense[] = [
  {
    id: "seed-1",
    title: "Groceries",
    category: "Food",
    amount: 84.75,
    date: new Date().toISOString()
  },
  {
    id: "seed-2",
    title: "Gym membership",
    category: "Health",
    amount: 48.5,
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString()
  },
  {
    id: "seed-3",
    title: "Coffee catchup",
    category: "Entertainment",
    amount: 12.4,
    date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString()
  },
  {
    id: "seed-4",
    title: "Light bill",
    category: "Utilities",
    amount: 92.1,
    date: new Date(new Date().setMonth(new Date().getMonth() - 1, 12)).toISOString()
  },
  {
    id: "seed-5",
    title: "Metro pass",
    category: "Transportation",
    amount: 28.0,
    date: new Date(new Date().setMonth(new Date().getMonth() - 2, 25)).toISOString()
  }
];

const loadExpenses = (): Expense[] => {
  if (typeof window === "undefined") return seedExpenses;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedExpenses;
    const parsed = JSON.parse(raw) as Expense[];
    return parsed.map((item) => ({
      ...item,
      amount: Number(item.amount)
    }));
  } catch (error) {
    console.error("Failed to parse expenses from storage", error);
    return seedExpenses;
  }
};

const getMonthKey = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

const monthsBack = (count: number) => {
  const result: string[] = [];
  const now = new Date();
  for (let index = count - 1; index >= 0; index -= 1) {
    const ref = new Date(now.getFullYear(), now.getMonth() - index, 1);
    result.push(getMonthKey(ref));
  }
  return result;
};

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const sortedExpenses = useMemo(
    () =>
      [...expenses].sort(
        (left, right) => new Date(right.date).getTime() - new Date(left.date).getTime()
      ),
    [expenses]
  );

  const monthKeys = useMemo(() => monthsBack(6), []);
  const nowKey = getMonthKey(new Date());
  const previousKey = monthKeys.at(-2);

  const monthlyTotals = useMemo(() => {
    const totals: Record<string, number> = Object.fromEntries(monthKeys.map((key) => [key, 0]));
    expenses.forEach((expense) => {
      const key = getMonthKey(expense.date);
      if (key in totals) {
        totals[key] += expense.amount;
      }
    });
    return monthKeys.map((key) => ({
      month: key,
      total: Number(totals[key].toFixed(2))
    }));
  }, [expenses, monthKeys]);

  const currentMonthExpenses = sortedExpenses.filter(
    (expense) => getMonthKey(expense.date) === nowKey
  );
  const previousMonthExpenses = previousKey
    ? sortedExpenses.filter((expense) => getMonthKey(expense.date) === previousKey)
    : [];

  const monthlyTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const previousTotal = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const largestExpense = expenses.reduce(
    (max, expense) => (expense.amount > max ? expense.amount : max),
    0
  );

  const categories = useMemo(() => {
    const totals = currentMonthExpenses.reduce<Record<string, number>>((accumulator, expense) => {
      accumulator[expense.category] = (accumulator[expense.category] ?? 0) + expense.amount;
      return accumulator;
    }, {});

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return Object.entries(totals)
      .sort(([, left], [, right]) => right - left)
      .map(([category, value]) => ({
        category,
        value,
        share: total === 0 ? 0 : value / total
      }));
  }, [currentMonthExpenses]);

  const addExpense = (draft: ExpenseDraft) => {
    const expense: Expense = {
      id: crypto.randomUUID(),
      title: draft.title.trim(),
      category: draft.category,
      amount: Number(parseFloat(draft.amount).toFixed(2)),
      date: new Date(draft.date).toISOString()
    };
    setExpenses((current) => [expense, ...current]);
  };

  const removeExpense = (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 pb-16 pt-10 md:px-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent/80">
            Personal Finance
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">Expense Flow</h1>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
          Making mindful money moves starts with seeing the pattern. Log, monitor and adjust in
          seconds.
        </div>
      </header>

      <SummaryCards
        totalSpent={totalSpent}
        monthlySpent={monthlyTotal}
        topExpense={largestExpense}
        previousMonthSpent={previousTotal}
      />

      <section className="grid gap-5 lg:grid-cols-[2fr,1fr]">
        <ExpenseForm onSubmit={addExpense} />
        <CategoryBreakdown data={categories} />
      </section>

      <MonthlyTrends data={monthlyTotals} />
      <ExpenseTable expenses={sortedExpenses.slice(0, 30)} onRemove={removeExpense} />
    </main>
  );
}
