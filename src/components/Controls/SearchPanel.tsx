import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Search, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-amber-400" />
          <span>Search for a {scenario.nodeLabel}</span>
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Follows the list sequentially from HEAD to compare each node until found or NULL is reached (O(n)).
        </p>
      </div>

      {/* Suggested Search Queries */}
      {scenario.searchSuggestions.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 font-mono">Suggestions:</span>
          {scenario.searchSuggestions.slice(0, 4).map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSuggestionClick(term)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Search landmark name:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              required
              placeholder={`e.g. Wagah Border`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
            />
            <button
              type="submit"
              disabled={!query.trim() || isAnimating}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 active:scale-98 shadow-sm shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Route</span>
            </button>
          </div>
        </div>

        {/* Live Search Stats If Ran */}
        {currentResult?.operation === 'search' && (
          <div className={`p-3 rounded-lg border font-mono text-xs flex items-center justify-between gap-3 ${
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
              <span className="text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300 shrink-0">
                {currentResult.totalComparisons} comparison{currentResult.totalComparisons === 1 ? '' : 's'}
              </span>
            )}
          </div>
        )}

      </form>
    </div>
  );
};
