import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Compass, Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const TraversePanel: React.FC = () => {
  const { scenario, nodes, executeTraverse, currentResult, isAnimating } = useAppState();

  const handleStartTraverse = async () => {
    await executeTraverse();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          Full Route Traversal (HEAD ➔ TAIL ➔ NULL)
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Visits every landmark sequentially by following each node's <code className="text-amber-300 font-mono bg-slate-950 px-1 rounded">next</code> pointer until reaching the NULL terminator.
        </p>
      </div>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 mb-4 text-xs font-mono text-slate-300 space-y-1">
        <div className="text-slate-400 text-[11px]">Traversal algorithm step-by-step:</div>
        <div>1. Set pointer <code className="text-amber-400">Node* current = head;</code></div>
        <div>2. While <code className="text-cyan-400">current != nullptr</code>: visit node, print data.</div>
        <div>3. Move forward: <code className="text-emerald-400">current = current-&gt;next;</code></div>
        <div>4. Finish cleanly when reaching <code className="text-rose-400">NULL</code> (O(n) time).</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400 font-mono">
          Total nodes to visit: <strong className="text-slate-200">{nodes.length}</strong>
        </div>

        <button
          onClick={handleStartTraverse}
          disabled={nodes.length === 0 || isAnimating}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 transition-all flex items-center gap-2 shadow-md active:scale-98"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Full Traversal</span>
        </button>
      </div>
    </div>
  );
};
