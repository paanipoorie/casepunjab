import React, { useState } from 'react';
import { COMPLEXITY_TABLE, ARRAY_VS_LINKED_LIST } from '../../data/complexity-data';
import { Clock, Cpu, Scale, ChevronDown, ChevronUp } from 'lucide-react';

export const ComplexityComparison: React.FC = () => {
  const [showFullTable, setShowFullTable] = useState(false);

  const keyOperations = [
    {
      name: "Access by Index",
      complexity: "O(n)",
      why: "Must traverse from HEAD node-by-node. No direct indexing."
    },
    {
      name: "Insert at Head",
      complexity: "O(1)",
      why: "Requires only updating the HEAD pointer to the new node."
    },
    {
      name: "Insert After Known Node",
      complexity: "O(1)",
      why: "Rewire 2 pointers (newNode->next and current->next). No shifting."
    },
    {
      name: "Search by Value",
      complexity: "O(n)",
      why: "May have to visit every node in the sequence before finding the match."
    },
  ];

  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
            Complexity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Algorithmic Tradeoffs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Linked lists trade instant index access for constant-time insertions and deletions without memory reallocation.
          </p>
        </div>

        {/* Key Operations Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {keyOperations.map((op) => (
            <div key={op.name} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-400 mb-1">
                  {op.complexity}
                </div>
                <h3 className="font-bold text-sm text-slate-100 mb-2">
                  {op.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                {op.why}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle Full Comparison Table */}
        <div className="mb-8">
          <button
            onClick={() => setShowFullTable(!showFullTable)}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <span>{showFullTable ? 'Hide Complete Complexity Table' : 'Compare All Operations Table'}</span>
            {showFullTable ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expandable Full Table */}
        {showFullTable && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 mb-8 overflow-x-auto animate-fadeIn">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Complete Singly Linked List Complexity</span>
            </h3>

            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 pb-2">
                  <th className="py-2.5 px-3">Operation</th>
                  <th className="py-2.5 px-3 text-cyan-400">Time</th>
                  <th className="py-2.5 px-3 text-emerald-400">Space</th>
                  <th className="py-2.5 px-3">Condition / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {COMPLEXITY_TABLE.map((row) => (
                  <tr key={row.operation} className="hover:bg-slate-950/60 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-200 font-sans">{row.operation}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                        {row.timeComplexity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        {row.spaceComplexity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-400 font-sans leading-tight">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Linked List vs Array Comparison */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>Linked List vs. Array Summary</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {ARRAY_VS_LINKED_LIST.map((item) => (
              <div key={item.feature} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                <div className="font-bold text-slate-200 mb-2">
                  {item.feature}
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-400">
                  <div>
                    <span className="text-amber-400 font-semibold font-mono">List: </span>
                    {item.linkedList}
                  </div>
                  <div>
                    <span className="text-cyan-400 font-semibold font-mono">Array: </span>
                    {item.array}
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400">
                  Advantage: {item.advantage}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
