import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Compass, Play } from 'lucide-react';

export const TraversePanel: React.FC = () => {
  const { nodes, executeTraverse, isAnimating } = useAppState();

  const handleStartTraverse = async () => {
    await executeTraverse();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Traverse the Full Route (HEAD ➔ NULL)</span>
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Follows each node's <code className="text-amber-300 font-mono">next</code> pointer step-by-step from HEAD until reaching the NULL terminator.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400 font-mono">
          Stops to visit: <strong className="text-slate-200">{nodes.length}</strong>
        </div>

        <button
          onClick={handleStartTraverse}
          disabled={nodes.length === 0 || isAnimating}
          className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Traversal</span>
        </button>
      </div>
    </div>
  );
};
