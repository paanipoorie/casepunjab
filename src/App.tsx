import React from 'react';
import { AppStateProvider } from './context/AppStateContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorySection } from './components/StorySection';
import { RouteVisualizer } from './components/Visualizer/RouteVisualizer';
import { OperationTabBar } from './components/Controls/OperationTabBar';
import { OperationExplanation } from './components/Explanations/OperationExplanation';
import { CodeVisualizer } from './components/Explanations/CodeVisualizer';
import { OperationHistoryTimeline } from './components/History/OperationHistoryTimeline';
import { ScenarioSwitcher } from './components/Scenarios/ScenarioSwitcher';
import { ChallengeMode } from './components/Challenges/ChallengeMode';
import { ComplexityComparison } from './components/Complexity/ComplexityComparison';
import { QuizSection } from './components/Quiz/QuizSection';
import { Footer } from './components/Footer';
import { Compass, Sparkles, Code2, History, Layers } from 'lucide-react';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Story Section */}
        <StorySection />

        {/* 3. Primary Linked List Playground */}
        <section id="playground" className="py-16 lg:py-20 bg-[#0c111e] border-b border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Compass className="w-4 h-4" />
                <span>Interactive Learning Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
                The Linked List Playground
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Directly manipulate the nodes below. Add landmarks, splice detours into the middle, bypass closed attractions, and watch pointers rewire in real time.
              </p>
            </div>

            {/* Main Visualizer Area */}
            <RouteVisualizer />

            {/* Operation Controls Tabs */}
            <OperationTabBar />

            {/* Explanations, Code, and History 2-Column Grid */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Operation Breakdown & History */}
              <div className="lg:col-span-6 space-y-8">
                <OperationExplanation />
                <OperationHistoryTimeline />
              </div>

              {/* Right Column: Code Visualizer */}
              <div className="lg:col-span-6 space-y-8">
                <CodeVisualizer />
              </div>

            </div>

          </div>
        </section>

        {/* 4. Scenario Switcher (Music, Train, Browser) */}
        <ScenarioSwitcher />

        {/* 5. Challenge Mode */}
        <ChallengeMode />

        {/* 6. Algorithmic Complexity Reference */}
        <ComplexityComparison />

        {/* 7. Quiz & Conceptual Check */}
        <QuizSection />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
};

export default App;
