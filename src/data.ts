import { Property, Agent, Testimonial, FAQ, Service, GalleryItem } from './types';

export const HERO_VIDEO_URL = 'https://res.cloudinary.com/ebdirtqy/video/upload/v1783985385/make_this_image_move_202607140000_nxfq8h.mp4';
export const SHOWCASE_VIDEO_URL = 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-and-palm-trees-41484-large.mp4';
export const HERO_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80';
export const SHOWCASE_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80';

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'prop-1',
    title: 'The Obsidian Pavilion',
    price: 18500000,
    location: 'Beverly Hills, CA',
    beds: 5,
    baths: 6,
    garage: 4,
    sqft: 8500,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    type: 'Villa',
    badge: 'Trending',
    rating: 4.9,
    yearBuilt: 2024,
    description: 'A masterpiece of architectural symmetry, featuring sweeping floor-to-ceiling glass, floating concrete structures, and an automated infinity edge pool overlooking the canyon.',
    features: ['Automated Smart Home', 'Wellness Wing', 'Sub-Zero Appliances', '120-Bottle Wine Cellar', 'Private Helipad Access'],
    coordinates: { x: 28, y: 34 }
  },
  {
    id: 'prop-2',
    title: 'Aether Skyline Penthouse',
    price: 24000000,
    location: 'Manhattan, NY',
    beds: 4,
    baths: 4.5,
    garage: 2,
    sqft: 6200,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    type: 'Penthouse',
    badge: 'Exclusive',
    rating: 5.0,
    yearBuilt: 2025,
    description: 'Suspended in the clouds, this dual-story penthouse offers unparalleled 360-degree views of the cityscape, finished with hand-cut Calacatta marble and custom solid brass fixtures.',
    features: ['Wrap-around Terrace', 'Private Private Elevator', 'Wellness Sauna', '24/7 Concierge', 'Chef-grade Kitchen'],
    coordinates: { x: 62, y: 22 }
  },
  {
    id: 'prop-3',
    title: 'Lumina Sea Estate',
    price: 32000000,
    location: 'Malibu, CA',
    beds: 6,
    baths: 8,
    garage: 6,
    sqft: 12400,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    type: 'Mansion',
    badge: 'Iconic',
    rating: 4.95,
    yearBuilt: 2023,
    description: 'Stretching along 150 feet of pristine Malibu shoreline, Lumina Sea merges organic modernism with the rhythm of the tides, incorporating native stone walls and massive structural cantilevers.',
    features: ['Private Beach Cove', 'Indoor Saltwater Pool', 'Home Cinema', 'State-of-the-art Gym', 'Separate Guest House'],
    coordinates: { x: 44, y: 68 }
  },
  {
    id: 'prop-4',
    title: 'The Brutalist Sanctuary',
    price: 14200000,
    location: 'Aspen, CO',
    beds: 4,
    baths: 5,
    garage: 3,
    sqft: 7100,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    type: 'Villa',
    badge: 'New Architecture',
    rating: 4.85,
    yearBuilt: 2024,
    description: 'A poetic blend of exposed board-formed concrete and warm local cedar. Nestled in a private grove, this ski-in, ski-out retreat responds gracefully to the rugged mountain peaks.',
    features: ['Ski-in / Ski-out', 'Heated Outdoor Terrace', 'Double-height Fireplace', 'Geothermal Heating', 'Outdoor Cedar Hot Tub'],
    coordinates: { x: 78, y: 52 }
  },
  {
    id: 'prop-5',
    title: 'Verdant Glasshouse',
    price: 8900000,
    location: 'Miami, FL',
    beds: 3,
    baths: 3.5,
    garage: 2,
    sqft: 4500,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    type: 'Apartment',
    badge: 'Design Award',
    rating: 4.8,
    yearBuilt: 2024,
    description: 'An oasis of biophilic design. Lush tropical flora surrounds a fully glazed, steel-framed frame, allowing natural light to wash over wide-plank European oak floors.',
    features: ['Integrated Biophilic Landscaping', 'Smart Tinting Glass', 'Zero-emission Materials', 'Rooftop Solarium', 'Dock Slip Included'],
    coordinates: { x: 18, y: 72 }
  },
  {
    id: 'prop-6',
    title: 'Atrium of Light',
    price: 21000000,
    location: 'Los Angeles, CA',
    beds: 5,
    baths: 7,
    garage: 5,
    sqft: 9800,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    type: 'Mansion',
    badge: 'Cover Feature',
    rating: 4.92,
    yearBuilt: 2025,
    description: 'Designed around a spectacular central open-air atrium with a mature olive tree, this architectural tour de force bridges indoor luxury and organic landscaping seamlessly.',
    features: ['Central Olive Atrium', 'Acoustic Soundstage Lounge', 'Zen Meditation Deck', 'Dual Master Suites', 'Custom Terrazzo Flooring'],
    coordinates: { x: 52, y: 42 }
  }
];

