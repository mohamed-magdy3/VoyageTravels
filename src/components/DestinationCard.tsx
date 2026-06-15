import React from 'react';
import { Star, Clock, Compass, Calendar, ArrowRight, CloudRain } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  key?: string;
  destination: Destination;
  onExplore: (destination: Destination) => void;
  onBook: (destination: Destination) => void;
}

export default function DestinationCard({ destination, onExplore, onBook }: DestinationCardProps) {
  return (
    <div
      id={`destination-card-${destination.id}`}
      className="group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col h-full"
    >
      {/* Visual Image Section */}
      <div className="relative h-56 sm:h-64 overflow-hidden shrink-0">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Shadow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

        {/* Floating Price Badge */}
        <div className="absolute top-4 right-4 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full flex items-center space-x-1">
          <span className="text-[10px] uppercase font-mono text-zinc-400">From</span>
          <span className="text-emerald-400 font-bold font-sans text-sm">${destination.price}</span>
        </div>

        {/* Tag indicators */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {destination.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="bg-emerald-500/20 backdrop-blur-sm text-emerald-300 border border-emerald-400/20 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Country heading */}
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            <span className="flex items-center space-x-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>{destination.country}</span>
            </span>
            <span className="flex items-center space-x-1 text-yellow-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{destination.rating}</span>
            </span>
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-emerald-400 transition-colors">
            {destination.name}
          </h3>

          {/* Tagline */}
          <p className="text-zinc-300 text-xs leading-relaxed font-sans line-clamp-2">
            {destination.tagline}
          </p>

          {/* Detail specs */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 pb-1">
            <div className="text-[10px] text-zinc-400 font-mono flex items-center space-x-1">
              <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span>{destination.durationDays} Days / {destination.durationDays - 1} Nights</span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono flex items-center space-x-1">
              <CloudRain className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">{destination.climate.split(' (')[0]}</span>
            </div>
          </div>
        </div>

        {/* Buttons actions */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-1">
          <button
            id={`btn-explore-${destination.id}`}
            onClick={() => onExplore(destination)}
            className="w-full bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-xl border border-zinc-700/50 transition-colors cursor-pointer"
          >
            Full Itinerary
          </button>
          <button
            id={`btn-book-now-${destination.id}`}
            onClick={() => onBook(destination)}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
