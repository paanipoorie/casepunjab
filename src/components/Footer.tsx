import React from 'react';
import { Route, ArrowUp } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Footer: React.FC = () => {
  const { executeReset } = useAppState();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a12] border-t border-slate-800/80 py-12 text-slate-400 text-xs font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Route className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200 text-sm tracking-wider uppercase">
                CASE<span className="text-amber-400">PUNJAB</span>
              </span>
              <p className="text-[11px] text-slate-500">
                Interactive linked list learning experience
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={executeReset}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors"
            >
              Reset Route
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>

        </div>

        {/* Footnote */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            CASEPUNJAB — Singly Linked List Data Structure Visualizer &amp; Guide.
          </p>
          <div className="shrink-0">
            React • TypeScript • Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
