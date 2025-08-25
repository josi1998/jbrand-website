// contexts/AppContext.js
"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    isMenuOpen: false,
    theme: 'light',
    formData: {},
  });

  const value = {
    ...state,
    toggleMenu: () => setState(prev => ({
      ...prev,
      isMenuOpen: !prev.isMenuOpen
    })),
    setTheme: (theme) => setState(prev => ({
      ...prev,
      theme: theme
    })),
    updateFormData: (data) => setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data }
    }))
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);