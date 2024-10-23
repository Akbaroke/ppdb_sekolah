// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface untuk tema
interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Buat Context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom Hook untuk akses Context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme harus digunakan dalam ThemeProvider');
  }
  return context;
};

// Komponen Provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Context Value
  const contextValue: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  // Return provider dengan context value
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
