import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { ArrowRight, CornerDownRight, Cpu } from 'lucide-react';

export const PointerMemoryView: React.FC = () => {
  const { nodes, currentStep, selectedNodeId, setSelectedNodeId } = useAppState();

  const getNodeAddress = (id: string | null) => {
    if (!id) return 'NULL';
    const found = nodes.find(n => n.id === id);
    return found ? found.conceptualAddress : 'NULL';
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-sm">
      
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>Pointer &amp; Address View</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Nodes live at distinct locations. Each node explicitly stores the pointer to the next node.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          HEAD ➔ <span className="text-amber-400 font-bold">{nodes[0]?.conceptualAddress || 'NULL'}</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-max">
          
          {/* HEAD Pointer Box */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col justify-center items-center text-center font-mono">
            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">ENTRY POINTER</span>
            <span className="text-sm font-extrabold text-amber-300">HEAD</span>
            <span className="text-xs text-slate-300 mt-1">
              ➔ {nodes[0]?.conceptualAddress || 'NULL'}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-amber-400 hidden sm:block shrink-0" />
          <CornerDownRight className="w-4 h-4 text-amber-400 sm:hidden self-center" />

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
                  className={`cursor-pointer rounded-xl border font-mono transition-all text-xs select-none w-48 ${
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
                  <div className="px-3 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                    <span className="text-amber-400 font-bold">{node.conceptualAddress}</span>
                    <span className="text-[10px] text-slate-500">{isHead ? 'HEAD' : isTail ? 'TAIL' : `pos #${index + 1}`}</span>
                  </div>

                  {/* Struct Payload & Next Fields */}
                  <div className="p-3 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">data:</span>
                      <span className="text-slate-100 font-semibold truncate max-w-[100px]" title={node.data}>
                        "{node.data}"
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">next:</span>
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
                    <div className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 font-mono text-xs text-rose-300 font-bold flex items-center justify-center">
                      NULL
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}

        </div>
      </div>
      
      <p className="mt-2 text-xs text-slate-400">
        Unlike arrays where items must sit side-by-side in continuous memory slots, each node can be located anywhere because it carries its successor's address in its <code className="text-cyan-400 font-mono">next</code> field.
      </p>

    </div>
  );
};
