import React from 'react';
import { ArrowRight, CornerDownRight } from 'lucide-react';

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
    <div className={`flex flex-col items-center justify-center relative select-none ${isVertical ? 'py-2' : 'px-2'}`}>
      
      {/* Visual Line and Indicator */}
      <div className={`flex items-center gap-1 transition-all duration-200 ${
        isReconnecting
          ? 'text-amber-400 font-bold'
          : isBypassing
          ? 'text-rose-400'
          : isHighlighted
          ? 'text-cyan-400'
          : 'text-slate-600'
      }`}>
        
        {/* Pointer Tag */}
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-mono tracking-wider lowercase px-1.5 py-0.5 rounded border transition-colors ${
            isReconnecting
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : isBypassing
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 line-through'
              : isHighlighted
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-950 text-slate-500 border-slate-800'
          }`}>
            {label}
          </span>
          
          {/* Arrow Glyph */}
          <div className="flex items-center justify-center mt-0.5">
            {isVertical ? (
              <CornerDownRight className="w-4 h-4 rotate-90" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
