import React from 'react';
import { NodeData } from '../../types/linked-list';
import { 
  MapPin, Sparkles, Flame, Landmark, Flag, Shield, Mountain, 
  Building, Crown, Music, Disc, Radio, Headphones, Heart, 
  Bed, Snowflake, ShieldAlert, Utensils, Star, Armchair, Zap,
  Search, PlaySquare, GitBranch, Code2, Bot, HelpCircle, BookOpen, GraduationCap,
  ArrowRight, Check, Trash2, Plus
} from 'lucide-react';

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

// Icon resolver for rich landmark / item graphics
const getIconComponent = (iconName?: string) => {
  const map: Record<string, any> = {
    MapPin, Sparkles, Flame, Landmark, Flag, Shield, Mountain,
    Building, Crown, Music, Disc, Radio, Headphones, Heart,
    Bed, Snowflake, ShieldAlert, Utensils, Star, Armchair, Zap,
    Search, PlaySquare, GitBranch, Code2, Bot, HelpCircle, BookOpen, GraduationCap
  };
  return (iconName && map[iconName]) || MapPin;
};

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
  const IconComp = getIconComponent(node.metadata?.icon);

  // Determine dynamic highlight border and background
  let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900/90';
  let glowEffect = '';
  let statusBadge = null;

  if (isFound) {
    borderStyle = 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400';
    glowEffect = 'animate-pulse';
    statusBadge = (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1">
        <Check className="w-3 h-3" /> MATCH FOUND
      </span>
    );
  } else if (isTarget) {
    borderStyle = 'border-rose-500 bg-rose-950/40 shadow-lg shadow-rose-500/20 ring-2 ring-rose-400';
    statusBadge = (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white flex items-center gap-1">
        <Trash2 className="w-3 h-3" /> TARGET DELETE
      </span>
    );
  } else if (isActive) {
    borderStyle = 'border-amber-400 bg-amber-950/40 shadow-lg shadow-amber-400/20 ring-2 ring-amber-400';
    glowEffect = 'scale-[1.02]';
    statusBadge = (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 animate-pulse">
        CURRENT POINTER
      </span>
    );
  } else if (isSuccessor) {
    borderStyle = 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-400/70';
    statusBadge = (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
        SUCCESSOR (next)
      </span>
    );
  } else if (isNewNode) {
    borderStyle = 'border-amber-500 bg-amber-950/30 ring-2 ring-amber-400';
    statusBadge = (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1">
        <Plus className="w-3 h-3" /> NEW NODE
      </span>
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
      className={`relative w-full sm:w-64 rounded-xl border p-4 text-left cursor-pointer transition-all duration-300 shadow-md select-none group ${borderStyle} ${glowEffect}`}
    >
      {/* Top Header: Tag & Address */}
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400">
            {node.conceptualAddress}
          </span>
          {isHead && (
            <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 shadow-sm">
              HEAD
            </span>
          )}
          {isTail && (
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              TAIL
            </span>
          )}
        </div>

        {statusBadge || (
          node.metadata?.badge && (
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
              {node.metadata.badge}
            </span>
          )
        )}
      </div>

      {/* Main Content Body */}
      <div className="py-3 flex items-start gap-3">
        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
          <IconComp className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-slate-400 truncate">
            {node.metadata?.category || `Node Stop #${index + 1}`}
          </div>
          <h4 className="text-base font-bold text-slate-100 truncate tracking-tight">
            {node.data}
          </h4>
          {node.metadata?.subtitle && (
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {node.metadata.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Node Internal Fields: Data & Next */}
      <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5 font-mono text-[11px]">
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/70 border border-slate-800/60">
          <span className="text-slate-400">data:</span>
          <span className="text-amber-300 font-semibold truncate max-w-[140px]">
            "{node.data}"
          </span>
        </div>

        <div className="flex items-center justify-between p-1.5 rounded bg-slate-950/70 border border-slate-800/60">
          <span className="text-slate-400">next:</span>
          <span className={`font-semibold flex items-center gap-1 ${
            node.nextId ? 'text-cyan-400' : 'text-rose-400'
          }`}>
            {nextConceptualAddress || (node.nextId ? `ID: ${node.nextId.slice(0, 6)}` : 'NULL')}
            {node.nextId ? <ArrowRight className="w-3 h-3 text-cyan-400" /> : null}
          </span>
        </div>
      </div>
    </div>
  );
};
