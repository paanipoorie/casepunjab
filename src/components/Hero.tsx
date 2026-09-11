import React from 'react';
import { ArrowRight, Compass, Sparkles, Network, Terminal, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Hero: React.FC = () => {
  const { size } = useAppState();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-800/60 bg-gradient-to-b from-[#0e1424] via-[#0b0f19] to-[#0b0f19]">
      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Data Structure Case Study</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-400 font-normal">Real-Time Pointers</span>
          </div>

          {/* Main Headings */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15] mb-4">
            Linked Lists Through the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Real World</span>
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-amber-200/90 mb-6 tracking-tight">
            Follow the links. Understand the logic.
          </p>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Instead of memorizing abstract pointer theory from textbooks, manipulate live nodes in memory.
            Join Tim on his journey through Punjab, insert stops, rewire pointers in real-time, and watch singly linked lists operate step-by-step.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={() => handleScroll('story')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-base hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>Start the Journey</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => handleScroll('playground')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Open Playground</span>
            </button>
          </div>

          {/* Quick Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="p-2 rounded-md bg-amber-500/10 text-amber-400">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Live Engine</div>
                <div className="text-sm font-semibold text-slate-200">Real Node References</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Line-by-Line</div>
                <div className="text-sm font-semibold text-slate-200">C++ Pointer Tracing</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="p-2 rounded-md bg-cyan-500/10 text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-mono tracking-wider">Scenarios</div>
                <div className="text-sm font-semibold text-slate-200">4 Real-World Models</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
