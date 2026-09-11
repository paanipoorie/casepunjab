import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { AddPanel } from './AddPanel';
import { InsertPanel } from './InsertPanel';
import { DeletePanel } from './DeletePanel';
import { SearchPanel } from './SearchPanel';
import { TraversePanel } from './TraversePanel';
import { Plus, CornerDownRight, Trash2, Search, Compass, RefreshCw } from 'lucide-react';

export const OperationTabBar: React.FC = () => {
  const { activeOperation, setActiveOperation, executeReset, isAnimating, scenario } = useAppState();
  const [activeTab, setActiveTab] = useState<'add' | 'insert' | 'delete' | 'search' | 'traverse'>('add');

  const tabs = [
    { id: 'add', label: 'Add', icon: Plus },
    { id: 'insert', label: 'Insert', icon: CornerDownRight },
    { id: 'delete', label: 'Delete', icon: Trash2 },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'traverse', label: 'Traverse', icon: Compass },
  ] as const;

  return (
    <div id="operations" className="mt-8 space-y-4">
      
      {/* What do you want to do Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-slate-200">
            What do you want to do?
          </h3>
          <p className="text-xs text-slate-400">
            Select an operation to manipulate the linked list.
          </p>
        </div>

        {/* Reset Tour Button */}
        <button
          onClick={executeReset}
          disabled={isAnimating}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5 disabled:opacity-50"
          title="Reset to default initial route"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset {scenario.nodeLabel}s</span>
        </button>
      </div>

      {/* Operation Selection Buttons */}
      <div className="flex flex-wrap items-center gap-2">
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Operation Form Panel */}
      <div className="mt-4">
        {activeTab === 'add' && <AddPanel />}
        {activeTab === 'insert' && <InsertPanel />}
        {activeTab === 'delete' && <DeletePanel />}
        {activeTab === 'search' && <SearchPanel />}
        {activeTab === 'traverse' && <TraversePanel />}
      </div>

    </div>
  );
};
