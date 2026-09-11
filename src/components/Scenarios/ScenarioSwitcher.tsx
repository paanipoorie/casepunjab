import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { SCENARIOS } from '../../data/scenarios';
import { ScenarioId } from '../../types/scenario';
import { 
  MapPin, Music, Train, Globe, 
  ArrowRight, Sparkles, CheckCircle2 
} from 'lucide-react';

export const ScenarioSwitcher: React.FC = () => {
  const { scenarioId, switchScenario } = useAppState();

  const scenarioCards = [
    {
      id: 'punjab' as ScenarioId,
      title: "Tim's Punjab Tour",
      subtitle: "Landmark by landmark sequence",
      icon: MapPin,
      badge: "Primary Case Study",
      description: "Tim manages sight-seeing stops across Punjab. Insert holy shrines, bypass closed museums, and traverse the travel route.",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400"
    },
    {
      id: 'music' as ScenarioId,
      title: "Music Playlist Organizer",
      subtitle: "Sequential audio queue",
      icon: Music,
      badge: "Audio Queue",
      description: "Songs connected like a digital playback queue. Append hits, insert encore tracks, and play songs from HEAD to NULL.",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
    },
    {
      id: 'train' as ScenarioId,
      title: "Train Carriage Management",
      subtitle: "Physical bogie couplers",
      icon: Train,
      badge: "Railway Couplers",
      description: "Railway bogies linked end-to-end behind a WAP-7 electric locomotive. Attach sleeper cars or splice in pantry dining coaches.",
      accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
    },
    {
      id: 'browser' as ScenarioId,
      title: "Browser History",
      subtitle: "Navigated webpage stack",
      icon: Globe,
      badge: "Web History",
      description: "Sequential chain of visited URLs. Add new websites, search through previous links, or delete visited pages from the chain.",
      accent: "from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400"
    },
  ];

  return (
    <section id="scenarios" className="py-16 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Multi-Domain Adaptations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Same Structure. Different World.
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            The beauty of a linked list is that its pointer mechanics apply universally. Switch between domains below to see how nodes represent landmarks, songs, train carriages, and browser links.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scenarioCards.map((card) => {
            const Icon = card.icon;
            const isCurrent = scenarioId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => {
                  switchScenario(card.id);
                  const el = document.getElementById('playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
                className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between text-left group bg-gradient-to-b ${
                  isCurrent
                    ? 'border-amber-400 bg-slate-900 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/50'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${card.accent} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isCurrent ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE SCENARIO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-800/80">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-amber-300 transition-colors">
                    {card.title}
                  </h3>
                  <div className="text-xs font-medium text-amber-400/90 font-mono mb-3">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className={isCurrent ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'}>
                    {isCurrent ? 'Currently In Playground' : 'Switch to this Scenario'}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isCurrent ? 'text-amber-400' : 'text-slate-500'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
