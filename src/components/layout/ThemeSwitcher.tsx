import React from 'react';
import { useTheme, LUXURY_THEMES } from '../../context/ThemeContext';
import { LuxuryThemeId } from '../../types';
import { Sparkles, Check, X, Palette, Moon, Sun, Shield } from 'lucide-react';

export const ThemeSwitcher: React.FC = () => {
  const { 
    activeThemeId, 
    activeTheme, 
    setTheme, 
    isThemeDrawerOpen, 
    setIsThemeDrawerOpen 
  } = useTheme();

  return (
    <>
      {/* Floating Quick Button on Bottom Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsThemeDrawerOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white dark:bg-[#13151D] border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Select your luxury theme"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C62828]"></span>
          </span>

          <Sparkles className="w-3.5 h-3.5 text-[#C62828]" />
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-tight">
            Theme: <span className="text-[#C62828] font-black">{activeTheme.name}</span>
          </span>
        </button>
      </div>

      {/* Luxury Theme Selector Modal */}
      {isThemeDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#13151D] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden space-y-6">
            {/* Ambient Background Aura */}
            <div 
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
              style={{ backgroundColor: activeTheme.primary }}
            />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 text-[#C62828]">
                    <Palette className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C62828] font-mono">
                    Luxury Aesthetic Selector
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  Choose Your Ecosystem Theme
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Select an institutional luxury theme tailored for high-stakes governmental examination authorities.
                </p>
              </div>

              <button
                onClick={() => setIsThemeDrawerOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.keys(LUXURY_THEMES) as LuxuryThemeId[]).map((id) => {
                const theme = LUXURY_THEMES[id];
                const isSelected = id === activeThemeId;

                return (
                  <div
                    key={id}
                    onClick={() => setTheme(id)}
                    className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative flex flex-col justify-between space-y-3 group ${
                      isSelected
                        ? 'border-[#C62828] bg-red-50/30 dark:bg-red-950/20 shadow-md ring-2 ring-[#C62828]/20 scale-[1.02]'
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181B26] hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div>
                      {/* Swatch & Status */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl shadow-xs border border-black/10 ${theme.swatchGradient}`} />
                          <div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white block group-hover:text-[#C62828] transition-colors">
                              {theme.name}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium block">
                              {theme.isDark ? 'Dark Executive' : 'Light Presidential'}
                            </span>
                          </div>
                        </div>

                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-[#C62828] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 group-hover:border-[#C62828]" />
                        )}
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                        {theme.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gray-400">
                        {theme.tagline}
                      </span>
                      {theme.isDark ? (
                        <Moon className="w-3.5 h-3.5 text-gray-400" />
                      ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Shield className="w-3.5 h-3.5 text-[#C62828]" />
                Selection persists automatically across all ecosystem modules
              </span>

              <button
                onClick={() => setIsThemeDrawerOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold bg-[#171717] dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity cursor-pointer"
              >
                Apply Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
