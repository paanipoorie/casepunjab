import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Code2, Terminal, Info, Copy, Check } from 'lucide-react';

export const CodeVisualizer: React.FC = () => {
  const { currentResult, currentStep } = useAppState();
  const [copied, setCopied] = useState(false);
  const [manualSelectedLine, setManualSelectedLine] = useState<number | null>(null);

  const codeSnippets = currentResult?.codeSnippet || [];
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
    "Select any code line to inspect its pointer mechanics.";

  const handleCopyCode = () => {
    const fullCode = codeSnippets.map(s => s.code).join('\n');
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (codeSnippets.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
        <Code2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-400">Perform an operation above to view synchronized C++ pointer execution.</p>
      </div>
    );
  }

  return (
    <div id="code-panel" className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      
      {/* Code Header Bar */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            C++ Implementation Snippet ({currentResult?.operation.replace('_', ' ')})
          </span>
        </div>

        <button
          onClick={handleCopyCode}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          title="Copy C++ code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Lines Container */}
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
                    ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-semibold shadow-inner'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {/* Line number */}
                <span className={`w-6 text-right select-none text-xs ${
                  isHighlighted ? 'text-amber-400 font-bold' : 'text-slate-600 group-hover:text-slate-400'
                }`}>
                  {line.lineNum}
                </span>

                {/* Code text */}
                <span className="flex-1 whitespace-pre">
                  {line.code}
                </span>

                {/* Arrow indicator for active */}
                {isHighlighted && (
                  <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                    Executing
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Line-by-Line Explanation Box */}
      <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-start gap-3">
        <div className="p-1.5 rounded bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-xs sm:text-sm">
          <div className="font-mono text-[11px] text-amber-400 font-bold mb-0.5">
            Line {activeLine} Explanation:
          </div>
          <div className="text-slate-300 leading-relaxed">
            {activeExplanation}
          </div>
        </div>
      </div>

    </div>
  );
};
