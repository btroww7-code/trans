'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Add logic to check for token in localStorage on initial load

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      // TODO: Set user and token
      toast.success('Zalogowano pomyślnie!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const register = async (data) => {
    // ... register logic ...
  };

  const logout = () => {
    setUser(null);
    // TODO: Remove token from localStorage
    toast.info('Wylogowano.');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toaster richColors />
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
