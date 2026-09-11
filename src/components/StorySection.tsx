import React from 'react';
import { ArrowRight, ArrowDown, MapPin, Sparkles, Navigation, Link as LinkIcon, CornerDownRight } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="tour" className="py-16 lg:py-20 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
            The Concept
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Tim's Punjab Tour
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tim is traveling across Punjab. His itinerary is a sequence of connected stops.
          </p>
        </div>

        {/* 1. Visual Route Banner */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 mb-12 shadow-sm">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            The Planned Route
          </div>

          {/* Horizontal / Wrapped Route */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm">
            {/* HEAD indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
              <span>HEAD</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>

            {/* Stops */}
            {[
              { name: 'Home', num: '#01' },
              { name: 'Golden Temple', num: '#02' },
              { name: 'Jallianwala Bagh', num: '#03' },
              { name: 'Partition Museum', num: '#04' },
              { name: 'Wagah Border', num: '#05' },
            ].map((stop, idx, arr) => (
              <React.Fragment key={stop.name}>
                <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-sans flex items-center gap-2 shadow-inner">
                  <span className="font-mono text-[11px] text-amber-400 font-semibold">{stop.num}</span>
                  <span className="font-medium text-sm">{stop.name}</span>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex items-center text-slate-500 font-mono text-[10px] gap-1 px-0.5">
                    <span className="hidden sm:inline text-slate-600">next</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400/70" />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* NULL indicator */}
            <div className="flex items-center text-slate-500 font-mono text-[10px] gap-1 px-0.5">
              <span className="hidden sm:inline text-slate-600">next</span>
              <ArrowRight className="w-3.5 h-3.5 text-rose-400/70" />
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold">
              NULL
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800 text-sm text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="leading-relaxed">
              <strong className="text-white">This is a linked list.</strong> Each stop is a <span className="text-amber-400 font-semibold">node</span>, and each arrow represents its <span className="text-cyan-400 font-semibold">next</span> connection.
            </p>
          </div>
        </div>

        {/* 2. Visual Anatomy Breakdown Grid */}
        <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: What is a Node? */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                Concept 01
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                What is a Node?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                A container that holds two things: the actual data (the landmark name) and a link to whatever comes next.
              </p>
            </div>

            {/* Conceptual Node Diagram */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[11px]">
                <span className="text-slate-500">NODE</span>
                <span className="text-amber-400 font-bold">#02</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">data:</span>
                <span className="text-slate-100 font-sans font-semibold">Golden Temple</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">next:</span>
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <span>#03</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: What is HEAD? */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                Concept 02
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                HEAD = The Entry Point
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                The list has no index numbers in memory. You only have a pointer to the first stop. To reach any node, you always start at HEAD.
              </p>
            </div>

            {/* HEAD Visual */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-800">
                <span className="text-amber-400 font-bold">HEAD</span>
                <span className="text-slate-500">points to</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <span className="text-amber-400 font-bold">➔</span>
                <span className="font-sans font-semibold">Home (#01)</span>
              </div>
              <div className="text-[11px] text-slate-500">
                If you lose HEAD, the rest of the chain is lost.
              </div>
            </div>
          </div>

          {/* Card 3: What is NULL? */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                Concept 03
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">
                NULL = The End
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                The last node's <code className="text-cyan-400 font-mono">next</code> points to NULL. This tells algorithms and programs: "stop here, the journey is complete."
              </p>
            </div>

            {/* NULL Visual */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] pb-1.5 border-b border-slate-800">
                <span className="text-slate-300 font-sans font-semibold">Wagah Border (#05)</span>
                <span className="text-slate-500">next</span>
              </div>
              <div className="flex items-center gap-2 text-rose-300">
                <span className="text-rose-400 font-bold">➔</span>
                <span className="font-bold">NULL</span>
              </div>
              <div className="text-[11px] text-slate-500">
                No next stop exists beyond this point.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
