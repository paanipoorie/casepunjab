import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { ArrowRight, CheckCircle2, Info } from 'lucide-react';

export const OperationExplanation: React.FC = () => {
  const { currentResult } = useAppState();

  if (!currentResult) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center shadow-sm">
        <h4 className="text-sm font-bold text-slate-200">Operation Breakdown &amp; Pointer Logic</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Execute any linked list action above to inspect what happened, before/after routes, and pointer changes.
        </p>
      </div>
    );
  }

  const { operation, message, complexity, beforeState, afterState, searchedValue, foundIndex, totalComparisons } = currentResult;

  // Title formatter
  const getOpTitle = () => {
    switch (operation) {
      case 'insert_after': return 'INSERT COMPLETE';
      case 'add_end': return 'ADD TO TAIL COMPLETE';
      case 'add_beginning': return 'INSERT AT HEAD COMPLETE';
      case 'delete': return 'DELETE COMPLETE';
      case 'search': return currentResult.success ? 'SEARCH COMPLETE (FOUND)' : 'SEARCH COMPLETE (NOT FOUND)';
      case 'traverse': return 'TRAVERSAL COMPLETE';
      default: return 'ROUTE RESET';
    }
  };

  // Why explanation generator
  const getWhyExplanation = () => {
    switch (operation) {
      case 'insert_after':
        return [
          "The new node's next was linked to the subsequent node (newNode->next = current->next).",
          "The predecessor's next pointer was updated to point to the new node (current->next = newNode)."
        ];
      case 'add_end':
        return [
          "Traversed to the current tail node whose next was NULL.",
          "Updated the tail's next pointer to point to the new node (tail->next = newNode).",
          "The new node's next points to NULL as the new terminator."
        ];
      case 'add_beginning':
        return [
          "The new node's next was pointed to the current HEAD (newNode->next = head).",
          "The HEAD reference was advanced to the new node (head = newNode)."
        ];
      case 'delete':
        return [
          "Located the node immediately before the deleted stop (the predecessor).",
          "Updated the predecessor's next pointer to bypass the deleted node (current->next = current->next->next).",
          "The detached node was safely deallocated from memory."
        ];
      case 'search':
        return [
          `Started at HEAD and inspected each stop sequentially.`,
          `Compared query "${searchedValue}" against node values step-by-step.`,
          currentResult.success 
            ? `Located matching stop at position #${(foundIndex ?? 0) + 1} after ${totalComparisons} comparison(s).`
            : `Reached NULL after ${totalComparisons} comparisons without finding a match.`
        ];
      case 'traverse':
        return [
          "Started pointer current at HEAD.",
          "Visited each landmark by advancing current = current->next until current reached NULL.",
          `All ${afterState.length} stops were visited in order.`
        ];
      default:
        return ["Restored initial linked list sequence."];
    }
  };

  const whyPoints = getWhyExplanation();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
      
      {/* 1. Header with Status & Operation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono font-bold text-amber-400 tracking-wider">
            {getOpTitle()}
          </div>
          <h3 className="text-base font-bold text-slate-100 mt-0.5">
            {message}
          </h3>
        </div>

        {/* Complexity badge */}
        <div className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
          Time: <strong className="text-white">{complexity.time}</strong>
        </div>
      </div>

      {/* 2. Before vs After Route Sequence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Before */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-bold mb-2">
            Before:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {beforeState.length === 0 ? (
              <span className="text-slate-500 italic">Empty list</span>
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
        <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-500/30">
          <div className="text-[11px] font-mono uppercase text-amber-400 font-bold mb-2">
            After:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {afterState.length === 0 ? (
              <span className="text-rose-400 italic">Empty list</span>
            ) : (
              afterState.map((n, i) => (
                <React.Fragment key={n.id}>
                  <span className="px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/40 text-amber-300 font-medium">
                    {n.data}
                  </span>
                  {i < afterState.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-amber-400/60" />
                  )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 3. Why did the connection change? */}
      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
        <div className="text-xs font-mono font-bold uppercase text-slate-300 mb-2">
          Why did the connection change?
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
          {whyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-400 font-bold mt-0.5">•</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400">
          <strong className="text-slate-300">Complexity Note:</strong> {complexity.explanation}
        </div>
      </div>

    </div>
  );
};
