import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { HistoryItem } from '../../types/linked-list';
import { 
  History, RotateCcw, Clock, Eye, Trash2, 
  CheckCircle2, Plus, GitCommit, Search, Compass, RefreshCw 
} from 'lucide-react';

export const OperationHistoryTimeline: React.FC = () => {
  const { history, revisitHistoryItem, clearHistory } = useAppState();

  const getOpIcon = (op: string) => {
    switch (op) {
      case 'add_end':
      case 'add_beginning':
        return <Plus className="w-3.5 h-3.5 text-amber-400" />;
      case 'insert_after':
        return <GitCommit className="w-3.5 h-3.5 text-cyan-400" />;
      case 'delete':
        return <Trash2 className="w-3.5 h-3.5 text-rose-400" />;
      case 'search':
        return <Search className="w-3.5 h-3.5 text-emerald-400" />;
      case 'traverse':
        return <Compass className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <RefreshCw className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div id="history" className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono">
            Operation History Log ({history.length})
          </h3>
        </div>

        {history.length > 1 && (
          <button
            onClick={clearHistory}
            className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            Clear Log
          </button>
        )}
      </div>

      {/* Timeline items list */}
      <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
        {history.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No logged actions yet. Manipulate the linked list to see real-time history logs.
          </div>
        ) : (
          history.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => revisitHistoryItem(item)}
              role="button"
              tabIndex={0}
              className="group p-3 rounded-lg bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 cursor-pointer transition-all flex items-start justify-between gap-3 text-left"
            >
              {/* Number and Icon */}
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-[11px] font-mono text-slate-500 group-hover:text-amber-400 font-bold shrink-0 mt-0.5">
                  {(history.length - idx).toString().padStart(2, '0')}
                </span>

                <div className="p-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                  {getOpIcon(item.operation)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                    {item.summary}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {item.detail}
                  </div>
                </div>
              </div>

              {/* Time & Inspect Icon */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                  {item.timestamp}
                </span>
                <span className="text-slate-500 group-hover:text-amber-400 p-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="hidden sm:inline">Replay</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
        💡 Click any logged action above to replay and inspect its exact step-by-step memory changes.
      </div>

    </div>
  );
};
