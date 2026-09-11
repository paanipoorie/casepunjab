import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { ScenarioId } from '../../types/scenario';
import { MapPin, Music, Train, Globe } from 'lucide-react';

export const ScenarioSwitcher: React.FC = () => {
  const { scenarioId, switchScenario } = useAppState();

  const scenarios = [
    {
      id: 'punjab' as ScenarioId,
      name: "Punjab Tour",
      role: "Landmark stops",
      icon: MapPin,
      sample: "Home → Golden Temple → Jallianwala Bagh"
    },
    {
      id: 'music' as ScenarioId,
      name: "Music Playlist",
      role: "Songs in queue",
      icon: Music,
      sample: "Excuses → Softly → Born To Shine"
    },
    {
      id: 'train' as ScenarioId,
      name: "Train",
      role: "Carriage couplers",
      icon: Train,
      sample: "Locomotive WAP-7 → Sleeper S1 → AC 3-Tier"
    },
    {
      id: 'browser' as ScenarioId,
      name: "Browser History",
      role: "Webpage links",
      icon: Globe,
      sample: "google.com → youtube.com → github.com"
    },
  ];

  return (
    <section id="scenarios" className="py-16 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
            Real-World Scenarios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Same Structure. Different Data.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The linked list is a pattern: any sequence where item A points to item B. Switch domains below to see the playground adapt instantly.
          </p>
        </div>

        {/* Simple Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isCurrent = scenarioId === sc.id;

            return (
              <button
                key={sc.id}
                onClick={() => {
                  switchScenario(sc.id);
                  const el = document.getElementById('playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2 rounded-lg ${isCurrent ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-100 mb-0.5">
                    {sc.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mb-2">
                    {sc.role}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 truncate pt-2 border-t border-slate-800/80 font-mono">
                  {sc.sample}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
