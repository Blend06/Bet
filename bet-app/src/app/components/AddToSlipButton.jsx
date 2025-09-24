"use client";

import { useBet } from "@/app/providers/BetContext";

export default function AddToSlipButton({ selection, children }) {
  const { addSelection } = useBet();
  return (
    <button
      className="py-2 px-3 rounded border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
      onClick={() => addSelection(selection)}
    >
      {children}
    </button>
  );
}


