import { formatCurrency } from "@/lib/format";
import { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: number;
  delta?: {
    label: string;
    amount: number;
  };
  icon: ReactNode;
};

const StatCard = ({ title, value, delta, icon }: SummaryCardProps) => (
  <div className="rounded-2xl bg-surface/80 p-5 shadow-glass ring-1 ring-white/5 backdrop-blur">
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
          {title}
        </span>
        <span className="text-3xl font-semibold text-slate-50">{formatCurrency(value)}</span>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-subtle/80 text-accent">
        {icon}
      </div>
    </div>
    {delta && (
      <span className="mt-4 inline-flex rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs font-semibold text-emerald-300">
        {delta.label} · {formatCurrency(delta.amount)}
      </span>
    )}
  </div>
);

export const SummaryCards = ({
  totalSpent,
  monthlySpent,
  topExpense,
  previousMonthSpent
}: {
  totalSpent: number;
  monthlySpent: number;
  topExpense: number;
  previousMonthSpent: number;
}) => (
  <div className="grid gap-5 md:grid-cols-3">
    <StatCard
      title="Total Spend"
      value={totalSpent}
      icon={
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M5 6h14M5 12h14M5 18h14"
          />
        </svg>
      }
    />
    <StatCard
      title="This Month"
      value={monthlySpent}
      delta={{ label: "Change vs last month", amount: monthlySpent - previousMonthSpent }}
      icon={
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M5 12l4 4 10-10"
          />
        </svg>
      }
    />
    <StatCard
      title="Largest Expense"
      value={topExpense}
      icon={
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M12 6v12m-6-6h12"
          />
        </svg>
      }
    />
  </div>
);
