import React, { useState } from 'react';
import { Route, Play, BookOpen, Compass, Trophy, Menu, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Navbar: React.FC = () => {
  const { scenario } = useAppState();
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

          {/* Quick Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleScroll('#playground')}
              className="px-4 py-1.5 text-sm font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Try Playground</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
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
          <div className="pt-2">
            <button
              onClick={() => handleScroll('#playground')}
              className="w-full text-center py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400"
            >
              Try Playground
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
