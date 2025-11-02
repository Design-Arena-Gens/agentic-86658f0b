"use client";

import { formatCurrency } from "@/lib/format";

type CategoryDatum = {
  category: string;
  value: number;
  share: number;
};

const colorPalette = [
  "from-blue-400/60 to-blue-500/20",
  "from-emerald-400/60 to-emerald-500/20",
  "from-violet-400/60 to-violet-500/20",
  "from-amber-400/60 to-amber-500/20",
  "from-rose-400/60 to-rose-500/20",
  "from-sky-400/60 to-sky-500/20"
];

export const CategoryBreakdown = ({ data }: { data: CategoryDatum[] }) => (
  <div className="rounded-2xl bg-surface/80 p-5 shadow-glass ring-1 ring-white/5 backdrop-blur">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-50">Category breakdown</h2>
        <p className="text-sm text-slate-400">Where your money went this month.</p>
      </div>
      <svg aria-hidden="true" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3v9l6 6"
        />
      </svg>
    </div>
    <div className="flex flex-col gap-4">
      {data.length === 0 && (
        <p className="py-4 text-sm text-slate-500">Add expenses to see category insights.</p>
      )}
      {data.map((item, index) => (
        <div key={item.category} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-200">{item.category}</span>
            <span className="text-slate-400">
              {formatCurrency(item.value)} · {(item.share * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full bg-gradient-to-r ${colorPalette[index % colorPalette.length]}`}
              style={{ width: `${Math.max(item.share * 100, 6)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);
