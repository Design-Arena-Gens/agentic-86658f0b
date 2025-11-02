import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Expense Flow",
  description: "Track personal spending with a clean, minimal dashboard."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-slate-100">{children}</body>
    </html>
  );
}
