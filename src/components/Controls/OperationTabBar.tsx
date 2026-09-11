import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { AddPanel } from './AddPanel';
import { InsertPanel } from './InsertPanel';
import { DeletePanel } from './DeletePanel';
import { SearchPanel } from './SearchPanel';
import { TraversePanel } from './TraversePanel';
import { 
  Plus, GitCommit, Trash2, Search, Compass, RefreshCw, 
  ChevronRight, Sparkles 
} from 'lucide-react';

export const OperationTabBar: React.FC = () => {
  const { activeOperation, setActiveOperation, executeReset, isAnimating, scenario } = useAppState();
  const [activeTab, setActiveTab] = useState<'add' | 'insert' | 'delete' | 'search' | 'traverse'>('add');

  const tabs = [
    { id: 'add', label: 'Add Stop', icon: Plus, badge: 'Tail/Head' },
    { id: 'insert', label: 'Insert After', icon: GitCommit, badge: 'Middle' },
    { id: 'delete', label: 'Delete Stop', icon: Trash2, badge: 'Unlink' },
    { id: 'search', label: 'Search', icon: Search, badge: 'O(n)' },
    { id: 'traverse', label: 'Traverse', icon: Compass, badge: 'All' },
  ] as const;

  return (
    <div id="operations" className="mt-8 space-y-4">
      
      {/* Tab Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
        
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveOperation(
                    tab.id === 'add' ? 'add_end' :
                    tab.id === 'insert' ? 'insert_after' :
                    tab.id === 'delete' ? 'delete' :
                    tab.id === 'search' ? 'search' : 'traverse'
                  );
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 sm:gap-2 border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                <span className={`hidden md:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-slate-950/20 text-slate-900' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Reset Initial Route Button */}
        <div>
          <button
            onClick={executeReset}
            disabled={isAnimating}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/30 transition-all flex items-center gap-1.5 disabled:opacity-50"
            title="Reset to default initial route"
          >
            <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
            <span>Reset {scenario.nodeLabel}s</span>
          </button>
        </div>

      </div>

      {/* Active Operation Form Panel */}
      <div className="transition-all duration-300">
        {activeTab === 'add' && <AddPanel />}
        {activeTab === 'insert' && <InsertPanel />}
        {activeTab === 'delete' && <DeletePanel />}
        {activeTab === 'search' && <SearchPanel />}
        {activeTab === 'traverse' && <TraversePanel />}
      </div>

    </div>
  );
};
