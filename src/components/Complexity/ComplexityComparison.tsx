import React from 'react';
import { COMPLEXITY_TABLE, ARRAY_VS_LINKED_LIST } from '../../data/complexity-data';
import { Clock, HardDrive, Cpu, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ComplexityComparison: React.FC = () => {
  return (
    <section className="py-16 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            <Scale className="w-4 h-4" />
            <span>Algorithmic Tradeoffs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Time & Space Complexity Reference
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Linked lists offer distinct advantages for frequent insertions and deletions, but require linear scans for lookups. Understanding these tradeoffs is essential for real-world software design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Complexity Table */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md overflow-x-auto">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Singly Linked List Operations Complexity
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
                    <td className="py-3 px-3 font-semibold text-slate-200 font-sans">{row.operation}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                        {row.timeComplexity}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
                        {row.spaceComplexity}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-400 font-sans leading-tight">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Linked List vs Array Comparison */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Linked List vs. Array Tradeoffs
            </h3>

            <div className="space-y-3 text-xs">
              {ARRAY_VS_LINKED_LIST.map((item) => (
                <div key={item.feature} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="font-bold text-slate-200 mb-1.5 flex items-center justify-between">
                    <span>{item.feature}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                      <span className="text-amber-400 font-bold block mb-0.5">Linked List</span>
                      {item.linkedList}
                    </div>
                    <div className="p-1.5 rounded bg-slate-900/80 border border-slate-800">
                      <span className="text-cyan-400 font-bold block mb-0.5">Array</span>
                      {item.array}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>Winner: {item.advantage}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Key Takeaway:</strong> A linked list is ideal when you need rapid insertions/deletions at known nodes without shifting data blocks. An array is superior for instant random access by numerical index.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
