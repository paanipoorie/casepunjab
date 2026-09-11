import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { GitCommit, Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';

export const InsertPanel: React.FC = () => {
  const { scenario, nodes, executeInsertAfter, isAnimating } = useAppState();
  const [targetName, setTargetName] = useState(nodes[0]?.data || '');
  const [newName, setNewName] = useState('');
  const [category, setCategory] = useState('');

  // Keep target in sync if list changes
  const validTarget = nodes.some(n => n.data === targetName) 
    ? targetName 
    : (nodes[0]?.data || '');

  const handleSelectPreset = (candidate: typeof scenario.presetInsertCandidates[0]) => {
    setNewName(candidate.name);
    setCategory(candidate.metadata?.category || '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !validTarget) return;

    const metadata = {
      category: category.trim() || 'Spliced Stop',
      subtitle: `Inserted after ${validTarget}`,
      badge: 'DETOUR',
      icon: 'MapPin',
      description: `Inserted ${newName.trim()} into the tour right after ${validTarget}.`
    };

    await executeInsertAfter(validTarget, newName.trim(), metadata);
    setNewName('');
    setCategory('');
  };

  const targetNode = nodes.find(n => n.data === validTarget);
  const successorNode = targetNode && targetNode.nextId 
    ? nodes.find(n => n.id === targetNode.nextId) 
    : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-cyan-400" />
          Insert {scenario.nodeLabel} in the Middle (After a Target Stop)
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Splice a new node between two existing landmarks by executing: <code className="text-cyan-300 font-mono bg-slate-950 px-1 rounded">newNode-&gt;next = current-&gt;next; current-&gt;next = newNode;</code>
        </p>
      </div>

      {/* Preset Suggestions */}
      {scenario.presetInsertCandidates.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preset Detours:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.presetInsertCandidates.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleSelectPreset(c)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-all"
              >
                + {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Insert Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Target Predecessor Selection */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Insert AFTER which existing {scenario.nodeLabel}? <span className="text-cyan-400">*</span>
            </label>
            <select
              value={validTarget}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
            >
              {nodes.map((n, idx) => (
                <option key={n.id} value={n.data}>
                  {n.conceptualAddress}: {n.data} (pos #{idx + 1})
                </option>
              ))}
            </select>
          </div>

          {/* New Landmark Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              New {scenario.nodeLabel} to Insert <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={`e.g. Durgiana Temple`}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

        </div>

        {/* Live Pointer Preview */}
        {validTarget && (
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs">
            <div className="text-slate-400 text-[11px] mb-1">Preview of pointer changes:</div>
            <div className="flex flex-wrap items-center gap-2 text-slate-300">
              <span className="text-slate-200 font-bold">{validTarget}</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-amber-400 font-bold underline decoration-amber-500/50">
                {newName.trim() || '[New Stop]'}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">
                {successorNode ? successorNode.data : 'NULL'}
              </span>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!newName.trim() || !validTarget || isAnimating}
            className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-98 shadow-sm"
          >
            <GitCommit className="w-4 h-4" />
            <span>Execute Insert After</span>
          </button>
        </div>

      </form>
    </div>
  );
};
