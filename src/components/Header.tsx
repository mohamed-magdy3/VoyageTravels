import React, { useState, useEffect } from 'react';
import { Compass, Calendar, Globe, Menu, X, ArrowRight, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'my-trips' | 'about';
  setActiveTab: (tab: 'explore' | 'my-trips' | 'about') => void;
  bookingCount: number;
  onOpenQuickBook: () => void;
  theme: 'night' | 'day';
  onToggleTheme: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  bookingCount,
  onOpenQuickBook,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg'
          : 'bg-gradient-to-b from-zinc-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            id="header-logo-container"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="bg-emerald-500 text-black p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Compass id="header-logo-icon" className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-white block">
                VOYAGE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block -mt-1 font-semibold">
                Travel Co.
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            <button
              id="nav-link-explore"
              onClick={() => setActiveTab('explore')}
              className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                activeTab === 'explore'
                  ? 'text-emerald-400 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Explore
              {activeTab === 'explore' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
            <button
              id="nav-link-my-trips"
              onClick={() => setActiveTab('my-trips')}
              className={`text-sm font-medium text-white tracking-wide transition-all duration-200 relative py-1 flex items-center space-x-2 ${
                activeTab === 'my-trips'
                  ? 'text-emerald-400 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>My Passports</span>
              {bookingCount > 0 ? (
                <span className="bg-emerald-500 text-black text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-5 text-center animate-pulse">
                  {bookingCount}
                </span>
              ) : (
                <span className="bg-zinc-800 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded-full">Explore</span>
              )}
              {activeTab === 'my-trips' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
            <button
              id="nav-link-about"
              onClick={() => setActiveTab('about')}
              className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                activeTab === 'about'
                  ? 'text-emerald-400 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Our Vision
              {activeTab === 'about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher Button */}
            <button
              id="header-theme-toggle-desktop"
              onClick={onToggleTheme}
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 text-400 hover:text-emerald-400 transition-all flex items-center space-x-2 cursor-pointer group"
              title={theme === 'night' ? "Switch to Off-White Day Mode" : "Switch to Celestial Night"}
            >
              {theme === 'night' ? (
                <>
                  <Moon className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase text-white font-bold tracking-wider hidden lg:inline-block">Night Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider hidden lg:inline-block">Day Mode</span>
                </>
              )}
            </button>

            <button
              id="header-btn-quick-book"
              onClick={onOpenQuickBook}
              className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center space-x-1.5"
            >
              <span>Instant Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center space-x-2">
            {bookingCount > 0 && (
              <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {bookingCount}
              </span>
            )}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-emerald-400 p-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-zinc-950 border-b border-zinc-800 py-4 px-4 space-y-3 shadow-2xl animate-fade-in"
        >
          <button
            id="mobile-nav-link-explore"
            onClick={() => {
              setActiveTab('explore');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'explore' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-900/50'
            }`}
          >
            Explore Hotspots
          </button>
          <button
            id="mobile-nav-link-my-trips"
            onClick={() => {
              setActiveTab('my-trips');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
              activeTab === 'my-trips' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-900/50'
            }`}
          >
            <span>My Passports & Tickets</span>
            {bookingCount > 0 ? (
              <span className="bg-emerald-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {bookingCount} Active
              </span>
            ) : (
              <span className="bg-zinc-800 text-zinc-500 text-xs px-2 py-0.5 rounded-full">Empty</span>
            )}
          </button>
          <button
            id="mobile-nav-link-about"
            onClick={() => {
              setActiveTab('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'about' ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-300 hover:bg-zinc-900/50'
            }`}
          >
            Our Mission & Vision
          </button>
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between px-3 py-2.5 border-t border-zinc-900 bg-zinc-900/20 rounded-xl">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">Mood Atmosphere</span>
            <button
              id="header-theme-toggle-mobile"
              onClick={onToggleTheme}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold uppercase transition-all flex items-center space-x-1.5 cursor-pointer text-zinc-300 hover:text-emerald-400"
            >
              {theme === 'night' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Celestial Night</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Off-White Day</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-900">
            <button
              id="mobile-nav-btn-quick-book"
              onClick={() => {
                onOpenQuickBook();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-center text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
            >
              Instant Booking Flow
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
