import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { CODE_SNIPPETS } from '../../lib/code-snippets';
import { Terminal, Copy, Check, Code2, ExternalLink } from 'lucide-react';

export const CodeVisualizer: React.FC = () => {
  const { currentResult, currentStep, openCppModal, activeOperation } = useAppState();
  const [copied, setCopied] = useState(false);
  const [manualSelectedLine, setManualSelectedLine] = useState<number | null>(null);

  // If no operation has been run yet, default to add_end snippet
  const codeSnippets = (currentResult?.codeSnippet && currentResult.codeSnippet.length > 0)
    ? currentResult.codeSnippet
    : CODE_SNIPPETS.add_end;

  const activeLine = manualSelectedLine !== null 
    ? manualSelectedLine 
    : (currentStep?.highlightedCodeLine || 1);

  // Sync selected line when step changes
  useEffect(() => {
    if (currentStep?.highlightedCodeLine) {
      setManualSelectedLine(currentStep.highlightedCodeLine);
    }
  }, [currentStep?.highlightedCodeLine]);

  const activeExplanation = codeSnippets.find(s => s.lineNum === activeLine)?.explanation || 
    codeSnippets[0]?.explanation || 
    "Select any line of code to inspect its pointer mechanics.";

  const handleCopyCode = () => {
    const fullCode = codeSnippets.map(s => s.code).join('\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="code-panel" className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      
      {/* Code Header Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            C++ Pointer Execution
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
            {activeOperation ? activeOperation.replace('_', ' ') : 'default snippet'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Full C++ Implementation Button */}
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
            className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-amber-500/30 transition-colors"
            title="Open full C++ class implementation modal"
          >
            <Code2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Full C++ Class</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Lines */}
      <div className="p-4 bg-[#0a0f1d] font-mono text-xs sm:text-sm overflow-x-auto">
        <div className="space-y-1">
          {codeSnippets.map((line) => {
            const isHighlighted = line.lineNum === activeLine;

            return (
              <div
                key={line.lineNum}
                onClick={() => setManualSelectedLine(line.lineNum)}
                role="button"
                tabIndex={0}
                className={`group flex items-start gap-3 py-1.5 px-3 rounded-md cursor-pointer transition-all ${
                  isHighlighted
                    ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {/* Line number */}
                <span className={`w-5 text-right select-none text-xs ${
                  isHighlighted ? 'text-amber-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                }`}>
                  {line.lineNum}
                </span>

                {/* Code text */}
                <span className="flex-1 whitespace-pre">
                  {line.code}
                </span>

                {isHighlighted && (
                  <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Line Pointer Explanation */}
      <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-300">
        <div className="flex items-start gap-2">
          <span className="font-mono text-amber-400 font-bold shrink-0">
            Line {activeLine}:
          </span>
          <p className="leading-relaxed">
            {activeExplanation}
          </p>
        </div>
      </div>

    </div>
  );
};
