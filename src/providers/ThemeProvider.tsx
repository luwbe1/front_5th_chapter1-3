import React, { useMemo, useState } from "react";
import { ThemeContext } from "../context/useThemeContext";

// interface ThemeContextType {
//   theme: string;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// export const useThemeContext = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useThemeContext must be used within a ThemeProvider");
//   }
//   return context;
// };
