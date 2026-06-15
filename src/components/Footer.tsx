import React, { useState } from 'react';
import { Compass, Mail, Github, Send, Sparkles, Smile } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'explore' | 'my-trips' | 'about') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [emailValue, setEmailValue] = useState('');
  const [newsSigned, setNewsSigned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim() !== '') {
      setNewsSigned(true);
      setEmailValue('');
    }
  };

  return (
    <footer id="global-app-footer" className="bg-zinc-950 border-t border-zinc-900 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-emerald-500 text-black p-2 rounded-xl">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold font-sans tracking-tight text-white block">VOYAGE</span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block -mt-1 font-semibold">Travel Co.</span>
              </div>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm font-sans">
              Deploying six-star, traceless luxury travel itineraries across Earth's most precious biosphere sanctuaries since 2012. Member of the Sustainable Wilds Alliance.
            </p>
          </div>

          {/* Quick links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold">Portal Navigation</h4>
            <div className="flex flex-col space-y-2 text-xs text-zinc-500 font-medium">
              <button onClick={() => onNavigate('explore')} className="hover:text-emerald-400 text-left transition-colors cursor-pointer">Explore Hotspots</button>
              <button onClick={() => onNavigate('my-trips')} className="hover:text-emerald-400 text-left transition-colors cursor-pointer">Live Boarding Passes </button>
              <button onClick={() => onNavigate('about')} className="hover:text-emerald-400 text-left transition-colors cursor-pointer">Preservation Creed</button>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-zinc-400 text-xs font-mono uppercase tracking-widest font-bold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              <span>THE VOYAGE CHRONICLES</span>
            </h4>
            <p className="text-zinc-500 text-xs leading-relaxed">
              Unlock early-access to newly secured seasonal travel coordinates and polar expedition windows. No spam. Only absolute wonders.
            </p>

            {newsSigned ? (
              <div id="newsletter-success" className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-center text-xs font-semibold animate-fade-in flex items-center justify-center space-x-1.5">
                <Smile className="w-4 h-4" />
                <span>You are in, welcome to the Inner Council!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="newsletter-form" className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="explorer@sanctuary.com"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-zinc-600 outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="bg-emerald-500 hover:bg-emerald-400 text-black p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Legal and fine print copy */}
        <div className="pt-8 flex flex-col md:flex-row justify-between text-white items-center text-[10px] gap-4">
          <div>
            &copy; 2026 Voyage Travels Co. All rights reserved. Registered under the Global Sustainable Tourism Council (GSTC) framework ID: 4097-9E90.
          </div>
          <div className="flex space-x-4">
            <span className="hover:text-zinc-400 transition-colors pointer-events-none">Carbon Negative Certification</span>
            <span>&bull;</span>
            <span className="hover:text-zinc-400 transition-colors pointer-events-none">Terms of Wild Passage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
