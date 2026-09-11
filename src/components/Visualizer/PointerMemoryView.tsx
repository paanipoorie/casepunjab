import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Binary, ArrowRight, CornerDownRight, Cpu, Layers } from 'lucide-react';

export const PointerMemoryView: React.FC = () => {
  const { nodes, currentStep, selectedNodeId, setSelectedNodeId } = useAppState();

  const getNodeAddress = (id: string | null) => {
    if (!id) return 'NULL';
    const found = nodes.find(n => n.id === id);
    return found ? found.conceptualAddress : 'NULL';
  };

  return (
    <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-5 shadow-md">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
            Conceptual Memory Heap Layout
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          HEAD Pointer ➔ <span className="text-amber-400 font-bold">{nodes[0]?.conceptualAddress || 'NULL'}</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-max">
          
          {/* HEAD Pointer Box */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] font-mono text-amber-400 font-bold">POINTER</span>
            <span className="text-sm font-extrabold text-amber-300 font-mono">HEAD</span>
            <span className="text-xs font-mono text-slate-300 mt-1">
              ➔ {nodes[0]?.conceptualAddress || 'nullptr'}
            </span>
          </div>

          <ArrowRight className="w-5 h-5 text-amber-400 hidden sm:block shrink-0" />
          <CornerDownRight className="w-5 h-5 text-amber-400 sm:hidden self-center" />

          {/* Node Memory Cells */}
          {nodes.map((node, index) => {
            const isHead = index === 0;
            const isTail = index === nodes.length - 1;
            const isActive = currentStep?.activeNodeId === node.id;
            const isTarget = currentStep?.targetNodeId === node.id;
            const isSuccessor = currentStep?.affectedNextNodeId === node.id;
            const nextAddr = getNodeAddress(node.nextId);

            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`cursor-pointer rounded-lg border font-mono transition-all text-xs select-none ${
                    isActive
                      ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-400 shadow-md'
                      : isTarget
                      ? 'border-rose-500 bg-rose-950/40 ring-2 ring-rose-400'
                      : isSuccessor
                      ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  {/* Address Label */}
                  <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 flex items-center justify-between gap-2">
                    <span className="text-amber-400 font-bold">{node.conceptualAddress}</span>
                    <span>{isHead ? 'HEAD' : isTail ? 'TAIL' : `[${index}]`}</span>
                  </div>

                  {/* Struct Payload & Next Fields */}
                  <div className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400">struct.data:</span>
                      <span className="text-slate-200 font-bold truncate max-w-[120px]">
                        "{node.data}"
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-slate-400">struct.next:</span>
                      <span className={`font-bold ${node.nextId ? 'text-cyan-400' : 'text-rose-400'}`}>
                        {nextAddr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow between cells */}
                {!isTail ? (
                  <>
                    <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />
                    <CornerDownRight className="w-4 h-4 text-slate-600 sm:hidden self-center" />
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 font-mono text-xs text-rose-400 font-bold flex items-center justify-center">
                      NULL (0x0)
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}

        </div>
      </div>
      
      <p className="mt-3 text-[11px] font-mono text-slate-400">
        💡 Note: Node identifiers (e.g. Node #01) represent conceptual memory addresses in heap storage. Each node holds its data and the reference pointer pointing directly to the subsequent node.
      </p>

    </div>
  );
};
