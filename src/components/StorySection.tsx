import React from 'react';
import { MapPin, Navigation, ArrowRight, CornerDownRight, Check, AlertCircle } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 lg:py-20 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Navigation className="w-4 h-4" />
            <span>The Concept & Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-4">
            Tim's Journey Keeps Changing.
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            Tim is an enthusiastic explorer planning a sightseeing tour across Punjab. But real-world travel is fluid: new recommendations pop up, plans change, and stops get added or removed on the fly.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Problem & Real World Analogy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                The Initial Route
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Tim creates an initial itinerary starting from Home, visiting the revered Golden Temple, historic Jallianwala Bagh, poignant Partition Museum, and concluding at Wagah Border.
              </p>

              {/* Visual Chain Teaser */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Golden Temple</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Jallianwala Bagh</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Partition Museum</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">Wagah Border</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-mono border border-rose-500/30">NULL</span>
              </div>
            </div>

            {/* Dynamic Changes Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-amber-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
                  <CornerDownRight className="w-4 h-4" />
                  Adding a Final Destination
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Want to visit Gobindgarh Fort after Wagah Border? Simply attach it to the end by updating the tail pointer.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-amber-400 font-semibold text-sm mb-1 flex items-center gap-1.5">
                  <CornerDownRight className="w-4 h-4" />
                  Splicing in a Detour
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Want to squeeze in Durgiana Temple right after Golden Temple? Splice it in by redirecting just two pointers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Concept Mapping Table */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-md">
            <h3 className="text-lg font-bold text-slate-100 mb-4 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Analogy Translation Table</span>
              <span className="text-xs font-mono font-normal text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">Real ➔ DSA</span>
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-slate-200 font-medium">Tourist Landmark</div>
                  <div className="text-xs text-slate-400">e.g., Golden Temple</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-amber-300 font-semibold text-xs bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                    Node.data
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-slate-200 font-medium">Road / Direction to Next Stop</div>
                  <div className="text-xs text-slate-400">Where to travel next</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-cyan-300 font-semibold text-xs bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                    Node.next pointer
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-slate-200 font-medium">Tour Origin (Home)</div>
                  <div className="text-xs text-slate-400">Starting place</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-emerald-300 font-semibold text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    HEAD reference
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-slate-200 font-medium">End of Tour</div>
                  <div className="text-xs text-slate-400">No further stops</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-rose-300 font-semibold text-xs bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                    NULL pointer
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div>
                  <div className="text-slate-200 font-medium">Following Route in Order</div>
                  <div className="text-xs text-slate-400">Visiting stops one-by-one</div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-indigo-300 font-semibold text-xs bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                    Traversal O(n)
                  </span>
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="mt-5 p-3 rounded-lg bg-slate-950 border border-slate-800/90 flex items-start gap-2.5 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-300">Context Note:</strong> Punjab landmarks are an intentional educational adaptation for engaging visualization of the case study's core linked-list operations.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
