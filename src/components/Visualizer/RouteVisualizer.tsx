import React, { useRef, useMemo } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { LinkedListNodeCard } from './LinkedListNodeCard';
import { PointerConnectionArrow } from './PointerConnectionArrow';
import { PointerMemoryView } from './PointerMemoryView';
import { StepStatusBanner } from './StepStatusBanner';
import { NodeData } from '../../types/linked-list';
import { 
  Eye, Cpu, ArrowRight, MapPin, AlertCircle, RefreshCw, X, Code2, Sparkles, Play, Compass 
} from 'lucide-react';

export const RouteVisualizer: React.FC = () => {
  const { 
    scenario, 
    nodes, 
    selectedNodeId, 
    setSelectedNodeId, 
    viewMode, 
    setViewMode, 
    currentResult,
    currentStepIndex,
    currentStep,
    executeReset,
    executeTraverse,
    isAnimating,
    openCppModal,
    activeOperation
  } = useAppState();

  const containerRef = useRef<HTMLDivElement>(null);

  // Compute the live nodes to display according to the active animation step
  const displayNodes = useMemo<NodeData[]>(() => {
    if (!currentResult || !currentStep) return nodes;

    const totalSteps = currentResult.steps.length;
    const isFinished = currentStepIndex === totalSteps - 1 || currentStep.status === 'complete';

    if (isFinished) {
      return currentResult.afterState;
    }

    const op = currentResult.operation;

    // During Insert After
    if (op === 'insert_after') {
      const targetId = currentStep.activeNodeId || currentStep.targetNodeId;
      const baseNodes = currentResult.beforeState;
      
      if (currentStep.newNodeData) {
        const result: NodeData[] = [];
        for (const n of baseNodes) {
          result.push(n);
          if (n.id === targetId || n.data.toLowerCase() === String(targetId).toLowerCase()) {
            result.push(currentStep.newNodeData);
          }
        }
        return result.length > baseNodes.length ? result : [...baseNodes, currentStep.newNodeData];
      }
      return baseNodes;
    }

    // During Add Beginning
    if (op === 'add_beginning') {
      if (currentStep.newNodeData) {
        return [currentStep.newNodeData, ...currentResult.beforeState];
      }
      return currentResult.beforeState;
    }

    // During Add End
    if (op === 'add_end') {
      if (currentStep.newNodeData && (currentStep.status === 'inserting' || currentStep.status === 'reconnecting')) {
        return [...currentResult.beforeState, currentStep.newNodeData];
      }
      return currentResult.beforeState;
    }

    // During Delete: keep target node visible in beforeState so the user can see it unlinking!
    if (op === 'delete') {
      return currentResult.beforeState;
    }

    // Search and Traverse: use beforeState
    return currentResult.beforeState.length > 0 ? currentResult.beforeState : nodes;
  }, [currentResult, currentStep, currentStepIndex, nodes]);

  const getNextAddress = (nextId: string | null) => {
    if (!nextId) return null;
    const found = displayNodes.find(n => n.id === nextId);
    return found ? found.conceptualAddress : null;
  };

  const selectedNode = displayNodes.find(n => n.id === selectedNodeId);
  const selectedIndex = displayNodes.findIndex(n => n.id === selectedNodeId);

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
            {displayNodes.length} {displayNodes.length === 1 ? 'node' : 'nodes'}
          </span>
        </div>

        {/* Action Controls: Primary Run Button + View Switcher + C++ Code Button */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Prominent Run / Start Visualizer Button */}
          <button
            onClick={() => executeTraverse()}
            disabled={displayNodes.length === 0}
            className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            title="Start animated traversal from HEAD to NULL"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isAnimating ? 'Restart Animation' : '▶ Run Visualizer'}</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('route')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                viewMode === 'route'
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-500/30'
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
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Pointer View</span>
            </button>
          </div>

          {/* C++ Code Button */}
          <button
            onClick={() => {
              const tabMap: Record<string, string> = {
                add_end: 'insert',
                add_beginning: 'insert',
                insert_after: 'insert',
                delete: 'delete',
                search: 'search_traverse',
                traverse: 'search_traverse',
              };
              openCppModal(activeOperation ? tabMap[activeOperation] || 'full' : 'full');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm group"
            title="View complete C++ implementation"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>&lt;/&gt; C++ Implementation</span>
          </button>

        </div>

      </div>

      {/* Step Status & Animation Playback Banner */}
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
          {displayNodes.length === 0 ? (
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
              {displayNodes.map((node, index) => {
                const isHead = index === 0;
                const isTail = index === displayNodes.length - 1;
                const isSelected = selectedNodeId === node.id;
                const isActive = currentStep?.activeNodeId === node.id;
                const isFound = currentStep?.status === 'found' && currentStep?.activeNodeId === node.id;
                const isTarget = currentStep?.targetNodeId === node.id;
                const isSuccessor = currentStep?.affectedNextNodeId === node.id;
                const isVisited = currentStep?.visitedNodeIds?.includes(node.id) || false;
                const isNewNode = currentStep?.newNodeData?.id === node.id;
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
                      isNewNode={isNewNode}
                      isVisited={isVisited}
                      onSelect={(id) => setSelectedNodeId(id === selectedNodeId ? null : id)}
                      nextConceptualAddress={nextAddress}
                    />

                    {/* Arrow between nodes */}
                    {!isTail ? (
                      <PointerConnectionArrow
                        isReconnecting={currentStep?.status === 'reconnecting' && (isActive || isNewNode)}
                        isBypassing={currentStep?.status === 'deleting' && isTarget}
                        isHighlighted={isActive || isVisited}
                        label="next"
                      />
                    ) : (
                      /* NULL Terminator after Tail */
                      <div className="flex items-center gap-2 pl-1 shrink-0">
                        <PointerConnectionArrow label="next" />
                        <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 font-mono text-xs font-bold text-rose-400">
                          NULL
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
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/40">
              #{selectedIndex + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-sm">
                  {selectedNode.data}
                </span>
                <span className="font-mono text-[10px] text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  {selectedNode.conceptualAddress}
                </span>
              </div>
              <p className="text-slate-400 text-xs mt-0.5">
                Points to: <span className="font-mono text-cyan-400 font-bold">{getNextAddress(selectedNode.nextId) || 'NULL'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedNodeId(null)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
