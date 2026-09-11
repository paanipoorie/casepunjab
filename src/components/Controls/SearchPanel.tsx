import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Search, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const SearchPanel: React.FC = () => {
  const { scenario, nodes, executeSearch, currentResult, isAnimating } = useAppState();
  const [query, setQuery] = useState('');

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await executeSearch(query.trim());
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-emerald-400" />
          Search for a {scenario.nodeLabel} (Sequential Linear Scan)
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Starts at HEAD and compares each node's data one-by-one until a match is encountered or NULL is reached. Complexity: <strong className="text-emerald-300 font-mono">O(n)</strong>.
        </p>
      </div>

      {/* Suggested Search Queries */}
      {scenario.searchSuggestions.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Quick Query Examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.searchSuggestions.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSuggestionClick(term)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 transition-all"
              >
                🔍 {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Search Target {scenario.nodeLabel} Name:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder={`e.g. Wagah Border`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
            />
            <button
              type="submit"
              disabled={!query.trim() || isAnimating}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm disabled:opacity-50 transition-all flex items-center gap-1.5 active:scale-98 shadow-sm shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Traverse & Search</span>
            </button>
          </div>
        </div>

        {/* Live Search Stats If Ran */}
        {currentResult?.operation === 'search' && (
          <div className={`p-3 rounded-lg border font-mono text-xs flex items-center justify-between ${
            currentResult.success
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
          }`}>
            <div className="flex items-center gap-2">
              {currentResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span>{currentResult.message}</span>
            </div>
            {currentResult.totalComparisons !== undefined && (
              <span className="text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                {currentResult.totalComparisons} comparison(s)
              </span>
            )}
          </div>
        )}

      </form>
    </div>
  );
};
