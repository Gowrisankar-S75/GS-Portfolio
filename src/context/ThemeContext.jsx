import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });
  
  // Transition state: 'idle', 'to-dark', 'to-light'
  const [transitionState, setTransitionState] = useState('idle');

  const commitThemeChange = (newTheme) => {
    setTheme(newTheme);
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, []);

  const toggleTheme = () => {
    if (transitionState !== 'idle') return;
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setTransitionState(`to-${targetTheme}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, transitionState, setTransitionState, commitThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}
