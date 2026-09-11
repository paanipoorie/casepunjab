import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { CHALLENGES } from '../../data/challenges';
import { OperationType } from '../../types/linked-list';
import { 
  Trophy, CheckCircle2, XCircle, ArrowRight, Lightbulb, 
  Sparkles, Play, RotateCcw, HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChallengeMode: React.FC = () => {
  const { 
    nodes, 
    executeAddEnd, 
    executeAddBeginning, 
    executeInsertAfter, 
    executeDelete, 
    executeSearch, 
    switchScenario,
    scenarioId
  } = useAppState();

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOp, setSelectedOp] = useState<OperationType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string>('');
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [showHint, setShowHint] = useState(false);
  const [resultState, setResultState] = useState<'idle' | 'success' | 'incorrect'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const currentChallenge = CHALLENGES[currentChallengeIndex] || CHALLENGES[0];

  const handleSelectChallenge = (index: number) => {
    setCurrentChallengeIndex(index);
    setSelectedOp(null);
    setSelectedTarget('');
    setEnteredValue('');
    setShowHint(false);
    setResultState('idle');
    setFeedbackMessage('');
    if (scenarioId !== 'punjab') {
      switchScenario('punjab');
    }
  };

  const handleValidateAndExecute = async () => {
    if (!selectedOp) return;

    // Check operation correctness
    if (selectedOp !== currentChallenge.expectedOperation) {
      setResultState('incorrect');
      setFeedbackMessage(`Incorrect operation. For this problem, you need "${currentChallenge.expectedOperation.replace('_', ' ')}", not "${selectedOp.replace('_', ' ')}".`);
      return;
    }

    // Check target if required
    if (currentChallenge.expectedTarget) {
      const targetMatch = selectedTarget.trim().toLowerCase() === currentChallenge.expectedTarget.toLowerCase();
      if (!targetMatch) {
        setResultState('incorrect');
        setFeedbackMessage(`Incorrect target landmark. Expected "${currentChallenge.expectedTarget}", but got "${selectedTarget}".`);
        return;
      }
    }

    // Check new value if required
    if (currentChallenge.expectedNewValue) {
      const valueMatch = enteredValue.trim().toLowerCase() === currentChallenge.expectedNewValue.toLowerCase();
      if (!valueMatch) {
        setResultState('incorrect');
        setFeedbackMessage(`Destination name mismatch. Expected "${currentChallenge.expectedNewValue}", but got "${enteredValue}".`);
        return;
      }
    }

    // Correct! Execute the operation on live state
    setResultState('success');
    setFeedbackMessage(`Spot on! ${currentChallenge.explanation}`);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Execute on live linked list state
    if (selectedOp === 'add_end') {
      await executeAddEnd(currentChallenge.expectedNewValue || 'Gobindgarh Fort');
    } else if (selectedOp === 'insert_after') {
      await executeInsertAfter(
        currentChallenge.expectedTarget || 'Golden Temple',
        currentChallenge.expectedNewValue || 'Durgiana Temple'
      );
    } else if (selectedOp === 'delete') {
      await executeDelete(currentChallenge.expectedTarget || 'Partition Museum');
    } else if (selectedOp === 'search') {
      await executeSearch(currentChallenge.expectedTarget || 'Wagah Border');
    }

    // Scroll back to visualizer to view execution
    const el = document.getElementById('playground-visualizer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="challenges" className="py-16 bg-[#090d16] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Trophy className="w-4 h-4" />
            <span>Interactive Challenges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Solve Tim's Travel Dilemmas
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Apply your linked-list intuition to real scenarios. Select the appropriate pointer operation and watch the application update in real time.
          </p>
        </div>

        {/* Challenge Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Challenge Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono font-bold uppercase text-slate-400 px-1 mb-2">
              Select Challenge ({CHALLENGES.length}):
            </div>
            {CHALLENGES.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  currentChallengeIndex === idx
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-500 font-bold">
                    CHALLENGE #{idx + 1}
                  </div>
                  <div className="text-sm font-bold text-slate-100 mt-0.5">
                    {ch.title}
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 mt-1 ${
                  currentChallengeIndex === idx ? 'text-amber-400' : 'text-slate-600'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Column: Active Interactive Challenge Panel */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800 mb-6">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                Challenge #{currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-800/60 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
              </button>
            </div>

            {/* Prompt Card */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                {currentChallenge.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                "{currentChallenge.prompt}"
              </p>
            </div>

            {/* Hint Box */}
            {showHint && (
              <div className="mb-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300">Hint:</strong> {currentChallenge.hint}
                </div>
              </div>
            )}

            {/* Step 1: Choose Operation */}
            <div className="space-y-4 mb-6">
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                1. Which linked-list operation should you perform?
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'add_end' as OperationType, label: 'Add at End' },
                  { id: 'insert_after' as OperationType, label: 'Insert After' },
                  { id: 'delete' as OperationType, label: 'Delete Stop' },
                  { id: 'search' as OperationType, label: 'Search Stop' }
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setSelectedOp(op.id)}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedOp === op.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target & Value Configuration Form */}
            {selectedOp && (
              <div className="space-y-4 mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  2. Configure Parameters for {selectedOp.replace('_', ' ')}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedOp === 'insert_after' || selectedOp === 'delete' || selectedOp === 'search') && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        {selectedOp === 'insert_after' ? 'Insert after which landmark?' :
                         selectedOp === 'delete' ? 'Landmark to delete:' : 'Landmark to search:'}
                      </label>
                      <select
                        value={selectedTarget}
                        onChange={(e) => setSelectedTarget(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 font-mono"
                      >
                        <option value="">-- Choose landmark --</option>
                        {nodes.map((n) => (
                          <option key={n.id} value={n.data}>{n.data}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {(selectedOp === 'add_end' || selectedOp === 'insert_after') && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">
                        New destination landmark name:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gobindgarh Fort"
                        value={enteredValue}
                        onChange={(e) => setEnteredValue(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Feedback Message */}
            {resultState !== 'idle' && (
              <div className={`p-4 rounded-xl border text-sm mb-6 flex items-start gap-3 ${
                resultState === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
              }`}>
                {resultState === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-sm mb-0.5">
                    {resultState === 'success' ? 'Challenge Solved!' : 'Try Again'}
                  </div>
                  <p className="text-xs leading-relaxed">{feedbackMessage}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedOp(null);
                  setSelectedTarget('');
                  setEnteredValue('');
                  setResultState('idle');
                }}
                className="text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                Clear Selections
              </button>

              <button
                type="button"
                onClick={handleValidateAndExecute}
                disabled={!selectedOp}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 transition-all flex items-center gap-2 shadow-md active:scale-98"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Submit & Execute on Route</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
