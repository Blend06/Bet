"use client";
import { useAuth } from "@/app/providers/AuthContext";
import Link from "next/link";

export default function Navigation() {
  const { user, logout, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold">
              BetApp
            </Link>
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">
            BetApp
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/history" className="text-gray-600 hover:text-gray-900">
                  Historiku
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {user?.name} • €{user?.balance || '0.00'}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                  >
                    Dil
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Hyr
                </Link>
                <Link
                  href="/register"
                  className="text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
                >
                  Regjistrohu
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}