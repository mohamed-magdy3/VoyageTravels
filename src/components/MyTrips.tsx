import React, { useState } from 'react';
import { Plane, Calendar, CreditCard, ChevronDown, Trash2, Printer, MapPin, Award, Compass, Ticket, Heart, Sparkles, Check } from 'lucide-react';
import { Booking } from '../types';

interface MyTripsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onExploreHotspots: () => void;
}

export default function MyTrips({ bookings, onCancelBooking, onExploreHotspots }: MyTripsProps) {
  const [selectedPass, setSelectedPass] = useState<Booking | null>(null);

  // Uniquely format dates
  const formatDateString = (str: string) => {
    return new Date(str).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section id="my-trips-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Visual Title Header */}
      <div className="border-b border-zinc-800 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs mb-2">
            <Award className="w-4 h-4" />
            <span className="uppercase font-semibold tracking-wider">Voyage Club Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            My Digital Voyage Passports
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-sans leading-relaxed">
            Manage your six-star scheduled adventures, retrieve airport boarding passes, and browse unlocked destination passport seals.
          </p>
        </div>

        {/* Dynamic mini counts dashboard */}
        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-center min-w-24">
            <span className="text-zinc-500 text-[10px] uppercase font-mono block">Trips Booked</span>
            <span className="text-2xl font-sans font-bold text-white">{bookings.length}</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-center min-w-24">
            <span className="text-zinc-500 text-[10px] uppercase font-mono block">Passport Seals</span>
            <span className="text-2xl font-sans font-bold text-emerald-400">{bookings.length}</span>
          </div>
        </div>
      </div>

      {/* BLANK EMPTY STATE */}
      {bookings.length === 0 ? (
        <div
          id="trips-empty-state"
          className="border-2 border-dashed border-zinc-850 p-12 text-center rounded-2xl max-w-2xl mx-auto"
        >
          <div className="bg-emerald-500/15 border border-emerald-400/25 p-4 rounded-full w-max mx-auto mb-6">
            <Compass className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-white font-sans">No scheduled passport voyages found</h3>
          <p className="text-zinc-400 text-xs mt-1 mb-8 max-w-md mx-auto">
            You haven't booked any custom luxury routes yet! Explore our six handpicked curated locations to initiate a premium booking.
          </p>
          <button
            id="empty-state-btn-explore"
            onClick={onExploreHotspots}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl cursor-pointer transition-all"
          >
            Explore Curated Hotspots
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: List of Booked Trips */}
          <div className="lg:col-span-7 space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                id={`my-trip-card-${booking.id}`}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-750 transition-all flex flex-col sm:flex-row gap-5"
              >
                {/* Destination mini visual snapshot */}
                <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={booking.destination.heroImage}
                    alt={booking.destination.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Virtual stamp circle badge */}
                  <div className="absolute top-2 left-2 bg-emerald-500 border border-emerald-400 text-black p-1 rounded-full text-[10px] font-bold shadow-md">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Specific booking credentials info layout */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg uppercase font-bold">
                        {booking.classType} Class Upright
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">Ref: {booking.bookingRef}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-1 border-b border-zinc-850 pb-1 flex items-center justify-between">
                      <span>{booking.destination.name}</span>
                      <span className="text-emerald-400 font-bold text-sm">${booking.totalAmount} USD</span>
                    </h3>

                    {/* Meta row details list */}
                    <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] font-sans text-zinc-400">
                      <div>🗓️ {formatDateString(booking.startDate)}</div>
                      <div>👥 {booking.guests.adults} Adult{booking.guests.adults > 1 ? 's' : ''} {booking.guests.children > 0 ? `, ${booking.guests.children} Child` : ''}</div>
                      <div>🛫 Seat{booking.travelers.length > 1 ? 's' : ''}: <span className="font-mono text-white font-bold">{booking.travelers.map(t => t.seat).join(', ')}</span></div>
                      <div>🛡️ Protection: {booking.addInsurance ? 'Premium Covered' : 'Declined'}</div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      id={`btn-cancel-trip-${booking.id}`}
                      onClick={() => onCancelBooking(booking.id)}
                      className="text-zinc-500 hover:text-red-400 text-[10px] font-mono uppercase font-bold tracking-wider py-1.5 px-3 hover:bg-red-500/5 hover:border hover:border-red-500/10 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Passage</span>
                    </button>

                    <button
                      id={`btn-view-pass-${booking.id}`}
                      onClick={() => setSelectedPass(booking)}
                      className="bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold uppercase py-1.5 px-4 rounded-xl flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>Digital Boarding Passes</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right panel: Active Virtual Boarding Pass view representation ticket */}
          <div className="lg:col-span-5">
            {selectedPass ? (
              <div
                id="my-trips-boarding-pass-viewer"
                className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-6 shadow-2xl relative"
              >
                {/* Title */}
                <div className="flex justify-between items-center border-b border-zinc-850 pb-3">
                  <div>
                    <h4 className="text-white text-xs font-mono uppercase tracking-widest font-bold">DIGITAL AIRPORT TICKET</h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">{selectedPass.destination.name}</span>
                  </div>
                  <button
                    id="close-boarding-pass-viewer"
                    onClick={() => setSelectedPass(null)}
                    className="text-zinc-500 hover:text-white p-1 rounded-full border border-zinc-800"
                  >
                    Close
                  </button>
                </div>

                {/* Printable dynamic pass display list */}
                <div className="space-y-4">
                  {selectedPass.travelers.map((tr) => (
                    <div
                      key={tr.id}
                      className="bg-white text-black p-4 rounded-xl shadow-lg border border-zinc-200 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 block font-bold">BOARDING PASS</span>
                          <span className="text-[11px] font-sans font-bold text-black uppercase">{tr.fullName || 'Alex Hamilton'}</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold uppercase">
                          SEAT {tr.seat || 'A1'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-[10px] pt-3">
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 block">DESTINATION</span>
                          <span className="text-black font-semibold font-sans">{selectedPass.destination.name}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 block">PASSPORT NO.</span>
                          <span className="text-black font-mono">{tr.passportNumber}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 block">START</span>
                          <span className="text-black font-sans">{selectedPass.startDate}</span>
                        </div>
                        <div>
                          <span className="text-[8px] font-mono text-zinc-400 block">REF CODE</span>
                          <span className="text-black font-mono font-bold text-emerald-600">{selectedPass.bookingRef}</span>
                        </div>
                      </div>

                      {/* Barcode widget */}
                      <div className="pt-3">
                        <div className="flex space-x-0.5 items-end h-8 overflow-hidden bg-zinc-50 p-1 rounded border border-zinc-100">
                          {[1, 2, 4, 1, 3, 1, 2, 4, 2, 1, 3, 2, 4, 1, 3, 4].map((h, i) => (
                            <div key={i} className="bg-black flex-1" style={{ height: `${h * 25}%` }} />
                          ))}
                        </div>
                        <span className="text-[7px] font-mono text-zinc-400 block text-center mt-1">Voyage Charter Flights</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    id="boarding-pass-print-btn"
                    onClick={() => { alert("Virtual physical simulation initialized. Readying print queues!"); }}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print All Boarding Passes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950/40 border border-zinc-850 p-8 rounded-2xl text-center flex flex-col items-center justify-center h-full min-h-[340px]">
                <Ticket className="w-10 h-10 text-zinc-600 mb-4 animate-bounce" />
                <h4 className="text-sm font-semibold text-zinc-300 font-sans">Active Ticket Coupon Holder</h4>
                <p className="text-zinc-500 text-xs mt-1 max-w-xs mx-auto">
                  Click 'Digital Boarding Passes' on any confirmed trip to display interactive real-time gate tickets and QR codes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Virtual Passport Stamping Seals Achievements board */}
      {bookings.length > 0 && (
        <div id="unlocked-stamps-panel" className="mt-16 bg-zinc-950 p-6 rounded-2xl border border-zinc-850">
          <div className="flex items-center space-x-2 text-yellow-400 font-mono text-xs uppercase font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Unlocked Passport Seals Collection</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-center flex flex-col items-center justify-center space-y-2 relative group overflow-hidden"
              >
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 rounded-full flex items-center justify-center font-bold text-center relative shadow-inner">
                  <span className="text-[10px] font-mono uppercase tracking-tighter leading-none block">APPROVED</span>
                  <div className="absolute inset-0 bg-transparent rounded-full border-2 border-dashed border-emerald-400/40 scale-90 group-hover:rotate-45 transition-transform duration-1000" />
                </div>
                <div>
                  <span className="text-white text-xs font-bold block">{booking.destination.name.split(' ')[0]}</span>
                  <span className="text-zinc-500 text-[9px] font-mono font-semibold uppercase">{booking.destination.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
