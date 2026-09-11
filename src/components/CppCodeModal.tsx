import React, { useState } from 'react';
import { CPP_IMPLEMENTATION } from '../data/cpp-implementation';
import { 
  Terminal, Copy, Check, Download, X, Code2, 
  Cpu, FileCode, Layers, Info, CheckCircle2 
} from 'lucide-react';

interface CppCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export const CppCodeModal: React.FC<CppCodeModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'full'
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentTab = CPP_IMPLEMENTATION.tabs.find(t => t.id === activeTabId) || CPP_IMPLEMENTATION.tabs[0];

  const handleCopy = (codeToCopy: string) => {
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([CPP_IMPLEMENTATION.fullCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'LinkedList.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  C++ Singly Linked List Implementation
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  C++17 / C++20
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Complete, memory-safe C++ code with dynamic pointers, constructor, and destructor.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-950/40 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          {CPP_IMPLEMENTATION.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTabId === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Explanation Banner */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-amber-300">{currentTab.label}: </span>
            {currentTab.explanation}
          </div>
        </div>

        {/* Code Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#080d1a] font-mono text-xs sm:text-[13px] leading-relaxed select-text">
          <pre className="text-slate-200 whitespace-pre overflow-x-auto">
            <code>{currentTab.code}</code>
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-800 bg-slate-950/90 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Compile locally:</span>
            <code className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono text-[11px]">
              g++ -std=c++17 LinkedList.cpp -o list && ./list
            </code>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(currentTab.code)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Current Tab'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              title="Download LinkedList.cpp file"
            >
              <Download className="w-4 h-4" />
              <span>Download .cpp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
