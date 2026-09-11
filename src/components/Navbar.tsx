import React, { useState } from 'react';
import { Link2, Compass, PlayCircle, Code2, BookOpen, Trophy, HelpCircle, Menu, X, Sparkles } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Navbar: React.FC = () => {
  const { scenario, size } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Story', href: '#story', icon: BookOpen },
    { label: 'Playground', href: '#playground', icon: PlayCircle },
    { label: 'Pointers & Code', href: '#code-panel', icon: Code2 },
    { label: 'Scenarios', href: '#scenarios', icon: Compass },
    { label: 'Challenges', href: '#challenges', icon: Trophy },
    { label: 'Quiz', href: '#quiz', icon: HelpCircle },
  ];

  const handleScroll = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-bold">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                LinkedList<span className="text-amber-400">DSA</span>
              </span>
              <span className="hidden sm:inline-block text-xs text-slate-400 font-mono ml-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/60">
                {scenario.title} • {size} nodes
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handleScroll(link.href)}
                  className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Quick Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleScroll('#playground')}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-md shadow-orange-500/10 transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Interactive Tour
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-1 bg-slate-900 border-b border-slate-800 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/80 flex items-center gap-3"
              >
                <Icon className="w-5 h-5 text-amber-400/80" />
                {link.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleScroll('#playground')}
              className="w-full text-center py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Open Interactive Playground
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
