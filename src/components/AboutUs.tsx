import React, { useState } from 'react';
import { Compass, ShieldCheck, Heart, Users, Sparkles, AlertCircle, Quote, Smile } from 'lucide-react';

const REVIEWS_FEEDBACKS = [
  {
    name: "Dr. Evelyn Cartwright",
    city: "London, UK",
    text: "My custom Kyoto Sanctuary retreat was flawless. From boarding the private local yacht to learning organic matcha preparation in a hidden temple machiya townhouse under the direct mentorship of a senior Zen abbot, Voyage Travels has created a standard of travel which simply cannot be found anywhere else.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Marcus Vance",
    city: "San Francisco, USA",
    text: "Trekking the Amalfi cliff paths with their local geologist guide and ending with a private hands-on Limoncello distillation on a vertical cliff organic terrace was beyond words. Voyage makes sure every second avoids typical mass tourism traps and stays purely authentic.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Isabella Vang",
    city: "Copenhagen, Denmark",
    text: "The super-jeep glacier cave traversal on Myrdalsjökull was a dream! Our master glaciologist guided us to ancient turquoise ice halls that felt absolutely prehistoric. Total premium safety mixed with stunning geological adrenaline. The virtual boarding pass tickets processed instantly too.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

export default function AboutUs() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section id="about-us-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      
      {/* Structural Vision Headline */}
      <div className="border-b border-zinc-800 pb-8 mb-16 max-w-3xl">
        <span className="text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full uppercase font-bold inline-flex items-center mb-4">
          <Compass className="w-3.5 h-3.5 mr-1 text-emerald-400" />
          <span>Our Vision & Creed</span>
        </span>
        <h2 className="text-4xl font-bold font-sans tracking-tight text-white leading-tight">
          Redefining Tourism Throgh <span className="text-emerald-400">Deep Earth Preservation</span> & Bespoke Luxury
        </h2>
        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
          At Voyage Travels, we believe travel is not merely passive looking; it is an active, soulful dialogue between visitor and natural sanctuary. Every itinerary we design respects structural local communities, plants native forests, and supports local preservation efforts directly.
        </p>
      </div>

      {/* Values Grid */}
      <div id="company-values-grid" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between">
          <div className="bg-emerald-500/15 border border-emerald-500/25 p-3 rounded-xl w-max text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="mt-6">
            <h4 className="text-white text-base font-bold font-sans">Bespoke Curation</h4>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
              We decline mass hospitality packages. Each tour is individually designed, securing six-star accommodations, local private drivers, and certified glaciologists, historians, or naturalists.
            </p>
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between">
          <div className="bg-emerald-500/15 border border-emerald-500/25 p-3 rounded-xl w-max text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div className="mt-6">
            <h4 className="text-white text-base font-bold font-sans">Hyper-Local Connection</h4>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
              We connect travelers with true local guardians. Dine inside small family farms, learn delicate arts in multi-generational workshops, and see ancient landmarks without crowded tour queues.
            </p>
          </div>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col justify-between">
          <div className="bg-emerald-500/15 border border-emerald-500/25 p-3 rounded-xl w-max text-emerald-400">
            <Heart className="w-5 h-5" />
          </div>
          <div className="mt-6">
            <h4 className="text-white text-base font-bold font-sans">Carbon Safe Preservation</h4>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
              Every trip purchased funds a fully offset gold-standard native planting program. We compensate three times the aviation emissions generated per seat with trace-monitored forest projects.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-zinc-950 p-8 sm:p-12 rounded-3xl border border-zinc-850 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Testimonial Quote left panel */}
        <div className="lg:col-span-8 space-y-6">
          <Quote className="w-10 h-10 text-emerald-500/20" />
          <p className="text-zinc-100 text-base sm:text-lg leading-relaxed font-sans font-medium italic">
            "{REVIEWS_FEEDBACKS[activeTestimonial].text}"
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700">
              <img
                src={REVIEWS_FEEDBACKS[activeTestimonial].avatar}
                alt={REVIEWS_FEEDBACKS[activeTestimonial].name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-white text-xs font-bold block">{REVIEWS_FEEDBACKS[activeTestimonial].name}</span>
              <span className="text-zinc-500 text-[10px] font-mono uppercase">{REVIEWS_FEEDBACKS[activeTestimonial].city}</span>
            </div>
          </div>
        </div>

        {/* Picker panel right side */}
        <div className="lg:col-span-4 border-l border-zinc-850 lg:pl-8 space-y-3.5">
          <span className="text-zinc-500 text-[10px] font-mono uppercase block font-bold">Pristine Voyager Stories</span>
          <div className="flex flex-col gap-2.5">
            {REVIEWS_FEEDBACKS.map((review, idx) => (
              <button
                key={idx}
                id={`testimonial-switch-${idx}`}
                onClick={() => setActiveTestimonial(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeTestimonial === idx
                    ? 'bg-zinc-900 border-emerald-500/50 text-emerald-400'
                    : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:bg-zinc-900/50'
                }`}
              >
                <span className="text-xs font-bold block text-white">{review.name}</span>
                <span className="text-[9px] font-mono uppercase">{review.city}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
