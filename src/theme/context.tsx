import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  useNewStyles: boolean;
}

const ThemeContext = createContext<ThemeContextType>({ useNewStyles: false });

interface ThemeProviderProps {
  children: ReactNode;
  useNewStyles: boolean;
}

export const ThemeProvider = ({ children, useNewStyles }: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={{ useNewStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
