"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import { Expense } from "@/types/expense";
import { useMemo, useState } from "react";

const HEADERS: { key: keyof Expense | "actions"; label: string }[] = [
  { key: "title", label: "Description" },
  { key: "category", label: "Category" },
  { key: "amount", label: "Amount" },
  { key: "date", label: "Date" }
];

export const ExpenseTable = ({
  expenses,
  onRemove
}: {
  expenses: Expense[];
  onRemove: (id: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return expenses;
    const term = query.toLowerCase().trim();
    return expenses.filter(
      (expense) =>
        expense.title.toLowerCase().includes(term) ||
        expense.category.toLowerCase().includes(term)
    );
  }, [expenses, query]);

  return (
    <div className="rounded-2xl bg-surface/80 p-5 shadow-glass ring-1 ring-white/5 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Spending log</h2>
          <p className="text-sm text-slate-400">
            Keep the last 30 entries visible for quick scanning and clean history.
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by keyword..."
          className="w-full rounded-xl border border-white/5 bg-subtle/80 px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 md:w-64"
        />
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-white/5">
        <table className="min-w-full divide-y divide-white/5 text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              {HEADERS.map(({ key, label }) => (
                <th key={key} className="px-4 py-3 text-left font-semibold">
                  {label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={5}>
                  No expenses found. Try a different search.
                </td>
              </tr>
            )}
            {filtered.map((expense) => (
              <tr key={expense.id} className="transition hover:bg-white/[0.03]">
                <td className="px-4 py-4 font-medium text-slate-100">{expense.title}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-100">{formatCurrency(expense.amount)}</td>
                <td className="px-4 py-4 text-slate-400">{formatDate(expense.date)}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onRemove(expense.id)}
                    className="ml-auto inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold text-rose-300 transition hover:text-rose-200"
                    type="button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
