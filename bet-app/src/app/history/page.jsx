"use client";

import { loadFromStorage } from "@/lib/utils/storage";
import { formatCurrency, formatDateTime } from "@/lib/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(loadFromStorage("bet-history", []));
  }, []);

  return (
    <main className="min-h-dvh p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Historiku i basteve</h1>
        <Link href="/" className="text-sm text-blue-600">Kthehu</Link>
      </div>
      <div className="mt-6 space-y-3">
        {entries.length === 0 && <p className="text-sm text-neutral-800">Nuk ka ende baste të ruajtura.</p>}
        {entries.map((b) => (
          <article key={b.id} className="border rounded p-4">
            <div className="flex items-center justify-between text-sm">
              <span>{formatDateTime(b.createdAt)}</span>
              <span className="uppercase">{b.status}</span>
            </div>
            <ul className="mt-2 text-sm list-disc pl-5">
              {b.items.map((it) => (
                <li key={it.id}>
                  {it.selection.description} — kuota {it.selection.odds} — stake {formatCurrency(it.stake)}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-sm flex items-center justify-between">
              <span>Shuma: {formatCurrency(b.totalStake)}</span>
              <span>Fitim i mundshëm: {formatCurrency(b.potentialReturn)}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}


