"use client";
import { useState } from "react";
import { saveToStorage } from "@/lib/utils/storage";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gabim regjistrimi");
      saveToStorage("authToken", data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Regjistrohu</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="w-full border rounded p-2" placeholder="Emri" value={name} onChange={e => setName(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Fjalëkalimi" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Duke regjistruar..." : "Regjistrohu"}
        </button>
      </form>
    </main>
  );
}


