import React, { useState, useEffect } from 'react';
import {
  X, ChevronRight, ChevronLeft, User, Mail, Phone, CreditCard, Ship,
  Briefcase, Award, Shield, Check, Star, RefreshCw, Calendar, Eye, Globe, Compass, ShieldCheck
} from 'lucide-react';
import { Destination, Booking, Traveler, GuestCount } from '../types';

interface BookingModalProps {
  destination: Destination;
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

// Occupied seats preset
const OCCUPIED_SEATS = ['1A', '1D', '2B', '3C', '4A', '4D', '5B', '6C', '7F', '8A', '9D', '10C'];

export default function BookingModal({ destination, onClose, onConfirmBooking }: BookingModalProps) {
  const [step, setStep] = useState(1);
  
  // Step 1: Configuration States
  const [startDate, setStartDate] = useState('2026-07-15');
  const [endDate, setEndDate] = useState('2026-07-22');
  const [classType, setClassType] = useState<'economy' | 'business' | 'first'>('economy');
  const [guests, setGuests] = useState<GuestCount>({ adults: 1, children: 0 });
  const totalGuests = guests.adults + guests.children;

  // Step 2: Traveler Credentials
  const [travelers, setTravelers] = useState<Traveler[]>([]);

  // Step 3: Seat Allocation
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [activeTravelerSeatSelectIdx, setActiveTravelerSeatSelectIdx] = useState<number>(0);

  // Step 4: Add-ons
  const [addInsurance, setAddInsurance] = useState(false);
  const [addAirportTransfer, setAddAirportTransfer] = useState(false);

  // Step 5: Payment details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Final Confirmed booking reference
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Automatically recalculate end date based on tour duration days
  useEffect(() => {
    if (startDate) {
      const baseDate = new Date(startDate);
      baseDate.setDate(baseDate.getDate() + destination.durationDays);
      setEndDate(baseDate.toISOString().split('T')[0]);
    }
  }, [startDate, destination.durationDays]);

  // Handle generating / mutating traveler info structure on change of guest counts
  useEffect(() => {
    const updated: Traveler[] = [];
    for (let i = 0; i < totalGuests; i++) {
      const existing = travelers[i];
      updated.push({
        id: existing?.id || `tr-${Date.now()}-${i}`,
        fullName: existing?.fullName || '',
        passportNumber: existing?.passportNumber || '',
        email: existing?.email || '',
        phone: existing?.phone || '',
        seat: existing?.seat || '',
      });
    }
    setTravelers(updated);
  }, [guests.adults, guests.children]);

  // Pricing arithmetic
  const getPricingBase = () => {
    let multiplier = 1;
    if (classType === 'business') multiplier = 1.35;
    if (classType === 'first') multiplier = 1.75;
    return Math.round(destination.price * multiplier * totalGuests);
  };

  const getPricingAddons = () => {
    let total = 0;
    if (addInsurance) total += 120 * totalGuests;
    if (addAirportTransfer) total += 180;
    return total;
  };

  const basePrice = getPricingBase();
  const taxPrice = Math.round(basePrice * 0.08); // 8% luxury travel tax
  const addonsPrice = getPricingAddons();
  const overallPrice = basePrice + taxPrice + addonsPrice;

  // Validation routines
  const validateStep1 = () => {
    return totalGuests > 0 && totalGuests <= 6;
  };

  const validateStep2 = () => {
    return travelers.every(t => t.fullName.trim() !== '' && t.passportNumber.trim() !== '');
  };

  const validateStep3 = () => {
    return selectedSeats.length === totalGuests;
  };

  const validateStep5 = () => {
    return cardName.trim() !== '' && cardNumber.replace(/\s+/g, '').length >= 15 && cardExpiry.length >= 4 && cardCvv.length >= 3;
  };

  // Seat click dispatcher
  const handleSeatClick = (seatCode: string, seatClass: 'economy' | 'business' | 'first') => {
    // Prevent selecting occupied seats or seat of mismatched category
    if (OCCUPIED_SEATS.includes(seatCode)) return;

    if (classType === 'first' && seatClass !== 'first') {
      alert("First Class passengers must choose seats in the First Class Cabin (Gold).");
      return;
    }
    if (classType === 'business' && seatClass !== 'business') {
      alert("Business Class passengers must choose seats in the Business Class Cabin (Emerald).");
      return;
    }
    if (classType === 'economy' && seatClass !== 'economy') {
      alert("Economy Class passengers must choose seats in the Economy Class Cabin (Blue).");
      return;
    }

    // Toggle seat assignment
    let updatedSeats = [...selectedSeats];
    const index = updatedSeats.indexOf(seatCode);

    if (index > -1) {
      // De-select
      updatedSeats.splice(index, 1);
      const updatedTravelers = [...travelers];
      // find traveler holding this seat and clear it
      const travelerIdx = updatedTravelers.findIndex(t => t.seat === seatCode);
      if (travelerIdx > -1) {
        updatedTravelers[travelerIdx].seat = '';
      }
      setTravelers(updatedTravelers);
      setSelectedSeats(updatedSeats);
    } else {
      // Select
      if (updatedSeats.length < totalGuests) {
        updatedSeats.push(seatCode);
        
        // Find next traveler who does not have an assigned seat
        const updatedTravelers = [...travelers];
        const nextUnassignedIdx = updatedTravelers.findIndex(t => !t.seat);
        if (nextUnassignedIdx > -1) {
          updatedTravelers[nextUnassignedIdx].seat = seatCode;
          setTravelers(updatedTravelers);
        }
        setSelectedSeats(updatedSeats);
      } else {
        // Replace current active traveler's seat
        const updatedTravelers = [...travelers];
        const targetTr = updatedTravelers[activeTravelerSeatSelectIdx];
        if (targetTr) {
          // Free previous seat
          const prevSeat = targetTr.seat;
          if (prevSeat) {
            updatedSeats = updatedSeats.filter(s => s !== prevSeat);
          }
          targetTr.seat = seatCode;
          updatedSeats.push(seatCode);
          setTravelers(updatedTravelers);
          setSelectedSeats(updatedSeats);
        }
      }
    }
  };

  // Simulate payment processing
  const handleCheckoutSubmit = () => {
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentDone(true);
      
      const referenceCode = `VOY-${destination.id.toUpperCase().slice(0,3)}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      const finalBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingRef: referenceCode,
        destination,
        startDate,
        endDate,
        guests,
        classType,
        travelers,
        addInsurance,
        addAirportTransfer,
        baseAmount: basePrice,
        taxesAmount: taxPrice,
        addonsAmount: addonsPrice,
        discountAmount: 0,
        totalAmount: overallPrice,
        bookingDate: new Date().toISOString().split('T')[0],
        paymentStatus: 'paid',
        cardNumberLast4: cardNumber.slice(-4),
      };

      setConfirmedBooking(finalBooking);
      setStep(6);
    }, 3000);
  };

  // Dispatch fully confirmed booking structure back to the parent
  const handleFinish = () => {
    if (confirmedBooking) {
      onConfirmBooking(confirmedBooking);
    }
  };

  // Format Card numbers
  const formatCardInputAndSelectBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += input[i];
    }
    setCardNumber(formatted.slice(0, 19));
  };

  const getCardBrand = () => {
    if (cardNumber.startsWith('4')) return 'Visa';
    if (cardNumber.startsWith('5')) return 'MasterCard';
    if (cardNumber.startsWith('3')) return 'American Express';
    return 'Platinum';
  };

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/95 backdrop-blur-md flex justify-center items-start py-6 px-4 md:py-12"
    >
      <div
        id="booking-modal-content"
        className="w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative my-auto animate-zoom-in flex flex-col"
      >
        {/* Header Ribbon */}
        <div className="bg-zinc-950 p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-semibold">
                Bespoke Booking Wizard
              </span>
              <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                Securing custom passage to: {destination.name}
              </h3>
            </div>
          </div>
          <button
            id="booking-close-btn"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1.5 rounded-full hover:bg-zinc-850 border border-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div id="booking-progress-strip" className="bg-zinc-950 px-6 py-2 border-b border-zinc-850 flex justify-between text-[11px] font-mono text-zinc-500">
          <div className={`flex items-center space-x-1 ${step >= 1 ? 'text-emerald-400 font-bold' : ''}`}>
            <span>01 Config</span>
          </div>
          <ChevronRight className="w-3 h-3 self-center text-zinc-700" />
          <div className={`flex items-center space-x-1 ${step >= 2 ? 'text-emerald-400 font-bold' : ''}`}>
            <span>02 Travelers</span>
          </div>
          <ChevronRight className="w-3 h-3 self-center text-zinc-700" />
          <div className={`flex items-center space-x-1 ${step >= 3 ? 'text-emerald-400 font-bold' : ''}`}>
            <span>03 Seat Selection</span>
          </div>
          <ChevronRight className="w-3 h-3 self-center text-zinc-700" />
          <div className={`flex items-center space-x-1 ${step >= 4 ? 'text-emerald-400 font-bold' : ''}`}>
            <span>04 Upgrades</span>
          </div>
          <ChevronRight className="w-3 h-3 self-center text-zinc-700" />
          <div className={`flex items-center space-x-1 ${step >= 5 ? 'text-emerald-400 font-bold' : ''}`}>
            <span>05 Payment</span>
          </div>
          <ChevronRight className="w-3 h-3 self-center text-zinc-700" />
          <div className={`flex items-center space-x-1 ${step >= 6 ? 'text-white font-bold animate-pulse' : ''}`}>
            <span>06 Boarding Passes</span>
          </div>
        </div>

        {/* Wizard Main Pane Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[70vh] scrollbar-thin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8">
              
              {/* STEP 1: CONFIGURE DATES, PASSENGERS & CABIN CLASS */}
              {step === 1 && (
                <div id="step-1-container" className="space-y-6">
                  <div className="border-b border-zinc-800 pb-4">
                    <h4 className="text-white text-base font-bold font-sans">Cabin & Passenger Parameters</h4>
                    <p className="text-zinc-400 text-xs mt-1">Determine date intervals, luxury tier and passenger weights.</p>
                  </div>

                  {/* Dates input */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Expected Start Date
                      </label>
                      <input
                        id="booking-start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:border-emerald-500 outline-none transition-colors cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1.5 opacity-60">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Duration End Date
                      </label>
                      <div className="w-full bg-zinc-950/40 border border-zinc-850 rounded-xl px-4 py-3 text-sm text-zinc-400 select-none">
                        {endDate} ({destination.durationDays} days)
                      </div>
                    </div>
                  </div>

                  {/* Passenger Counts */}
                  <div className="bg-zinc-950/50 border border-zinc-850 p-5 rounded-xl space-y-4">
                    <h5 className="text-xs uppercase font-mono tracking-wider text-zinc-300 font-bold font-sans">
                      Party Dimensions
                    </h5>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Adults */}
                      <div className="flex items-center justify-between sm:space-x-12 flex-1">
                        <div>
                          <span className="text-zinc-100 text-sm font-semibold block">Adult Travelers</span>
                          <span className="text-[11px] text-zinc-500">18 years of age or older</span>
                        </div>
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => { if (guests.adults > 1) setGuests({ ...guests, adults: guests.adults - 1 }); }}
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="text-white font-mono font-bold text-sm">{guests.adults}</span>
                          <button
                            onClick={() => { if (totalGuests < 4) setGuests({ ...guests, adults: guests.adults + 1 }); }}
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Line break */}
                      <div className="hidden sm:block w-px h-10 bg-zinc-800" />

                      {/* Children */}
                      <div className="flex items-center justify-between sm:space-x-12 flex-1">
                        <div>
                          <span className="text-zinc-100 text-sm font-semibold block">Children</span>
                          <span className="text-[11px] text-zinc-500">Age limit of under 18</span>
                        </div>
                        <div className="flex items-center space-x-3.5">
                          <button
                            onClick={() => { if (guests.children > 0) setGuests({ ...guests, children: guests.children - 1 }); }}
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="text-white font-mono font-bold text-sm">{guests.children}</span>
                          <button
                            onClick={() => { if (totalGuests < 4) setGuests({ ...guests, children: guests.children + 1 }); }}
                            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cabin classes */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                      Luxury Cabin Classification
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Economy card */}
                      <div
                        onClick={() => setClassType('economy')}
                        className={`p-4 rounded-xl border border-zinc-800 cursor-pointer text-left transition-all relative overflow-hidden ${
                          classType === 'economy' ? 'border-emerald-500 bg-emerald-500/5' : 'bg-zinc-950 hover:bg-zinc-950/65'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-xs font-bold font-sans flex items-center">
                            <Compass className="w-4 h-4 text-emerald-400 mr-2" />
                            <span>Explorer Economy</span>
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[10px] leading-relaxed">
                          Standard cozy layouts, gourmet organic cold bento meals, tablet-based active guides.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 mt-2 font-semibold">Included in Base</div>
                      </div>

                      {/* Business Card */}
                      <div
                        onClick={() => setClassType('business')}
                        className={`p-4 rounded-xl border border-zinc-800 cursor-pointer text-left transition-all relative overflow-hidden ${
                          classType === 'business' ? 'border-emerald-500 bg-emerald-500/5' : 'bg-zinc-950 hover:bg-zinc-950/65'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-xs font-bold font-sans flex items-center">
                            <Briefcase className="w-4 h-4 text-emerald-400 mr-2" />
                            <span>Executive Business</span>
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[10px] leading-relaxed">
                          Reclining flatbed suites, VIP terminal access, premium sommelier beverage pairings.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 mt-2 font-semibold">+35% Cabin Upgrade</div>
                      </div>

                      {/* First class Card */}
                      <div
                        onClick={() => setClassType('first')}
                        className={`p-4 rounded-xl border border-zinc-800 cursor-pointer text-left transition-all relative overflow-hidden ${
                          classType === 'first' ? 'border-emerald-500 bg-emerald-500/5' : 'bg-zinc-950 hover:bg-zinc-950/65'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-xs font-bold font-sans flex items-center">
                            <Award className="w-4 h-4 text-emerald-400 mr-2" />
                            <span>Imperial First Suite</span>
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[10px] leading-relaxed">
                          Private enclosed state cabins, helicopter transfer to hotel, personalized personal butler.
                        </p>
                        <div className="text-[10px] font-mono text-emerald-400 mt-2 font-semibold">+75% Royal Upgrade</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: TRAVELER INFORMATION FORMS */}
              {step === 2 && (
                <div id="step-2-container" className="space-y-6">
                  <div className="border-b border-zinc-800 pb-4">
                    <h4 className="text-white text-base font-bold font-sans">Official Passenger Details</h4>
                    <p className="text-zinc-400 text-xs mt-1">Please insert matching passport metrics for entry clearings.</p>
                  </div>

                  <div className="space-y-5">
                    {travelers.map((traveler, index) => (
                      <div
                        key={traveler.id}
                        className="bg-zinc-950/40 border border-zinc-850 p-5 rounded-2xl space-y-4"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span>Passenger {index + 1} ({index === 0 ? 'Lead Traveler' : 'Companion'})</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Nama */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                              Full Name (as in passport)
                            </label>
                            <input
                              type="text"
                              value={traveler.fullName}
                              onChange={(e) => {
                                const list = [...travelers];
                                list[index].fullName = e.target.value;
                                setTravelers(list);
                              }}
                              placeholder="e.g. Alexander Hamilton"
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                            />
                          </div>

                          {/* Paspor */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                              Passport Reference No.
                            </label>
                            <input
                              type="text"
                              value={traveler.passportNumber}
                              onChange={(e) => {
                                const list = [...travelers];
                                list[index].passportNumber = e.target.value.toUpperCase();
                                setTravelers(list);
                              }}
                              placeholder="e.g. AB1234567"
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none transition-colors"
                            />
                          </div>

                          {/* Email */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                              <input
                                type="email"
                                value={traveler.email}
                                onChange={(e) => {
                                  const list = [...travelers];
                                  list[index].email = e.target.value;
                                  setTravelers(list);
                                }}
                                placeholder="name@domain.com"
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-3 text-xs text-white outline-none transition-colors"
                              />
                            </div>
                          </div>

                          {/* Telephone */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                              Primary Phone Line
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                              <input
                                type="text"
                                value={traveler.phone}
                                onChange={(e) => {
                                  const list = [...travelers];
                                  list[index].phone = e.target.value;
                                  setTravelers(list);
                                }}
                                placeholder="+1 (555) 0192"
                                className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-3 text-xs text-white outline-none transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: INTERACTIVE SEATING CABIN MAP */}
              {step === 3 && (
                <div id="step-3-container" className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h4 className="text-white text-base font-bold font-sans">Cabin Seating Assortment Map</h4>
                    <p className="text-zinc-400 text-xs mt-1">Assign designated seats relative to passenger class tier.</p>
                  </div>

                  {/* Seat assignments legend mapping */}
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-850">
                    <div className="flex items-center space-x-6 text-[10px] font-mono uppercase text-zinc-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-3 h-3 bg-zinc-500/20 border border-zinc-600 rounded" />
                        <span>Available</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-3 h-3 bg-red-500/30 border border-red-500 rounded" />
                        <span>Occupied</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-3 h-3 bg-emerald-500 border border-emerald-400 rounded animate-pulse" />
                        <span>Your Select</span>
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      Cabin Mode: <span className="text-emerald-400 font-bold uppercase">{classType} Class</span>
                    </div>
                  </div>

                  {/* Traveler seat selection selector tabs lists */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {travelers.map((tr, trIdx) => (
                      <button
                        key={tr.id}
                        onClick={() => setActiveTravelerSeatSelectIdx(trIdx)}
                        className={`px-3 py-2.5 rounded-xl border text-left flex flex-col transition-all ${
                          activeTravelerSeatSelectIdx === trIdx
                            ? 'border-emerald-500 bg-emerald-500/5'
                            : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-850'
                        }`}
                      >
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">Passenger {trIdx + 1}</span>
                        <span className="text-xs text-white font-bold truncate max-w-[120px]">{tr.fullName || `User ${trIdx + 1}`}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold mt-1">
                          {tr.seat ? `Seat ${tr.seat}` : 'No Seat Tag'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Top-down graphic vehicle cabin visualization layout */}
                  <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-850 flex flex-col items-center">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-6 font-bold flex items-center">
                      <Globe className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      <span>FRONT OF LUXURY CHARTER PLANE</span>
                    </div>

                    {/* Plane Cabin Body Render */}
                    <div className="w-full max-w-[340px] border-x-2 border-zinc-800 rounded-t-[100px] rounded-b-[40px] px-6 py-8 relative bg-zinc-900/40">
                      
                      {/* First class Rows */}
                      <div className="space-y-3 mb-6">
                        <div className="text-[9px] uppercase font-mono text-center tracking-wider text-yellow-500/80 font-bold mb-2">First Class Cabin</div>
                        {[['1A', '1D'], ['2A', '2D']].map((row, rowIdx) => (
                          <div key={rowIdx} className="flex justify-between px-4">
                            {row.map(seatCode => {
                              const isOccupied = OCCUPIED_SEATS.includes(seatCode);
                              const isSelected = selectedSeats.includes(seatCode);
                              return (
                                <button
                                  key={seatCode}
                                  onClick={() => handleSeatClick(seatCode, 'first')}
                                  disabled={isOccupied}
                                  className={`w-12 h-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono border transition-all ${
                                    isOccupied
                                      ? 'bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-emerald-500 border-emerald-400 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                      : 'bg-yellow-500/5 hover:bg-yellow-500/15 border-yellow-500/20 text-yellow-500/85'
                                  }`}
                                >
                                  <span>{seatCode}</span>
                                  {isSelected && <Check className="w-3 h-3 text-black" />}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      {/* Business Class Rows */}
                      <div className="space-y-3 mb-6 pt-4 border-t border-zinc-800/80">
                        <div className="text-[9px] uppercase font-mono text-center tracking-wider text-emerald-400/80 font-bold mb-2">Business Cabin</div>
                        {[['3A', '3B', '3C', '3D'], ['4A', '4B', '4C', '4D'], ['5A', '5B', '5C', '5D']].map((row, rowIdx) => (
                          <div key={rowIdx} className="flex justify-between px-2">
                            {row.map(seatCode => {
                              const isOccupied = OCCUPIED_SEATS.includes(seatCode);
                              const isSelected = selectedSeats.includes(seatCode);
                              return (
                                <button
                                  key={seatCode}
                                  onClick={() => handleSeatClick(seatCode, 'business')}
                                  disabled={isOccupied}
                                  className={`w-10 h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono border transition-all ${
                                    isOccupied
                                      ? 'bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-emerald-500 border-emerald-400 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                      : 'bg-emerald-500/5 hover:bg-emerald-500/15 border-emerald-500/20 text-emerald-400/80'
                                  }`}
                                >
                                  <span>{seatCode}</span>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      {/* Economy class rows */}
                      <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                        <div className="text-[9px] uppercase font-mono text-center tracking-wider text-blue-400/80 font-bold mb-2">Economy Cabin</div>
                        {[['6A', '6B', '6C', '6D'], ['7A', '7B', '7C', '7D'], ['8A', '8B', '8C', '8D'], ['9A', '9B', '9C', '9D'], ['10A', '10B', '10C', '10D']].map((row, rowIdx) => (
                          <div key={rowIdx} className="flex justify-between px-2">
                            {row.map(seatCode => {
                              const isOccupied = OCCUPIED_SEATS.includes(seatCode);
                              const isSelected = selectedSeats.includes(seatCode);
                              return (
                                <button
                                  key={seatCode}
                                  onClick={() => handleSeatClick(seatCode, 'economy')}
                                  disabled={isOccupied}
                                  className={`w-10 h-8 rounded-lg flex flex-col items-center justify-center text-[9px] font-mono border transition-all ${
                                    isOccupied
                                      ? 'bg-red-500/10 border-red-500/30 text-red-400 cursor-not-allowed'
                                      : isSelected
                                      ? 'bg-emerald-500 border-emerald-400 text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                      : 'bg-blue-500/5 hover:bg-blue-500/15 border-blue-500/20 text-blue-400/80'
                                  }`}
                                >
                                  <span>{seatCode}</span>
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: LUXURY ADD-ONS AND SERVICES UPGRADE */}
              {step === 4 && (
                <div id="step-4-container" className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h4 className="text-white text-base font-bold font-sans">Premium Excursion Upgrades</h4>
                    <p className="text-zinc-400 text-xs mt-1">Opt in for additional multi-layered layers of safety & convenience.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Protection option */}
                    <div
                      onClick={() => setAddInsurance(!addInsurance)}
                      className={`p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                        addInsurance ? 'border-emerald-500 bg-emerald-500/5' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3.5">
                          <div className={`p-2.5 rounded-xl border ${addInsurance ? 'bg-emerald-500 border-emerald-400 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-white text-sm font-bold block font-sans">Voyage Protection Plan</span>
                            <span className="text-zinc-400 text-xs mt-0.5 block leading-relaxed">
                              Emergency medical evacuation, lost baggage compensation, and 100% complete refund coverage if cancelled.
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-400 font-bold font-mono text-sm block">$120</span>
                          <span className="text-zinc-500 text-[9px] font-mono block">PER EXPLORER</span>
                        </div>
                      </div>
                    </div>

                    {/* Transfer option */}
                    <div
                      onClick={() => setAddAirportTransfer(!addAirportTransfer)}
                      className={`p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                        addAirportTransfer ? 'border-emerald-500 bg-emerald-500/5' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3.5">
                          <div className={`p-2.5 rounded-xl border ${addAirportTransfer ? 'bg-emerald-500 border-emerald-400 text-black' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-white text-sm font-bold block font-sans">Mercedes Chauffeur Sprinter Transfer</span>
                            <span className="text-zinc-400 text-xs mt-0.5 block leading-relaxed">
                              Premium private executive black Mercedes transporter welcomes you straight from your home driveway to the local airport gate.
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-emerald-400 font-bold font-mono text-sm block">$180</span>
                          <span className="text-zinc-500 text-[9px] font-mono block">FLAT RETREAT</span>
                        </div>
                      </div>
                    </div>

                    {/* Carbon free inclusion */}
                    <div className="bg-zinc-950 border border-zinc-850 p-5 rounded-2xl flex items-center justify-between text-left">
                      <div className="flex items-center space-x-3">
                        <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-white text-sm font-semibold block">Complementary Carbon Offset</span>
                          <span className="text-zinc-500 text-[11px]">We plant trees on behalf of every explorer in your tour.</span>
                        </div>
                      </div>
                      <span className="text-emerald-400 text-xs font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded-lg">100% COMPED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: CARD PAYMENT FORM CARD VISUALIZER */}
              {step === 5 && (
                <div id="step-5-container" className="space-y-6">
                  <div className="border-b border-zinc-800 pb-3">
                    <h4 className="text-white text-base font-bold font-sans">Secured Merchant Checkout</h4>
                    <p className="text-zinc-400 text-xs mt-1">Fully masked military grade double ledger transactions.</p>
                  </div>

                  {/* Interactive Visual Card Layer */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl p-6 border border-zinc-700/80 shadow-2xl overflow-hidden flex flex-col justify-between max-w-[380px] mx-auto">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-7 bg-amber-400/20 border border-amber-400/40 rounded-md flex items-center justify-center">
                        <div className="w-6 h-5 bg-gradient-to-r from-amber-400 to-yellow-600 rounded" />
                      </div>
                      <span className="text-zinc-400 text-xs font-mono uppercase font-semibold">{getCardBrand()}</span>
                    </div>
                    {/* Card num */}
                    <div className="text-white text-lg font-mono tracking-widest py-2">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    {/* cardholder name */}
                    <div className="flex justify-between items-end text-xs font-mono">
                      <div>
                        <span className="text-zinc-500 text-[9px] block">CARDHOLDER</span>
                        <span className="text-white uppercase font-semibold">{cardName || 'YOUR FULL NAME'}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[9px] block">EXPIRY</span>
                        <span className="text-white">{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Cardholder Registered Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Johnathan Davis"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Credit Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={formatCardInputAndSelectBrand}
                        placeholder="4000 1234 5678 9010"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                          Expiry
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="09/28"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none text-center"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                          CVV Code
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-white outline-none text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Processing display loaders */}
                  {isProcessingPayment && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col items-center space-y-3">
                      <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                      <span className="text-white text-xs font-mono uppercase font-bold animate-pulse">Encoding encrypted financial request...</span>
                      <span className="text-zinc-500 text-[10px]">Merchant portal callback holds instant verification</span>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 6: BOARDING PASSES, SUCCESS, VIRTUAL STAMPS */}
              {step === 6 && confirmedBooking && (
                <div id="step-6-container" className="space-y-6">
                  {/* Big Stamp Animation box */}
                  <div className="bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="bg-emerald-500 text-black p-3 rounded-full">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-sans">PASSPORT CLEARANCE ISSUED</h4>
                      <p className="text-zinc-400 text-xs mt-1">
                        Your luxury booking is booked & confirmed under reference: <span className="text-emerald-400 font-mono font-bold">{confirmedBooking.bookingRef}</span>
                      </p>
                    </div>
                  </div>

                  {/* Printable styled boarding passes visual loop */}
                  <div className="space-y-6">
                    <h5 className="text-zinc-300 text-xs font-mono uppercase tracking-widest border-b border-zinc-800 pb-2">Your Boarding Passes</h5>
                    {confirmedBooking.travelers.map((tr, index) => (
                      <div
                        key={tr.id}
                        id={`boarding-pass-${tr.id}`}
                        className="bg-white text-black p-6 rounded-2xl shadow-xl flex flex-col md:flex-row relative overflow-hidden"
                      >
                        {/* Cut lines */}
                        <div className="absolute top-0 right-[25%] bottom-0 border-l border-dashed border-zinc-300 hidden md:block" />

                        {/* Pass Left Content segment */}
                        <div className="flex-1 space-y-4">
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                            <div>
                              <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold">Luxury Passage Ticket</span>
                              <span className="text-xs font-sans text-black font-semibold uppercase">{destination.name} Luxury Tour</span>
                            </div>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              {classType} cabin
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            <div>
                              <span className="text-[9px] text-zinc-400 block font-mono font-bold">TRAVELER NAME</span>
                              <span className="text-black font-semibold font-sans">{tr.fullName || 'Alex Davis'}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-400 block font-mono font-bold">PASSPORT REFERENCE</span>
                              <span className="text-black font-mono">{tr.passportNumber || 'AB101010'}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-400 block font-mono font-bold">TOUR START DATE</span>
                              <span className="text-black font-sans">{startDate}</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-zinc-400 block font-mono font-bold">TOUR END DATE</span>
                              <span className="text-black font-sans">{endDate}</span>
                            </div>
                          </div>

                          {/* Extra info */}
                          <div className="flex justify-between items-end pt-3">
                            <div>
                              <span className="text-[8px] text-zinc-400 font-mono block">VOYAGE GATEWAY ASSIGNED</span>
                              <span className="text-xs font-mono font-bold text-zinc-800">GATE 14_B (Tarmac Executive Sprinter Escalade)</span>
                            </div>
                          </div>
                        </div>

                        {/* Pass Right coupon segment */}
                        <div className="pt-6 md:pt-0 md:pl-10 md:w-44 flex flex-col justify-between border-t border-zinc-100 md:border-none mt-4 md:mt-0">
                          <div className="text-left">
                            <span className="text-[8px] text-zinc-400 font-mono block">SEAT CODE</span>
                            <span className="text-3xl font-bold font-sans tracking-tight text-emerald-600 block">{tr.seat || 'Pending'}</span>
                            <span className="text-[8px] text-indigo-400 tracking-wider font-mono uppercase bg-indigo-50 px-1 py-0.5 rounded font-semibold">Priority Board</span>
                          </div>

                          {/* Barcode representation */}
                          <div className="pt-4">
                            <div className="flex space-x-0.5 items-end h-10 w-full overflow-hidden bg-zinc-50 p-1 rounded border border-zinc-100">
                              {[1, 3, 2, 4, 1, 3, 1, 2, 4, 2, 1, 3, 4, 1, 2, 3, 4, 1, 1, 3].map((height, i) => (
                                <div
                                  key={i}
                                  className="bg-black flex-1"
                                  style={{ height: `${height * 20}%` }}
                                />
                              ))}
                            </div>
                            <span className="text-[8px] font-mono text-zinc-400 block text-center mt-1">Ref: {confirmedBooking.bookingRef}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Summary Column Pricing Invoice Side board */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Tour Visual Snapshot */}
              <div className="bg-zinc-950 rounded-2xl border border-zinc-850 p-4">
                <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                  <img
                    src={destination.heroImage}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white font-sans font-bold text-xs">
                    {destination.name}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 space-y-1 block leading-relaxed">
                  <div>📍 Location: {destination.country}</div>
                  <div>⏳ Duration: {destination.durationDays} Days / {destination.durationDays - 1} Nights</div>
                  <div>💼 Service level: 24/7 dedicated personal guide Included</div>
                </div>
              </div>

              {/* invoice pricing summary boards */}
              <div className="bg-zinc-950/80 rounded-2xl border border-zinc-850 p-5 space-y-4">
                <h4 className="text-white text-xs uppercase font-mono tracking-wider font-bold border-b border-zinc-800 pb-2 flex items-center justify-between">
                  <span>Price Ledger</span>
                  <span className="text-emerald-400 font-bold">{totalGuests} traveler{totalGuests > 1 ? 's' : ''}</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Base {classType} package:</span>
                    <span className="text-white font-mono">${basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Taxes & transfers (8%):</span>
                    <span className="text-white font-mono">${taxPrice}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-850 pb-2">
                    <span className="text-zinc-400">Premium Add-ons:</span>
                    <span className="text-white font-mono">${addonsPrice}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-white font-bold">Grand Overall Total:</span>
                    <span className="text-emerald-400 font-bold font-sans text-base">${overallPrice} USD</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge Guarantee */}
              <div className="p-4 bg-zinc-950/50 rounded-2xl border border-zinc-850 text-left text-xs space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold font-sans">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Voyage Guarantee</span>
                </div>
                <p className="text-zinc-500 text-[10px] leading-relaxed font-sans">
                  No hidden airport landing fees, transparent pricing structure, 100% money back safety protocol if airport conditions cancel departures.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Wizard Footer Control navigation strip */}
        <div id="booking-wizard-controls" className="bg-zinc-950 p-6 border-t border-zinc-800 flex justify-between">
          <div>
            {step > 1 && step < 6 && (
              <button
                id="booking-back-btn"
                onClick={() => setStep(step - 1)}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white text-zinc-300 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Go Back</span>
              </button>
            )}
          </div>

          <div>
            {step === 1 && (
              <button
                id="booking-step1-next"
                onClick={() => { if (validateStep1()) setStep(2); }}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center space-x-2"
              >
                <span>Traveler Credentials</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 2 && (
              <button
                id="booking-step2-next"
                onClick={() => { if (validateStep2()) setStep(3); }}
                disabled={!validateStep2()}
                className={`text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl flex items-center space-x-2 ${
                  validateStep2()
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-850'
                }`}
              >
                <span>Select Seating Map</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                id="booking-step3-next"
                onClick={() => { if (validateStep3()) setStep(4); }}
                disabled={!validateStep3()}
                className={`text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl flex items-center space-x-2 ${
                  validateStep3()
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-850'
                }`}
              >
                <span>Review Upgrades</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 4 && (
              <button
                id="booking-step4-next"
                onClick={() => setStep(5)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center space-x-2"
              >
                <span>Confirm & Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 5 && (
              <button
                id="booking-step5-next"
                onClick={() => { if (validateStep5()) handleCheckoutSubmit(); }}
                disabled={!validateStep5() || isProcessingPayment}
                className={`text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl flex items-center space-x-2 ${
                  validateStep5() && !isProcessingPayment
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-850'
                }`}
              >
                <span>Authorize & Pay</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step === 6 && (
              <button
                id="booking-step6-next"
                onClick={handleFinish}
                className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center space-x-2"
              >
                <span>Finish & Close</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
