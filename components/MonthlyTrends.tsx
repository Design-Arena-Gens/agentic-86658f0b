"use client";

import { formatCurrency, formatMonthKey } from "@/lib/format";

type TrendDatum = {
  month: string;
  total: number;
};

export const MonthlyTrends = ({ data }: { data: TrendDatum[] }) => {
  const max = Math.max(...data.map((item) => item.total), 1);

  return (
    <div className="rounded-2xl bg-surface/80 p-5 shadow-glass ring-1 ring-white/5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">Six month trend</h2>
          <p className="text-sm text-slate-400">
            Keep the trajectory visible with a simple pulse of monthly spend.
          </p>
        </div>
        <span className="text-sm font-semibold text-emerald-300">
          {formatCurrency(data[data.length - 1]?.total ?? 0)}
        </span>
      </div>
      <div className="flex gap-3">
        {data.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-40 w-full items-end rounded-xl bg-white/5 p-2">
              <div
                className="w-full rounded-lg bg-gradient-to-t from-accent/80 to-accent/10 transition-all"
                style={{ height: `${(item.total / max) * 100}%` }}
              />
            </div>
            <div className="text-xs font-medium text-slate-400">{formatMonthKey(item.month)}</div>
            <div className="text-[11px] text-slate-500">{formatCurrency(item.total)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
