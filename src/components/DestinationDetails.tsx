import React, { useState } from 'react';
import { X, Calendar, Star, MapPin, Compass, Shield, ArrowRight, Sparkles, Smile, SunDim, ShieldCheck } from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailsProps {
  destination: Destination;
  onClose: () => void;
  onBook: (destination: Destination) => void;
}

export default function DestinationDetails({ destination, onClose, onBook }: DestinationDetailsProps) {
  const [activeImage, setActiveImage] = useState(destination.heroImage);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    if (expandedDay === day) {
      setExpandedDay(null);
    } else {
      setExpandedDay(day);
    }
  };

  return (
    <div
      id="destination-details-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/90 backdrop-blur-md flex justify-center items-start py-6 px-4 md:py-12"
    >
      <div
        id="destination-details-container"
        className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative my-auto animate-zoom-in"
      >
        {/* Absolute Close button */}
        <button
          id="details-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-100 hover:text-emerald-400 p-2.5 rounded-full border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Multi-Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Rich Gallery and Overview Specs */}
          <div className="lg:col-span-5 bg-zinc-950 p-6 md:p-8 flex flex-col justify-between border-r border-zinc-800">
            <div>
              {/* Country & Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
                  {destination.country}
                </span>
                <span className="flex items-center space-x-1 text-xs font-semibold text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{destination.rating} ({destination.reviewsCount} reviews)</span>
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white font-sans tracking-tight mb-2">
                {destination.name}
              </h2>
              <p className="text-zinc-400 text-xs italic mb-4">
                "{destination.tagline}"
              </p>

              {/* Big Media Player */}
              <div id="details-gallery-big" className="relative h-64 rounded-2xl overflow-hidden border border-zinc-800 mb-4 bg-zinc-900">
                <img
                  src={activeImage}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnail Gallery Row */}
              <div id="details-gallery-thumbs" className="grid grid-cols-4 gap-2 mb-6">
                {[destination.heroImage, ...destination.gallery].slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    id={`gallery-thumb-${idx}`}
                    onClick={() => setActiveImage(img)}
                    className={`h-16 rounded-xl overflow-hidden border transition-all ${
                      activeImage === img ? 'border-emerald-500 scale-95 shadow-md shadow-emerald-500/15' : 'border-zinc-800'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail view"
                      className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              {/* Quick specifications lists */}
              <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl space-y-3 mb-6">
                <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-300 font-bold border-b border-zinc-800 pb-2">
                  Key Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono">ADVENTURE LEVEL</span>
                    <span className="text-white font-semibold font-sans">{destination.adventureLevel}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono">LOCAL CLIMATE</span>
                    <span className="text-white font-semibold font-sans">{destination.climate}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono">MINIMUM DURATION</span>
                    <span className="text-white font-semibold font-sans">{destination.durationDays} Days</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] font-mono">STARTING FROM</span>
                    <span className="text-emerald-400 font-bold font-sans">${destination.price} USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price section and direct booking trigger */}
            <div className="border-t border-zinc-800 pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-zinc-500 text-[10px] font-mono block">ESTIMATED TOUR TOTAL</span>
                  <span className="text-2xl font-bold font-sans text-white">${destination.price} <span className="text-xs font-normal text-zinc-500">/ traveler</span></span>
                </div>
                <div className="text-right text-[10px] font-mono text-emerald-400 flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 mr-0.5" />
                  <span>Price Protected</span>
                </div>
              </div>
              <button
                id="details-btn-checkout"
                onClick={() => onBook(destination)}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] flex items-center justify-center space-x-2"
              >
                <span>Initiate Booking Flow</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          {/* Right Column: Full description, highlights bento, and Step Itinerary */}
          <div className="lg:col-span-7 p-6 md:p-8 overflow-y-auto max-h-[85vh] scrollbar-thin">
            
            {/* Short narrative description */}
            <div className="mb-6">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-2">
                OVERVIEW
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                {destination.description}
              </p>
            </div>

            {/* Highlights bento */}
            <div className="mb-8">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold mb-4">
                EXPERIENCE HIGHLIGHTS
              </h3>
              <div id="details-highlights-grid" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {destination.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-zinc-950 border border-zinc-800/80 rounded-xl hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-1.5 rounded-lg w-max mb-3">
                      {/* Select dynamic icon based on highlighted item */}
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold font-sans mb-1">{h.title}</h4>
                      <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-3">{h.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Immersive Day-by-Day Itinerary Planner */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-2">
                <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
                  DAY-BY-DAY ITINERARY OUTLINE
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">
                  {destination.itinerary.length} Days Packaged
                </span>
              </div>

              <div id="details-itinerary-accordion" className="space-y-3">
                {destination.itinerary.map((dayPlan) => {
                  const isExpanded = expandedDay === dayPlan.day;
                  return (
                    <div
                      key={dayPlan.day}
                      className={`border rounded-xl transition-all ${
                        isExpanded ? 'border-zinc-700 bg-zinc-950/60' : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80'
                      }`}
                    >
                      <button
                        onClick={() => toggleDay(dayPlan.day)}
                        className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none"
                      >
                        <div className="flex items-center space-x-3.5">
                          <span className="bg-emerald-500/15 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-lg border border-emerald-500/20 font-bold shrink-0">
                            Day {dayPlan.day}
                          </span>
                          <span className="text-white font-semibold font-sans text-xs sm:text-sm tracking-tight truncate max-w-[280px] sm:max-w-md">
                            {dayPlan.title}
                          </span>
                        </div>
                        <span className="text-emerald-400 text-xs font-mono font-semibold">
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isExpanded ? 'max-h-96 border-t border-zinc-800' : 'max-h-0'
                        }`}
                      >
                        <div className="p-4 space-y-2.5">
                          {dayPlan.activities.map((activity, actIdx) => (
                            <div key={actIdx} className="flex items-start space-x-3 text-xs font-sans text-zinc-300 leading-relaxed">
                              <span className="text-emerald-400 text-md mt-0.5 select-none shrink-0">•</span>
                              <span>{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
