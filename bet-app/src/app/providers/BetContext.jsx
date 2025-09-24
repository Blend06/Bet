"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadFromStorage, saveToStorage } from "@/lib/utils/storage";

const STORAGE_KEY = "bet-slip";

const BetContext = createContext(null);

export function BetProvider({ children }) {
  // Inicializo bosh për të shmangur mospërputhje SSR/CSR
  const [items, setItems] = useState([]);

  // Ngarko nga storage vetëm në klient pas montimit
  useEffect(() => {
    setItems(loadFromStorage(STORAGE_KEY, []));
  }, []);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, items);
  }, [items]);

  const addSelection = (selection) => {
    setItems((prev) => {
      const exists = prev.find((it) => it.selection?.matchId === selection.matchId && it.selection?.description === selection.description);
      if (exists) return prev;
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          selection,
          stake: 0,
        },
      ];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const updateStake = (id, stake) => setItems((prev) => prev.map((it) => (it.id === id ? { ...it, stake } : it)));
  const clearAll = () => setItems([]);

  const value = useMemo(() => ({ items, addSelection, removeItem, updateStake, clearAll }), [items]);

  return <BetContext.Provider value={value}>{children}</BetContext.Provider>;
}

export function useBet() {
  const ctx = useContext(BetContext);
  if (!ctx) throw new Error("useBet duhet përdorur brenda <BetProvider>");
  return ctx;
}


