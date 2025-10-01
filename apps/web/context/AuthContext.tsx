import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // ...user state, login, logout, register, isAuthenticated, loading...
  return (
    <AuthContext.Provider value={{ /* ... */ }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
