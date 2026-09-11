import React from 'react';
import { ArrowRight, CornerDownRight, Shuffle } from 'lucide-react';

interface PointerConnectionArrowProps {
  isReconnecting?: boolean;
  isBypassing?: boolean;
  isHighlighted?: boolean;
  targetAddress?: string | null;
  label?: string;
  isVertical?: boolean;
}

export const PointerConnectionArrow: React.FC<PointerConnectionArrowProps> = ({
  isReconnecting = false,
  isBypassing = false,
  isHighlighted = false,
  targetAddress = null,
  label = 'next',
  isVertical = false,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${isVertical ? 'py-3' : 'px-2 sm:px-3'}`}>
      
      {/* Visual Line and Indicator */}
      <div className={`flex items-center gap-1.5 transition-all duration-300 ${
        isReconnecting
          ? 'text-amber-400 scale-110 font-bold'
          : isBypassing
          ? 'text-rose-400 scale-110'
          : isHighlighted
          ? 'text-cyan-400 scale-105'
          : 'text-slate-500'
      }`}>
        
        {/* Pointer Tag */}
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded border transition-colors ${
            isReconnecting
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              : isBypassing
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 line-through'
              : isHighlighted
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800'
          }`}>
            {label}
          </span>
          
          {/* Arrow Glyph */}
          <div className="flex items-center justify-center mt-1">
            {isVertical ? (
              <CornerDownRight className={`w-5 h-5 transition-transform ${isReconnecting ? 'rotate-90 animate-bounce' : 'rotate-90'}`} />
            ) : (
              <ArrowRight className={`w-5 h-5 transition-transform ${isReconnecting ? 'animate-pulse' : ''}`} />
            )}
          </div>
        </div>

      </div>

      {targetAddress && (
        <span className="text-[9px] font-mono text-slate-400 mt-0.5">
          ➔ {targetAddress}
        </span>
      )}
    </div>
  );
};
