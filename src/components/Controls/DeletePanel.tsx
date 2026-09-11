import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Trash2, AlertTriangle, ArrowRight } from 'lucide-react';

export const DeletePanel: React.FC = () => {
  const { scenario, nodes, executeDelete, isAnimating } = useAppState();
  const [targetId, setTargetId] = useState(nodes[0]?.id || '');

  const validTargetId = nodes.some(n => n.id === targetId)
    ? targetId
    : (nodes[0]?.id || '');

  const targetNode = nodes.find(n => n.id === validTargetId);
  const targetIndex = nodes.findIndex(n => n.id === validTargetId);
  const isHead = targetIndex === 0;
  const isTail = targetIndex === nodes.length - 1;
  const predecessor = targetIndex > 0 ? nodes[targetIndex - 1] : null;
  const successor = targetIndex < nodes.length - 1 ? nodes[targetIndex + 1] : null;

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validTargetId) return;
    await executeDelete(validTargetId);
  };

  if (nodes.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center">
        <p className="text-sm text-slate-400">The route is already empty. No nodes to delete.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-rose-400" />
          Delete {scenario.nodeLabel} from the Route
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Unlink a stop by bypassing its node pointer: <code className="text-rose-300 font-mono bg-slate-950 px-1 rounded">current-&gt;next = current-&gt;next-&gt;next;</code>
        </p>
      </div>

      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Select {scenario.nodeLabel} to Remove:
          </label>
          <select
            value={validTargetId}
            onChange={(e) => setTargetId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
          >
            {nodes.map((n, idx) => (
              <option key={n.id} value={n.id}>
                {n.conceptualAddress}: "{n.data}" {idx === 0 ? '(HEAD)' : idx === nodes.length - 1 ? '(TAIL)' : `(stop #${idx + 1})`}
              </option>
            ))}
          </select>
        </div>

        {/* Reconnect Preview */}
        {targetNode && (
          <div className="p-3 rounded-lg bg-slate-950 border border-rose-950/60 font-mono text-xs space-y-1.5">
            <div className="text-slate-400 text-[11px] flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Pointer bypass summary:</span>
            </div>
            {isHead ? (
              <div className="text-rose-300">
                HEAD will advance to <strong className="text-emerald-400">{successor ? successor.data : 'NULL'}</strong>. Old head will be deleted from heap.
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 text-slate-300">
                <span>{predecessor?.data}</span>
                <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                <span className="line-through text-rose-400">{targetNode.data}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">{successor ? successor.data : 'NULL'}</span>
              </div>
            )}
          </div>
        )}

        {/* Delete Submit Button */}
        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!validTargetId || isAnimating}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-98 shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove "{targetNode?.data}"</span>
          </button>
        </div>

      </form>
    </div>
  );
};
