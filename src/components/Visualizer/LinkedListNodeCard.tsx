import React from 'react';
import { NodeData } from '../../types/linked-list';
import { ArrowRight, Check, Trash2, Plus, Sparkles, MapPin } from 'lucide-react';

interface LinkedListNodeCardProps {
  node: NodeData;
  index: number;
  isHead: boolean;
  isTail: boolean;
  isSelected: boolean;
  isActive: boolean;
  isFound: boolean;
  isTarget: boolean;
  isSuccessor: boolean;
  isNewNode: boolean;
  isVisited: boolean;
  onSelect: (id: string) => void;
  nextConceptualAddress: string | null;
}

export const LinkedListNodeCard: React.FC<LinkedListNodeCardProps> = ({
  node,
  index,
  isHead,
  isTail,
  isSelected,
  isActive,
  isFound,
  isTarget,
  isSuccessor,
  isNewNode,
  isVisited,
  onSelect,
  nextConceptualAddress,
}) => {
  // Determine dynamic highlight border and background
  let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/90';
  let glowEffect = '';
  let statusBanner = null;

  if (isFound) {
    borderStyle = 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400';
    glowEffect = 'animate-pulse';
    statusBanner = (
      <div className="text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded flex items-center justify-center gap-1">
        <Check className="w-3 h-3" /> MATCH FOUND
      </div>
    );
  } else if (isTarget) {
    borderStyle = 'border-rose-500 bg-rose-950/40 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400';
    statusBanner = (
      <div className="text-[10px] font-mono font-bold bg-rose-500 text-white px-2 py-0.5 rounded flex items-center justify-center gap-1">
        <Trash2 className="w-3 h-3" /> UNLINKING
      </div>
    );
  } else if (isActive) {
    borderStyle = 'border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-400/20 ring-2 ring-amber-400 scale-[1.02]';
    statusBanner = (
      <div className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded flex items-center justify-center gap-1">
        CURRENT (POINTER)
      </div>
    );
  } else if (isSuccessor) {
    borderStyle = 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-400/70';
    statusBanner = (
      <div className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded text-center">
        SUCCESSOR (next)
      </div>
    );
  } else if (isNewNode) {
    borderStyle = 'border-amber-500 bg-amber-950/30 ring-2 ring-amber-400';
    statusBanner = (
      <div className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded flex items-center justify-center gap-1">
        <Plus className="w-3 h-3" /> NEW NODE
      </div>
    );
  } else if (isSelected) {
    borderStyle = 'border-amber-400 bg-slate-900 ring-2 ring-amber-400/80';
  } else if (isVisited) {
    borderStyle = 'border-indigo-500/50 bg-indigo-950/20';
  }

  return (
    <div
      onClick={() => onSelect(node.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(node.id); }}
      className={`relative w-full sm:w-60 rounded-xl border p-4 text-left cursor-pointer transition-all duration-200 shadow-md select-none group flex flex-col justify-between min-h-[145px] ${borderStyle} ${glowEffect}`}
    >
      {/* Top Header: Node address & Head/Tail indicators */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400">
              {node.conceptualAddress}
            </span>
            {isHead && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                HEAD
              </span>
            )}
            {isTail && (
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                TAIL
              </span>
            )}
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            pos #{index + 1}
          </span>
        </div>

        {/* Status Banner when animating */}
        {statusBanner && (
          <div className="my-2">
            {statusBanner}
          </div>
        )}

        {/* Landmark Data */}
        <div className="py-2.5">
          <div className="text-xs text-slate-400 font-mono">data:</div>
          <div className="text-sm sm:text-base font-bold text-slate-100 truncate tracking-tight">
            {node.data}
          </div>
        </div>
      </div>

      {/* Pointer Connection row: next -> #03 or NULL */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
        <span className="text-slate-400 font-mono">next:</span>
        <div className="flex items-center gap-1.5">
          <span className={`font-bold ${node.nextId ? 'text-cyan-400' : 'text-rose-400'}`}>
            {nextConceptualAddress || (node.nextId ? node.nextId.slice(0, 7) : 'NULL')}
          </span>
          {node.nextId && <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />}
        </div>
      </div>
    </div>
  );
};
