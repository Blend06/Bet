"use client";

import { useBet } from "@/app/providers/BetContext";
import { useAuth } from "@/app/providers/AuthContext";
import { useRouter } from "next/navigation";

export default function AddToSlipButton({ selection, children }) {
  const { addSelection } = useBet();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    addSelection(selection);
  };

  return (
    <button
      className="py-2 px-3 rounded border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-100"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}