export const AGENTS_DATA: Agent[] = [
  {
    id: 'agent-1',
    name: 'Alessia Vance',
    role: 'Principal Partner & Founder',
    experience: '16+ Years',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    phone: '+234 814 197 2357',
    email: 'gomezanu@gmail.com',
    socials: {
      instagram: 'https://instagram.com/alessia_vance',
      linkedin: 'https://linkedin.com/in/alessia-vance',
      twitter: 'https://twitter.com/alessiavance'
    }
  },
  {
    id: 'agent-2',
    name: 'Julian Sterling',
    role: 'Senior Architectural Advisor',
    experience: '12 Years',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (212) 555-0143',
    email: 'julian@aurelia.luxury',
    socials: {
      instagram: 'https://instagram.com/sterling_realestate',
      linkedin: 'https://linkedin.com/in/julian-sterling'
    }
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    role: 'Global Investment Strategist',
    experience: '9 Years',
    rating: 4.91,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    phone: '+1 (305) 555-0187',
    email: 'elena@aurelia.luxury',
    socials: {
      linkedin: 'https://linkedin.com/in/elena-rostova',
      twitter: 'https://twitter.com/rostova_elena'
    }
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus & Sylvia Thorne',
    role: 'Technology Philanthropists',
    company: 'Thorne Capital',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'Working with this team was an editorial experience. They did not just find us a house; they curated our home. The attention to architectural integrity and custom lifestyle requirements is completely unmatched in our history of acquisitions.'
  },
  {
    id: 'test-2',
    name: 'Sir Arthur Pendelton',
    role: 'Creative Director',
    company: 'Atelier Pendelton',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'The Brutalist Sanctuary was a match made in architectural heaven. The agents have a profound appreciation for spatial dynamics, concrete detailing, and physical light. A flawless transaction from start to absolute finish.'
  },
  {
    id: 'test-3',
    name: 'Chloe Zhang',
    role: 'Art Collector & Venture Partner',
    company: 'Ascent Ventures',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'The team managed our multi-million dollar acquisition with complete discretion and perfect elegance. Their network is extraordinary, opening doors to masterpieces that never even see the open public listing.'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'serv-1',
    title: 'Bespoke Acquisition',
    iconName: 'Compass',
    description: 'We represent buyers in sourcing architectural masterpieces, leveraging off-market databases and deep connections with world-renowned designers.'
  },
  {
    id: 'serv-2',
    title: 'Couture Marketing',
    iconName: 'Maximize',
    description: 'Positioning elite properties through cinematic production, architectural journals, global media relations, and immersive design showcases.'
  },
  {
    id: 'serv-3',
    title: 'Architectural Advising',
    iconName: 'Building',
    description: 'Evaluating design lineage, structural craftsmanship, historical significance, and future renovation scope for unique luxury developments.'
  },
  {
    id: 'serv-4',
    title: 'Investment Advisory',
    iconName: 'TrendingUp',
    description: 'Conducting advanced portfolio analytics, capital allocation reports, and yield forecasts for high-net-worth real estate investments.'
  },
  {
    id: 'serv-5',
    title: 'Asset Orchestration',
    iconName: 'ShieldCheck',
    description: 'Managing operations of luxury villas and estates, ensuring flawless upkeep, staffing, and regulatory compliance under strict discretion.'
  },
  {
    id: 'serv-6',
    title: 'Legal & Escrow Concierge',
    iconName: 'Scale',
    description: 'Providing absolute legal guidance and secure transactional escrow, specialized in off-market privacy trusts and offshore structures.'
  }
];

export const FAQ_DATA: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do you preserve discretion during off-market transactions?',
    answer: 'We operate under strict Non-Disclosure Agreements (NDAs). Off-market properties are stored in our secure database and only shared with vetted, accredited investors through private secure viewings. We often register properties under unique private trusts or LLCs to shield the identities of our premium clientele.',
    category: 'Privacy'
  },
  {
    id: 'faq-2',
    question: 'Can you assist in sourcing properties before they hit the open market?',
    answer: 'Yes, over 65% of our transactions occur off-market. Through our long-standing relationships with leading architects, estate managers, and developers, we have early insight into upcoming sales and private pocket listings before they are published anywhere.',
    category: 'Acquisitions'
  },
  {
    id: 'faq-3',
    question: 'What architectural styles do you specialize in representing?',
    answer: 'We represent high-end residential monuments. This includes Organic Modernism, mid-century architectural masterpieces (such as Lautner, Neutra), brutalist concrete structures, biophilic smart residences, and historically significant European-style estates.',
    category: 'Design'
  },
  {
    id: 'faq-4',
    question: 'Do you offer virtual high-fidelity walkthroughs for international buyers?',
    answer: 'Yes. We utilize 8K cinematic spatial video, drone-filmed flythroughs, and interactive live architectural video conferences with structural engineers, allowing overseas buyers to evaluate every detail of the residence with perfect confidence.',
    category: 'Technology'
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Obsidian Cantilevers',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-1 row-span-2'
  },
  {
    id: 'gal-2',
    title: 'The Terrazzo Bathing Chamber',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-1 row-span-1'
  },
  {
    id: 'gal-3',
    title: 'Kitchen of the Monoliths',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-1 row-span-1'
  },
  {
    id: 'gal-4',
    title: 'Horizon Lounge',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-2 row-span-1'
  },
  {
    id: 'gal-5',
    title: 'Sea Breeze Terrace',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-1 row-span-2'
  },
  {
    id: 'gal-6',
    title: 'Atrium Courtyard',
    category: 'Exterior',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    spanClass: 'col-span-1 row-span-1'
  }
];

export const RENOVATION_IMAGES = {
  before: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80', // Rustic/unfinished structure
  after: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80' // Beautiful modern glazed kitchen/dining
};
