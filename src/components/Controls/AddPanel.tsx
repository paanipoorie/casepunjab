import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Plus } from 'lucide-react';

export const AddPanel: React.FC = () => {
  const { scenario, executeAddEnd, executeAddBeginning, isAnimating } = useAppState();
  const [name, setName] = useState('');
  const [position, setPosition] = useState<'end' | 'beginning'>('end');

  const handleSelectPreset = (candidate: typeof scenario.presetInsertCandidates[0]) => {
    setName(candidate.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const metadata = {
      category: 'Custom Stop',
      subtitle: `${scenario.nodeLabel} added to tour`,
      badge: position === 'beginning' ? 'HEAD' : 'TAIL',
      icon: 'MapPin',
      description: `Added ${name.trim()} to the itinerary.`
    };

    if (position === 'beginning') {
      await executeAddBeginning(name.trim(), metadata);
    } else {
      await executeAddEnd(name.trim(), metadata);
    }

    setName('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add a New {scenario.nodeLabel}</span>
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Append to the end of the tour, or prepend to the beginning as the new HEAD.
        </p>
      </div>

      {/* Preset Suggestions */}
      {scenario.presetInsertCandidates.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-mono">Suggestions:</span>
          {scenario.presetInsertCandidates.slice(0, 3).map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => handleSelectPreset(c)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition-colors"
            >
              + {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Position Selection: End vs Beginning */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-300">Position:</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPosition('end')}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${
                position === 'end'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              At End (Tail)
            </button>
            <button
              type="button"
              onClick={() => setPosition('beginning')}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${
                position === 'beginning'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              At Beginning (HEAD)
            </button>
          </div>
        </div>

        {/* Input */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            {scenario.nodeLabel} Name:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder={`e.g. Gobindgarh Fort`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
            <button
              type="submit"
              disabled={!name.trim() || isAnimating}
              className="px-5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{position === 'end' ? 'Add to End' : 'Insert at Head'}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
