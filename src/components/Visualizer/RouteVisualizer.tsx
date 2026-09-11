import React, { useRef } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { LinkedListNodeCard } from './LinkedListNodeCard';
import { PointerConnectionArrow } from './PointerConnectionArrow';
import { PointerMemoryView } from './PointerMemoryView';
import { StepStatusBanner } from './StepStatusBanner';
import { 
  Eye, Cpu, ArrowRight, MapPin, AlertCircle, RefreshCw, X 
} from 'lucide-react';

export const RouteVisualizer: React.FC = () => {
  const { 
    scenario, 
    nodes, 
    selectedNodeId, 
    setSelectedNodeId, 
    viewMode, 
    setViewMode, 
    currentStep,
    executeReset 
  } = useAppState();

  const containerRef = useRef<HTMLDivElement>(null);

  const getNextAddress = (nextId: string | null) => {
    if (!nextId) return null;
    const found = nodes.find(n => n.id === nextId);
    return found ? found.conceptualAddress : null;
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const selectedIndex = nodes.findIndex(n => n.id === selectedNodeId);

  return (
    <div id="playground-visualizer" className="space-y-4">
      
      {/* Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
        
        {/* Title & Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-100">
            {scenario.title}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 font-semibold">
            {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
          </span>
        </div>

        {/* View Mode Switcher: Route View / Pointer View */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('route')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'route'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Route View</span>
            </button>
            <button
              onClick={() => setViewMode('pointer')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'pointer'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Pointer View</span>
            </button>
          </div>
        </div>

      </div>

      {/* Step Status Banner */}
      <StepStatusBanner />

      {/* View Mode 1: Pointer View */}
      {viewMode === 'pointer' ? (
        <PointerMemoryView />
      ) : (
        /* View Mode 2: Route View (Connected Chain) */
        <div 
          ref={containerRef}
          className="bg-slate-900/60 rounded-2xl border border-slate-800/90 p-4 sm:p-6 shadow-inner overflow-x-auto min-h-[220px] flex items-center"
        >
          {nodes.length === 0 ? (
            /* Empty State Fallback */
            <div className="w-full text-center py-12 px-4">
              <AlertCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-200">The route is empty</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mt-1 mb-5">
                All nodes have been removed (HEAD = NULL). Add a stop below or reset the tour.
              </p>
              <button
                onClick={executeReset}
                className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 inline-flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Route
              </button>
            </div>
          ) : (
            /* Connected Chain */
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 w-full lg:w-auto">
              
              {/* HEAD Pointer Tag */}
              <div className="flex lg:flex-col items-center justify-center p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center shrink-0">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                  START
                </span>
                <span className="text-xs font-mono font-extrabold text-amber-300">
                  HEAD ➔
                </span>
              </div>

              {/* Render Nodes sequentially */}
              {nodes.map((node, index) => {
                const isHead = index === 0;
                const isTail = index === nodes.length - 1;
                const isSelected = selectedNodeId === node.id;
                const isActive = currentStep?.activeNodeId === node.id;
                const isFound = currentStep?.status === 'found' && currentStep?.activeNodeId === node.id;
                const isTarget = currentStep?.targetNodeId === node.id;
                const isSuccessor = currentStep?.affectedNextNodeId === node.id;
                const isVisited = currentStep?.visitedNodeIds?.includes(node.id) || false;
                const nextAddress = getNextAddress(node.nextId);

                return (
                  <React.Fragment key={node.id}>
                    <LinkedListNodeCard
                      node={node}
                      index={index}
                      isHead={isHead}
                      isTail={isTail}
                      isSelected={isSelected}
                      isActive={isActive}
                      isFound={isFound}
                      isTarget={isTarget}
                      isSuccessor={isSuccessor}
                      isNewNode={false}
                      isVisited={isVisited}
                      onSelect={(id) => setSelectedNodeId(id === selectedNodeId ? null : id)}
                      nextConceptualAddress={nextAddress}
                    />

                    {!isTail ? (
                      <div className="shrink-0 flex items-center justify-center">
                        <div className="hidden lg:block">
                          <PointerConnectionArrow
                            targetAddress={nextAddress}
                            isReconnecting={currentStep?.status === 'reconnecting' && currentStep?.activeNodeId === node.id}
                            isBypassing={currentStep?.status === 'deleting' && currentStep?.targetNodeId === node.nextId}
                            isHighlighted={isActive}
                            isVertical={false}
                          />
                        </div>
                        <div className="block lg:hidden my-1">
                          <PointerConnectionArrow
                            targetAddress={nextAddress}
                            isReconnecting={currentStep?.status === 'reconnecting' && currentStep?.activeNodeId === node.id}
                            isBypassing={currentStep?.status === 'deleting' && currentStep?.targetNodeId === node.nextId}
                            isHighlighted={isActive}
                            isVertical={true}
                          />
                        </div>
                      </div>
                    ) : (
                      /* TAIL node points to NULL */
                      <div className="shrink-0 flex flex-col items-center justify-center lg:px-2 py-2">
                        <div className="hidden lg:block mb-1">
                          <PointerConnectionArrow
                            targetAddress="NULL"
                            label="next"
                            isVertical={false}
                          />
                        </div>
                        <div className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center font-mono">
                          <span className="text-[10px] text-rose-400 block font-bold">END</span>
                          <span className="text-xs font-bold text-rose-300">NULL</span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

            </div>
          )}
        </div>
      )}

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="bg-slate-900 border border-amber-500/40 rounded-xl p-4 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {selectedNode.conceptualAddress}
                </span>
                <span className="text-sm font-bold text-slate-100">
                  {selectedNode.data}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (Position #{selectedIndex + 1} of {nodes.length})
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {selectedNode.metadata?.description || `A landmark stop in the active route.`}
              </p>
              <div className="mt-2 text-xs font-mono text-slate-400 flex items-center gap-4">
                <span>data: <strong className="text-slate-200">"{selectedNode.data}"</strong></span>
                <span>next: <strong className="text-cyan-400">{getNextAddress(selectedNode.nextId) || 'NULL'}</strong></span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedNodeId(null)}
            className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      )}

    </div>
  );
};
