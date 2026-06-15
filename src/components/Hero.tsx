import React, { useState, useEffect } from "react";
import {
  Search,
  Compass,
  ShieldCheck,
  Star,
  Sparkles,
  MapPin,
  DollarSign,
} from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onQuickSearch: () => void;
}

const BACKGROUND_SLIDES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop", // Scenic Highway/Canyon
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop", // Coastal Beach sunset
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1920&auto=format&fit=crop", // Wilderness boat lake
];

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  onQuickSearch,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BACKGROUND_SLIDES.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section
      id="hero-banner-section"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Slides */}
      {BACKGROUND_SLIDES.map((url, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-40 scale-100"
              : "opacity-0 scale-105"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <img
            src={url}
            alt="Scenic view background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Elegant Radial Dark Gradients */}
      <div className="absolute inset-0 bg-radial-at-c from-zinc-950/20 via-zinc-950/70 to-zinc-950 z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1.5 rounded-full mb-6 animate-fade-in"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-mono tracking-widest text-emerald-300 uppercase font-semibold">
            The Ultimate Luxury Experience
          </span>
        </div>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-white tracking-tight leading-tight mb-6 max-w-4xl mx-auto text-center"
        >
          Bespoke Journeys for the{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            True Explorer
          </span>
        </h1>

        <p
          id="hero-subtitle"
          className="text-lg text-zinc-300 max-w-2xl mx-auto mb-10 font-sans tracking-wide leading-relaxed"
        >
          Uncover the worlds most sequestered sanctuaries, handpicked with
          six-star accommodations, fully immersive itineraries, and private
          expert hosts.
        </p>

        {/* Dynamic Search Board Panel */}
        <div
          id="hero-search-pannel"
          className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl mx-auto text-left mb-12 hover:border-zinc-700 transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Input Tag Search */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Where to?
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Kyoto, Alps, Safari..."
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Adventure Level Filter */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Adventure Intensity
              </label>
              <select
                id="hero-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="ALL">Any Level</option>
                <option value="Relaxing">Relaxing</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </div>

            {/* Price Cap Slide */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <span className="font-semibold">Max Base Rate</span>
                <span className="text-emerald-400 font-bold">
                  ${maxPrice} USD
                </span>
              </div>
              <div className="flex items-center space-x-2 py-3 bg-zinc-950 border border-zinc-800 rounded-xl px-4">
                <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  id="hero-price-slider"
                  type="range"
                  min="1500"
                  max="4000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Search Submit */}
            <div>
              <button
                id="hero-search-submit-btn"
                onClick={onQuickSearch}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4 text-white" />
                <span className=' text-white'>Search Hotspots</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Trust Badges */}
        <div
          id="hero-trust-badges-grid"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-zinc-400"
        >
          <div className="flex flex-col items-center p-3 bg-zinc-900/30 border border-zinc-900/50 rounded-xl">
            <span className="text-white text-2xl font-bold font-sans tracking-tight block">
              99.8%
            </span>
            <span className="text-zinc-500 text-xs font-mono uppercase">
              Vibe Rating
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-zinc-900/30 border border-zinc-900/50 rounded-xl">
            <span className="text-white text-2xl font-bold font-sans tracking-tight block">
              45k+
            </span>
            <span className="text-zinc-500 text-xs font-mono uppercase">
              Explorers Booked
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-zinc-900/30 border border-zinc-900/50 rounded-xl">
            <span className="text-white text-2xl font-bold font-sans tracking-tight block">
              24/7
            </span>
            <span className="text-zinc-500 text-xs font-mono uppercase">
              VIP Concierge
            </span>
          </div>
          <div className="flex flex-col items-center p-3 bg-zinc-900/30 border border-zinc-900/50 rounded-xl">
            <span className="text-white text-2xl font-bold font-sans tracking-tight block">
              Carbon
            </span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase font-semibold">
              100% Offset
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
