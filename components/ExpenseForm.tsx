"use client";

import { useState } from "react";
 
 export type ExpenseDraft = {
   title: string;
   amount: string;
   category: string;
   date: string;
 };
 
 const categories = [
   "Food",
   "Housing",
   "Transportation",
   "Entertainment",
   "Health",
   "Shopping",
   "Utilities",
   "Other"
 ];
 
 export const ExpenseForm = ({ onSubmit }: { onSubmit: (expense: ExpenseDraft) => void }) => {
   const [form, setForm] = useState<ExpenseDraft>({
     title: "",
     amount: "",
     category: "Food",
     date: new Date().toISOString().split("T")[0]
   });
 
   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     if (!form.title.trim() || Number.isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
       return;
     }
     onSubmit(form);
     setForm((prev) => ({
       ...prev,
       title: "",
       amount: "",
       category: prev.category,
       date: new Date().toISOString().split("T")[0]
     }));
   };
 
   return (
     <form
       onSubmit={handleSubmit}
       className="flex flex-col gap-3 rounded-2xl bg-surface/80 p-5 shadow-glass ring-1 ring-white/5 backdrop-blur"
     >
       <div className="flex items-center justify-between">
         <div>
           <h2 className="text-lg font-semibold text-slate-50">Add expense</h2>
           <p className="text-sm text-slate-400">Quick capture to keep your spending up to date.</p>
         </div>
         <svg aria-hidden="true" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24">
           <path
             stroke="currentColor"
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="1.5"
             d="M12 5v14m-7-7h14"
           />
         </svg>
       </div>
       <label className="flex flex-col text-sm">
         <span className="mb-1 font-medium text-slate-300">Title</span>
         <input
           value={form.title}
           onChange={(event) => setForm({ ...form, title: event.target.value })}
           placeholder="e.g. groceries"
           className="rounded-xl border border-white/5 bg-subtle/80 px-4 py-2.5 text-slate-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
           required
         />
       </label>
       <div className="grid gap-3 md:grid-cols-3">
         <label className="flex flex-col text-sm">
           <span className="mb-1 font-medium text-slate-300">Amount</span>
           <input
             value={form.amount}
             onChange={(event) => setForm({ ...form, amount: event.target.value })}
             placeholder="0.00"
             min="0"
             step="0.01"
             type="number"
             className="rounded-xl border border-white/5 bg-subtle/80 px-4 py-2.5 text-slate-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
             required
           />
         </label>
         <label className="flex flex-col text-sm">
           <span className="mb-1 font-medium text-slate-300">Category</span>
           <select
             value={form.category}
             onChange={(event) => setForm({ ...form, category: event.target.value })}
             className="rounded-xl border border-white/5 bg-subtle/80 px-4 py-2.5 text-slate-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
           >
             {categories.map((category) => (
               <option key={category}>{category}</option>
             ))}
           </select>
         </label>
         <label className="flex flex-col text-sm">
           <span className="mb-1 font-medium text-slate-300">Date</span>
           <input
             value={form.date}
             onChange={(event) => setForm({ ...form, date: event.target.value })}
             type="date"
             max={new Date().toISOString().split("T")[0]}
             className="rounded-xl border border-white/5 bg-subtle/80 px-4 py-2.5 text-slate-100 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
             required
           />
         </label>
       </div>
       <button
         type="submit"
         className="mt-2 inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
       >
         Save expense
       </button>
     </form>
   );
 };
