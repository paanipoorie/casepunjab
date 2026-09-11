import React from 'react';
import { Link2, ArrowUp, Heart, Sparkles } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Footer: React.FC = () => {
  const { executeReset } = useAppState();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070a12] border-t border-slate-800/80 py-12 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-200 text-sm">
                Linked Lists Through the Real World
              </span>
              <p className="text-[11px] text-slate-500">
                Interactive DSA Case Study • Tim's Punjab City Tour
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={executeReset}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 transition-colors"
            >
              Reset Tour to Default
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Top</span>
            </button>
          </div>

        </div>

        {/* Footnote Context */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            Adapted from Case Study 1: <em>"Tim's City Tour — Managing Landmarks with a Linked List"</em>. Punjab landmark representations are configured for interactive educational visualization.
          </p>
          <div className="shrink-0 flex items-center gap-1">
            Built with React, TypeScript &amp; Tailwind CSS
          </div>
        </div>

      </div>
    </footer>
  );
};
