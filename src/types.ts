export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: string[];
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  rating: number;
  reviewsCount: number;
  description: string;
  price: number; // base price in USD
  durationDays: number;
  tags: string[];
  heroImage: string;
  gallery: string[];
  highlights: Highlight[];
  itinerary: DayItinerary[];
  adventureLevel: 'Relaxing' | 'Moderate' | 'Challenging';
  climate: string;
}

export interface GuestCount {
  adults: number;
  children: number;
}

export interface Traveler {
  id: string;
  fullName: string;
  passportNumber: string;
  email: string;
  phone: string;
  seat: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  guests: GuestCount;
  classType: 'economy' | 'business' | 'first';
  travelers: Traveler[];
  addInsurance: boolean;
  addAirportTransfer: boolean;
  baseAmount: number;
  taxesAmount: number;
  addonsAmount: number;
  discountAmount: number;
  totalAmount: number;
  bookingDate: string;
  paymentStatus: 'paid' | 'pending';
  cardNumberLast4?: string;
}
