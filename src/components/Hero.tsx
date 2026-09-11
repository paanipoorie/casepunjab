import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-16 lg:pt-24 lg:pb-20 border-b border-slate-800/60 bg-[#0b0f19]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Brand Tagline */}
        <div className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-amber-400 mb-4">
          CASEPUNJAB
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.12] mb-5">
          Follow the route.<br className="hidden sm:inline" /> Understand the list.
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          An interactive way to see how linked lists work — one connection at a time.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleScroll('tour')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 group active:scale-98 shadow-sm"
          >
            <span>Start the Tour</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => handleScroll('playground')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-amber-400 fill-current" />
            <span>Try the Playground</span>
          </button>
        </div>

      </div>
    </section>
  );
};
