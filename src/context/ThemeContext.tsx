import React, { createContext, useContext, useState, useEffect } from 'react';
import { LuxuryTheme, LuxuryThemeId } from '../types';

export const LUXURY_THEMES: Record<LuxuryThemeId, LuxuryTheme> = {
  imperial_crimson: {
    id: 'imperial_crimson',
    name: 'Imperial Crimson',
    tagline: 'Presidential Alabaster & Royal Red',
    primary: '#C62828',
    secondary: '#E53935',
    bg: '#F8F8F6',
    cardBg: '#FFFFFF',
    text: '#171717',
    isDark: false,
    accentBadge: 'bg-[#C62828]/10 text-[#C62828] border-[#C62828]/20',
    description: 'Crisp diplomatic white canvas with imperial crimson accents, frosted glass panels, and presidential precision.',
    swatchGradient: 'bg-gradient-to-br from-[#FFFFFF] via-[#F8F8F6] to-[#C62828]'
  },
  obsidian_noir: {
    id: 'obsidian_noir',
    name: 'Obsidian Executive',
    tagline: 'Stealth Carbon & Crimson Laser',
    primary: '#EF4444',
    secondary: '#DC2626',
    bg: '#0A0B0E',
    cardBg: '#13151D',
    text: '#F3F4F6',
    isDark: true,
    accentBadge: 'bg-red-500/15 text-red-400 border-red-500/30',
    description: 'High-end dark aerospace console. Onyx surfaces, luminous laser status lines, and deep gold telemetry.',
    swatchGradient: 'bg-gradient-to-br from-[#0A0B0E] via-[#1E2230] to-[#EF4444]'
  },
  swiss_platinum: {
    id: 'swiss_platinum',
    name: 'Swiss Platinum',
    tagline: 'Pure Titanium & Precision Scarlet',
    primary: '#B91C1C',
    secondary: '#E11D48',
    bg: '#FAFAFC',
    cardBg: '#FFFFFF',
    text: '#09090B',
    isDark: false,
    accentBadge: 'bg-rose-50 text-rose-800 border-rose-200',
    description: 'Haute Horlogerie Swiss minimalist aesthetic. Pure pearl white, hairline titanium frames, and scarlet chronometer dots.',
    swatchGradient: 'bg-gradient-to-br from-[#FFFFFF] via-[#F1F3F9] to-[#B91C1C]'
  },
  sovereign_gold: {
    id: 'sovereign_gold',
    name: 'Sovereign Crest',
    tagline: 'Deep Burgundy & Champagne Leaf',
    primary: '#881337',
    secondary: '#D97706',
    bg: '#FAF7F2',
    cardBg: '#FFFFFF',
    text: '#1C1917',
    isDark: false,
    accentBadge: 'bg-amber-50 text-amber-900 border-amber-200',
    description: 'Diplomatic sovereignty grade. Royal burgundy wine tones harmonized with champagne gold leaf accents.',
    swatchGradient: 'bg-gradient-to-br from-[#881337] via-[#D97706] to-[#FAF7F2]'
  }
};

interface ThemeContextType {
  activeThemeId: LuxuryThemeId;
  activeTheme: LuxuryTheme;
  setTheme: (id: LuxuryThemeId) => void;
  isThemeDrawerOpen: boolean;
  setIsThemeDrawerOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<LuxuryThemeId>(() => {
    const saved = localStorage.getItem('examresq_luxury_theme') || localStorage.getItem('evaltrust_luxury_theme');
    return (saved && LUXURY_THEMES[saved as LuxuryThemeId]) ? (saved as LuxuryThemeId) : 'imperial_crimson';
  });

  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState<boolean>(false);

  const activeTheme = LUXURY_THEMES[activeThemeId];

  useEffect(() => {
    localStorage.setItem('examresq_luxury_theme', activeThemeId);
    document.documentElement.setAttribute('data-theme', activeThemeId);
    if (activeTheme.isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = activeTheme.bg;
      document.body.style.color = activeTheme.text;
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = activeTheme.bg;
      document.body.style.color = activeTheme.text;
    }
  }, [activeThemeId, activeTheme]);

  const setTheme = (id: LuxuryThemeId) => {
    setActiveThemeId(id);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        activeTheme,
        setTheme,
        isThemeDrawerOpen,
        setIsThemeDrawerOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
