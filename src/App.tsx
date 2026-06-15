import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DestinationCard from './components/DestinationCard';
import DestinationDetails from './components/DestinationDetails';
import BookingModal from './components/BookingModal';
import MyTrips from './components/MyTrips';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import { DESTINATIONS } from './data/destinations';
import { Destination, Booking } from './types';
import { Compass, Sparkles, Filter, Smile, HelpCircle, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'my-trips' | 'about'>('explore');
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(4000);

  // Modal active states
  const [selectedDetail, setSelectedDetail] = useState<Destination | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Destination | null>(null);

  // Custom alert system
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Theme state: defaults to 'night' as requested
  const [theme, setTheme] = useState<'night' | 'day'>(() => {
    try {
      const stored = localStorage.getItem('voyage_theme');
      return (stored === 'day' || stored === 'night') ? stored : 'night';
    } catch {
      return 'night';
    }
  });

  // Keep root classes in sync with high performance transitions
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (theme === 'day') {
        root.classList.add('theme-day');
        root.classList.remove('theme-night');
      } else {
        root.classList.add('theme-night');
        root.classList.remove('theme-day');
      }
      localStorage.setItem('voyage_theme', theme);
    } catch (e) {
      console.warn("Error setting theme class:", e);
    }
  }, [theme]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('voyage_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to read local storage bookings:", e);
    }
  }, []);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Safe reservation write
  const saveBookings = (updatedList: Booking[]) => {
    setBookings(updatedList);
    try {
      localStorage.setItem('voyage_bookings', JSON.stringify(updatedList));
    } catch (e) {
      console.error("Failed to persist bookings:", e);
    }
  };

  // Submit final reservation from wizard
  const handleConfirmBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    saveBookings(updated);
    setSelectedBooking(null);
    addToast(`Voyage reservation ${newBooking.bookingRef} successfully secured!`, 'success');
    setActiveTab('my-trips');
  };

  // Cancel reservation
  const handleCancelBooking = (id: string) => {
    const originalBooking = bookings.find(b => b.id === id);
    const updated = bookings.filter((b) => b.id !== id);
    saveBookings(updated);
    addToast(
      `Voyage reservation ${originalBooking?.bookingRef || ''} canceled. Refund request processed instantly.`,
      'info'
    );
  };

  // Shortcut triggers
  const handleFeaturedTagClick = (tag: string) => {
    setSearchQuery(tag);
    addToast(`Filtered by tag: ${tag}`, 'info');
    const elem = document.getElementById('excursions-grid-header');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setMaxPrice(4000);
    addToast('Filters reset successfully', 'info');
  };

  // Route back to grid
  const handleExploreHotspots = () => {
    setActiveTab('explore');
    setTimeout(() => {
      const el = document.getElementById('excursions-grid-header');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Instant booking button trigger
  const handleOpenQuickBook = () => {
    setSelectedBooking(DESTINATIONS[0]);
    addToast(`Initializing instant checkout for ${DESTINATIONS[0].name}`, 'info');
  };

  // Filter coordinates
  const filteredDestinations = DESTINATIONS.filter((d) => {
    const text = searchQuery.toLowerCase().trim();
    const matchSearch =
      text === '' ||
      d.name.toLowerCase().includes(text) ||
      d.country.toLowerCase().includes(text) ||
      d.tagline.toLowerCase().includes(text) ||
      d.description.toLowerCase().includes(text) ||
      d.tags.some((tag) => tag.toLowerCase().includes(text));

    const matchCategory = selectedCategory === 'ALL' || d.adventureLevel === selectedCategory;
    const matchPrice = d.price <= maxPrice;

    return matchSearch && matchCategory && matchPrice;
  });

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Absolute floating notifications alerts system */}
      <div id="toast-container" className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            id={toast.id}
            className="p-4 rounded-xl border bg-zinc-900/95 backdrop-blur-md shadow-2xl flex items-start space-x-3 pointer-events-auto animate-fade-in"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Smile className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
            <span className="text-xs text-zinc-200 font-sans leading-relaxed">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Global Transparent Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookingCount={bookings.length}
        onOpenQuickBook={handleOpenQuickBook}
        theme={theme}
        onToggleTheme={() => {
          const nextTheme = theme === 'night' ? 'day' : 'night';
          setTheme(nextTheme);
          addToast(
            `Voyage ambiance set to ${nextTheme === 'night' ? 'Celestial Night 🌌' : 'Off-White Day Mode ☀️'}`,
            'info'
          );
        }}
      />

      {/* Primary tab views routing routing */}
      <main id="main-portal-body" className="flex-1">
        
        {/* EXPLORE LANDING VIEW */}
        {activeTab === 'explore' && (
          <div id="tab-explore-pane">
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onQuickSearch={() => {
                const el = document.getElementById('excursions-grid-header');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                addToast('Searching custom travel map coordinates...', 'info');
              }}
            />

            {/* Featured Tags Filter Strip row under hero */}
            <div className="bg-zinc-900/30 border-y border-zinc-900 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider font-bold">
                  Quick-Filter Tags:
                </span>
                <div id="quick-filter-tags-row" className="flex flex-wrap gap-2 justify-center">
                  {['Culture', 'Coastal', 'Scenic', 'Active', 'Nature', 'Wildlife', 'Luxury', 'Romance'].map((tag) => (
                    <button
                      key={tag}
                      id={`featured-tag-btn-${tag}`}
                      onClick={() => handleFeaturedTagClick(tag)}
                      className="bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-emerald-400 text-[10px] font-mono uppercase px-3 py-1.5 rounded-full border border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Destination Explorer Grid */}
            <section id="excursions-grid-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header Title sector details */}
              <div id="excursions-grid-header" className="border-b border-zinc-900 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left scroll-mt-24">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="uppercase font-semibold tracking-wider">Curated Latitude Index</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white">
                    Our Handpicked Sanctuaries
                  </h2>
                  <p className="text-zinc-400 text-sm mt-1 max-w-xl">
                    Six micro-climates engineered with six-star boutique log chalets, custom yachts, and personal master naturalists.
                  </p>
                </div>

                {/* Counter indicator and resets */}
                <div className="text-right text-[10px] font-mono text-zinc-500">
                  Showing <span className="text-white font-bold">{filteredDestinations.length}</span> out of {DESTINATIONS.length} spots
                  {(searchQuery !== '' || selectedCategory !== 'ALL' || maxPrice < 4000) && (
                    <button
                      id="reset-filters-grid-btn"
                      onClick={handleResetFilters}
                      className="text-emerald-400 ml-4 font-bold border-b border-emerald-500/20 hover:text-emerald-300 font-mono cursor-pointer uppercase"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Grid content mapping destination cards */}
              {filteredDestinations.length === 0 ? (
                <div id="no-filtered-results" className="text-center py-20 bg-zinc-900/30 border border-zinc-900 rounded-2xl max-w-lg mx-auto">
                  <span className="text-zinc-600 block text-3xl mb-3">📍</span>
                  <h3 className="text-zinc-300 font-bold font-sans">No travel zones matched</h3>
                  <p className="text-zinc-500 text-xs mt-1 max-w-xs mx-auto mb-6 leading-relaxed">
                    Adjust your price limit, change your adventure level select, or reset search terms to query our locations.
                  </p>
                  <button
                    id="grid-search-reset-btn"
                    onClick={handleResetFilters}
                    className="bg-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white px-4 py-2 border border-zinc-800 rounded-xl text-xs font-mono uppercase font-semibold transition-colors"
                  >
                    Reset Grid filters
                  </button>
                </div>
              ) : (
                <div id="destinations-cards-display-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onExplore={(d) => {
                        setSelectedDetail(d);
                        addToast(`Retrieving full itinerary portfolio for ${d.name}...`, 'info');
                      }}
                      onBook={(d) => {
                        setSelectedBooking(d);
                        addToast(`Configuring booking ledger for ${d.name}...`, 'info');
                      }}
                    />
                  ))}
                </div>
              )}

            </section>

            {/* Immersive CTA parallax-like middle divider block */}
            <section id="banner-custom-charter" className="relative py-24 bg-zinc-950 overflow-hidden text-center border-t border-zinc-900">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
              <div className="relative z-10 max-w-4xl mx-auto px-4">
                <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest block mb-3">Custom Air Charter Solutions</span>
                <h3 className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight mb-4">
                  Unscheduled Flights to Untamed Wilderness
                </h3>
                <p className="text-zinc-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
                  We maintain strategic partnerships with Cessna Citation and Dassault Falcon. Skip regional hub delays — our bespoke packages include direct transfer landing clearances straight to pristine locations.
                </p>
                <button
                  id="cta-instant-inquire-btn"
                  onClick={() => {
                    alert("A VIP Voyage Air liaison will reach out to your registered profile within 15 minutes.");
                    addToast("VIP Inquiry scheduled successfully", "success");
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] inline-flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Inquire Private Passage</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </section>
          </div>
        )}

        {/* MY PASS TRIP DASHBOARD TAB */}
        {activeTab === 'my-trips' && (
          <MyTrips
            bookings={bookings}
            onCancelBooking={handleCancelBooking}
            onExploreHotspots={handleExploreHotspots}
          />
        )}

        {/* CREED ABOUT US MANIFESTO VIEW */}
        {activeTab === 'about' && <AboutUs />}

      </main>

      {/* Global Corporate Footer board */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* OVERLAY MODAL: DESTINATION DEEP DETAILED ITINERARY */}
      {selectedDetail && (
        <DestinationDetails
          destination={selectedDetail}
          onClose={() => setSelectedDetail(null)}
          onBook={(d) => {
            setSelectedDetail(null);
            setSelectedBooking(d);
          }}
        />
      )}

      {/* OVERLAY MODAL: MULTI-STEP RESERVATION WIZARD ENGINE */}
      {selectedBooking && (
        <BookingModal
          destination={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

    </div>
  );
}
