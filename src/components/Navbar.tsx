import React, { useState } from 'react';
import { Route, Play, BookOpen, Compass, Trophy, Menu, X, Code2 } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Navbar: React.FC = () => {
  const { openCppModal, executeTraverse } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tour', href: '#tour' },
    { label: 'Playground', href: '#playground' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Scenarios', href: '#scenarios' },
    { label: 'Challenges', href: '#challenges' },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunVisualizer = () => {
    setMobileMenuOpen(false);
    const element = document.querySelector('#playground');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      executeTraverse();
    }, 400);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold shadow-sm">
              <Route className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider text-slate-100 uppercase">
                CASE<span className="text-amber-400">PUNJAB</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* C++ Code Modal Trigger */}
            <button
              onClick={() => openCppModal('full')}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 transition-colors shadow-sm flex items-center gap-1.5"
              title="Open C++ Singly Linked List Implementation"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>&lt;/&gt; C++ Code</span>
            </button>

            {/* Run Visualizer Button */}
            <button
              onClick={handleRunVisualizer}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Visualizer</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => openCppModal('full')}
              className="p-2 rounded-lg text-amber-400 bg-slate-900 border border-slate-800 focus:outline-none"
              title="C++ Code"
              aria-label="View C++ Code"
            >
              <Code2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-slate-900 border-b border-slate-800">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleScroll(link.href)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/80"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleRunVisualizer}
              className="w-full text-center py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Visualizer</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCppModal('full');
              }}
              className="w-full text-center py-2 rounded-lg bg-slate-950 text-amber-300 font-bold text-xs border border-amber-500/40 hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>View C++ Implementation</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
