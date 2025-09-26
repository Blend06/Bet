"use client";
import { useState } from "react";
import { useAuth } from "@/app/providers/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gabim identifikimi");
      
      // Get user info after successful login
      const userRes = await fetch("/api/auth/me", {
        headers: { "Authorization": `Bearer ${data.token}` }
      });
      const userData = await userRes.json();
      
      login(data.token, userData);
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-dvh p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">Hyr</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input className="w-full border rounded p-2" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2" placeholder="Fjalëkalimi" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? "Duke hyrë..." : "Hyr"}
        </button>
      </form>
    </main>
  );
}


