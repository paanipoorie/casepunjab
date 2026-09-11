import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  BookOpen, Clock, HardDrive, ArrowRight, CornerDownRight, 
  Sparkles, CheckCircle, GitCommit, Trash2, Search, Compass 
} from 'lucide-react';

export const OperationExplanation: React.FC = () => {
  const { currentResult } = useAppState();

  if (!currentResult) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-300">Operation Mechanics & Theory</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Execute any linked list action above to inspect pointer reassignments, before/after routes, and computational complexity.
        </p>
      </div>
    );
  }

  const { operation, message, complexity, beforeState, afterState } = currentResult;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
      
      {/* Header with Title and Operation Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono font-semibold uppercase text-amber-400 tracking-wider">
            Step-by-Step Breakdown
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
            {operation === 'insert_after' ? 'Intermediate Node Insertion' :
             operation === 'add_end' ? 'Append to Tail' :
             operation === 'add_beginning' ? 'Prepend to Head' :
             operation === 'delete' ? 'Intermediate Node Deletion' :
             operation === 'search' ? 'Sequential Linear Search' :
             operation === 'traverse' ? 'Full Route Traversal' : 'Route Reset'}
          </h3>
        </div>

        {/* Complexity Pill */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Time: <strong>{complexity.time}</strong></span>
          </div>
          <div className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>Space: <strong>{complexity.space}</strong></span>
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <div className="p-3.5 rounded-lg bg-slate-950/90 border border-slate-800 text-sm text-slate-300 leading-relaxed">
        <p>
          <strong className="text-amber-400 font-semibold">What just happened:</strong> {message}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {complexity.explanation}
        </p>
      </div>

      {/* Before vs After Visual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Before */}
        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center justify-between">
            <span>BEFORE ({beforeState.length} nodes)</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {beforeState.length === 0 ? (
              <span className="text-slate-500 italic">List was empty</span>
            ) : (
              beforeState.map((n, i) => (
                <React.Fragment key={n.id}>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    {n.data}
                  </span>
                  {i < beforeState.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        {/* After */}
        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-emerald-500/30">
          <div className="text-[11px] font-mono uppercase text-emerald-400 font-bold mb-2 flex items-center justify-between">
            <span>AFTER ({afterState.length} nodes)</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {afterState.length === 0 ? (
              <span className="text-rose-400 italic">List is now empty</span>
            ) : (
              afterState.map((n, i) => (
                <React.Fragment key={n.id}>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-medium">
                    {n.data}
                  </span>
                  {i < afterState.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-emerald-500/50" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
