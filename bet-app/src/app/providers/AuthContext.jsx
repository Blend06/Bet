"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage, removeFromStorage } from '@/lib/utils/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = loadFromStorage('authToken', null);
    if (token) {
      // Verify token and get user info
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchUserInfo(token) {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        // Token is invalid, remove it
        removeFromStorage('authToken');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      removeFromStorage('authToken');
    } finally {
      setLoading(false);
    }
  }

  const login = (token, userData) => {
    saveToStorage('authToken', token);
    setUser(userData);
  };

  const logout = () => {
    removeFromStorage('authToken');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}