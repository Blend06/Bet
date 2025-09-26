"use client";

import { useMemo, useState } from "react";
import { useBet } from "@/app/providers/BetContext";
import { useAuth } from "@/app/providers/AuthContext";
import { formatCurrency } from "@/lib/utils/format";
import Link from "next/link";
import { saveToStorage, loadFromStorage } from "@/lib/utils/storage";

export default function BetSlip() {
  const { items, removeItem, updateStake, clearAll } = useBet();
  const { isAuthenticated, user } = useAuth();
  const [currency] = useState("EUR");

  const totalStake = useMemo(() => items.reduce((acc, it) => acc + (Number(it.stake) || 0), 0), [items]);
  const potentialReturn = useMemo(
    () =>
      items.reduce((acc, it) => acc + (Number(it.stake) || 0) * (Number(it.selection?.odds) || 0), 0),
    [items]
  );

  const placeBet = async () => {
    if (!isAuthenticated) {
      alert('Duhet të jesh i loguar për të vendosur bast!');
      return;
    }
    
    if (items.length === 0 || totalStake <= 0) return;
    
    // Check if user has enough balance
    if (user?.balance && totalStake > parseFloat(user.balance)) {
      alert('Nuk ke balancë të mjaftueshme!');
      return;
    }

    try {
      // Place bet via API
      const token = loadFromStorage('authToken', null);
      const response = await fetch('/api/bets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          oddId: items[0].selection.oddId, // For now, single bets only
          stake: totalStake
        })
      });

      if (response.ok) {
        clearAll();
        alert('Basti u vendos me sukses!');
        // Refresh user data to update balance
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.error || 'Gabim në vendosjen e bastit');
      }
    } catch (error) {
      alert('Gabim në vendosjen e bastit');
    }
  };

  return (
    <div className="text-neutral-900">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">BetSlip ({items.length})</h3>
        {items.length > 0 && (
          <button className="text-sm text-red-600" onClick={clearAll}>Pastro</button>
        )}
      </div>
      <div className="mt-3 space-y-3">
        {items.length === 0 && <p className="text-sm text-neutral-900">Nuk ka përzgjedhje.</p>}
        {items.map((it) => (
          <div key={it.id} className="border rounded p-3 bg-white">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-neutral-900">{it.selection?.description}</p>
                <p className="text-xs text-neutral-900">Kuota: {it.selection?.odds}</p>
              </div>
              <button onClick={() => removeItem(it.id)} className="text-xs text-neutral-500 hover:text-red-600">Hiq</button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="0.5"
                value={it.stake}
                onChange={(e) => updateStake(it.id, Number(e.target.value))}
                className="w-full border rounded px-2 py-1 text-neutral-900"
                placeholder="Shuma"
              />
              <span className="text-sm text-neutral-900 w-[90px] text-right">{formatCurrency((Number(it.stake)||0) * (Number(it.selection?.odds)||0), currency)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-3 text-sm text-neutral-900">
        {isAuthenticated && user?.balance && (
          <div className="flex items-center justify-between mb-2 text-green-600">
            <span>Balanca jote</span>
            <span>{formatCurrency(parseFloat(user.balance), currency)}</span>
          </div>
        )}
        <div className="flex items-center justify-between"><span>Shuma totale</span><span>{formatCurrency(totalStake, currency)}</span></div>
        <div className="flex items-center justify-between"><span>Fitim i mundshëm</span><span>{formatCurrency(potentialReturn, currency)}</span></div>
        
        {!isAuthenticated ? (
          <Link href="/login" className="mt-3 w-full py-2 rounded bg-blue-600 text-white text-center block">
            Hyr për të vendosur bast
          </Link>
        ) : (
          <button 
            onClick={placeBet} 
            disabled={items.length===0 || totalStake<=0 || (user?.balance && totalStake > parseFloat(user.balance))} 
            className="mt-3 w-full py-2 rounded bg-black text-white disabled:opacity-50"
          >
            Vendos bast
          </button>
        )}
        
        {isAuthenticated && (
          <Link href="/history" className="block text-center text-sm text-blue-600 mt-2">Shiko historikun</Link>
        )}
      </div>
    </div>
  );
}


