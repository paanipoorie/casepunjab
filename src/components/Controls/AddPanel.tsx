import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Plus, Sparkles, CornerDownRight, ArrowRight } from 'lucide-react';

export const AddPanel: React.FC = () => {
  const { scenario, executeAddEnd, executeAddBeginning, isAnimating } = useAppState();
  const [name, setName] = useState('');
  const [position, setPosition] = useState<'end' | 'beginning'>('end');
  const [category, setCategory] = useState('');

  const handleSelectPreset = (candidate: typeof scenario.presetInsertCandidates[0]) => {
    setName(candidate.name);
    setCategory(candidate.metadata?.category || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const metadata = {
      category: category.trim() || 'Custom Stop',
      subtitle: `${scenario.nodeLabel} added by user`,
      badge: position === 'beginning' ? 'NEW HEAD' : 'NEW TAIL',
      icon: 'MapPin',
      description: `User added ${name.trim()} to the itinerary.`
    };

    if (position === 'beginning') {
      await executeAddBeginning(name.trim(), metadata);
    } else {
      await executeAddEnd(name.trim(), metadata);
    }

    setName('');
    setCategory('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" />
          Add New {scenario.nodeLabel}
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Append a new destination to the end of the tour, or insert at the very beginning as the new HEAD.
        </p>
      </div>

      {/* Preset Suggestions */}
      {scenario.presetInsertCandidates.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Suggested {scenario.nodeLabel}s:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.presetInsertCandidates.slice(0, 4).map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleSelectPreset(c)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 hover:border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <span>+ {c.name}</span>
                {c.metadata?.badge && (
                  <span className="text-[9px] bg-slate-800 px-1 rounded text-slate-400">
                    {c.metadata.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Position Selection: End vs Beginning */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-slate-300">Target Position:</label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPosition('end')}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${
                position === 'end'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              At End (Tail) • O(n)/O(1)
            </button>
            <button
              type="button"
              onClick={() => setPosition('beginning')}
              className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all ${
                position === 'beginning'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              At Beginning (HEAD) • O(1)
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {scenario.nodeLabel} Name <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={`e.g. Gobindgarh Fort`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Category / Note (optional)
            </label>
            <input
              type="text"
              placeholder={`e.g. Historic Military Fort`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!name.trim() || isAnimating}
            className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-98 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{position === 'end' ? 'Append to End' : 'Insert at Head'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
