import React from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, RotateCcw, 
  Layers, CheckCircle2, AlertTriangle, Info, Terminal, Zap, Compass, Search, PlusCircle, RefreshCw
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const StepStatusBanner: React.FC = () => {
  const { 
    currentResult, 
    currentStepIndex, 
    currentStep, 
    isAnimating, 
    animationSpeed, 
    setAnimationSpeed,
    stepForward, 
    stepBackward, 
    pauseAnimation, 
    resumeAnimation, 
    replayCurrentOperation,
    bannerMessage,
    executeTraverse,
    executeSearch,
    executeReset,
    nodes
  } = useAppState();

  const totalSteps = currentResult?.steps.length || 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  const isIdle = !currentResult || currentResult.operation === 'reset';

  // If idle, show quick run trigger toolbar
  if (isIdle) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md mb-6 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Visualizer Ready
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Ready to Run
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 mt-0.5">
                Click "Run Visualizer" to animate pointer hopping across all stops from HEAD to NULL.
              </h4>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => executeTraverse()}
              disabled={isAnimating || nodes.length === 0}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>▶ Run Visualizer (Traverse)</span>
            </button>
            <button
              onClick={() => executeSearch('Partition Museum')}
              disabled={isAnimating || nodes.length === 0}
              className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span>Search Stop</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg mb-6 transition-all">
      
      {/* Top row: Status indicator and Step Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        
        {/* Left: Step Badge & Title */}
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg flex items-center justify-center ${
            currentStep?.status === 'found'
              ? 'bg-emerald-500/20 text-emerald-400'
              : currentStep?.status === 'not_found'
              ? 'bg-amber-500/20 text-amber-400'
              : currentStep?.status === 'deleting'
              ? 'bg-rose-500/20 text-rose-400'
              : currentStep?.status === 'reconnecting'
              ? 'bg-cyan-500/20 text-cyan-400'
              : 'bg-amber-500/20 text-amber-400'
          }`}>
            <Layers className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              {currentStep && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                  currentStep.status === 'found' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  currentStep.status === 'not_found' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                  currentStep.status === 'complete' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' :
                  'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse'
                }`}>
                  {currentStep.status.replace('_', ' ')}
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
              {currentStep?.title || bannerMessage?.text}
            </h4>
          </div>
        </div>

        {/* Right: Interactive Step Navigation Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {/* Step Back */}
          <button
            onClick={stepBackward}
            disabled={currentStepIndex === 0}
            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 rounded hover:bg-slate-800 transition-colors"
            title="Previous Step"
            aria-label="Previous step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          {isAnimating ? (
            <button
              onClick={pauseAnimation}
              className="px-2.5 py-1 text-xs font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors flex items-center gap-1"
              title="Pause Animation"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={resumeAnimation}
              className="px-2.5 py-1 text-xs font-semibold bg-amber-500 text-slate-950 rounded hover:bg-amber-400 transition-colors flex items-center gap-1"
              title="Play / Resume Animation"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isLastStep ? 'Replay' : 'Play'}</span>
            </button>
          )}

          {/* Step Forward */}
          <button
            onClick={stepForward}
            disabled={isLastStep}
            className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 rounded hover:bg-slate-800 transition-colors"
            title="Next Step"
            aria-label="Next step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          {/* Replay */}
          <button
            onClick={replayCurrentOperation}
            className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 transition-colors"
            title="Replay full operation"
            aria-label="Replay operation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Control */}
          <div className="h-4 w-px bg-slate-800 mx-1"></div>
          <select
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="bg-slate-900 text-slate-300 text-[11px] font-mono rounded px-1.5 py-1 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            aria-label="Animation speed"
          >
            <option value={1800}>0.6x Slow</option>
            <option value={1000}>1.0x Normal</option>
            <option value={500}>2.0x Fast</option>
          </select>
        </div>

      </div>

      {/* Description & Pointer Narration */}
      {currentStep && (
        <div className="mt-3 text-sm text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{currentStep.description}</span>
          </div>

          {currentStep.pointerStateDescription && (
            <div className="shrink-0 font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-700/80 text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentStep.pointerStateDescription}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
