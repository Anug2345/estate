export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  garage: number;
  sqft: number;
  image: string;
  type: 'Villa' | 'Penthouse' | 'Apartment' | 'Mansion';
  badge?: string;
  isFavorite?: boolean;
  rating?: number;
  yearBuilt?: number;
  description?: string;
  features?: string[];
  coordinates: { x: number; y: number }; // percentage coordinates for our interactive styled map
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  image: string;
  phone: string;
  email: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  iconName: string; // Dynamic Lucide Icon name
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  spanClass: string; // Tailwind grid span class for Pinterest Masonry
}
