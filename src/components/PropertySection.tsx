import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Bed, Bath, Maximize, MapPin, Star, Calendar, X, Mail, Phone, User, CheckCircle } from 'lucide-react';
import { PROPERTIES_DATA } from '../data';
import { Property } from '../types';
import PropertyCard from './PropertyCard';

export default function PropertySection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState<number>(35000000);
  const [selectedBeds, setSelectedBeds] = useState('All');

  // Contact Form inside Dossier
  const [bookName, setBookName] = useState('');
  const [bookEmail, setBookEmail] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookSuccess, setBookSuccess] = useState(false);

  // Unique list of types and locations for filters
  const types = ['All', 'Villa', 'Penthouse', 'Apartment', 'Mansion'];
  const locations = ['All', 'Beverly Hills, CA', 'Manhattan, NY', 'Malibu, CA', 'Aspen, CO', 'Miami, FL', 'Los Angeles, CA'];

  useEffect(() => {
    // Load favorites from local storage
    const savedFavs = localStorage.getItem('aurelia_favs');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
    
    // Simulate initial loading to present the premium skeleton loader
    const timer = setTimeout(() => {
      setProperties(PROPERTIES_DATA);
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click opening detail
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('aurelia_favs', JSON.stringify(updated));
  };

  const handleFilterSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = PROPERTIES_DATA.filter((prop) => {
        const matchesSearch = 
          prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prop.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || prop.type === selectedType;
        const matchesLocation = selectedLocation === 'All' || prop.location === selectedLocation;
        const matchesPrice = prop.price <= priceRange;
        const matchesBeds = selectedBeds === 'All' || prop.beds.toString() === selectedBeds;

        return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesBeds;
      });
      setProperties(filtered);
      setIsLoading(false);
    }, 800);
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setSelectedType('All');
    setSelectedLocation('All');
    setPriceRange(35000000);
    setSelectedBeds('All');
    setTimeout(() => {
      setProperties(PROPERTIES_DATA);
      setIsLoading(false);
    }, 600);
  };

  const handleBookViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail || !bookPhone) return;
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
      setBookName('');
      setBookEmail('');
      setBookPhone('');
    }, 4000);
  };

  return (
    <section id="properties" className="py-24 px-6 md:px-12 bg-luxury-bg dark:bg-[#151515] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            The Collection
          </motion.span>
          <motion.h2
            className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Curated Masterpieces
          </motion.h2>
        </div>

        {/* Filter Bar Panel */}
        <motion.div
          className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 p-6 md:p-8 rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.04)] mb-12 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            
            {/* Search query input */}
            <div className="lg:col-span-2">
              <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                Search Estate / Keywords
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Pavilion, Penthouse, Malibu..."
                  className="w-full pl-11 pr-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                />
              </div>
            </div>

            {/* Type selector */}
            <div>
              <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
              >
                {types.map((t) => (
                  <option key={t} value={t} className="dark:bg-[#111111]">
                    {t === 'All' ? 'All Types' : t}
                  </option>
                ))}
              </select>
            </div>

            {/* Location selector */}
            <div>
              <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all animate-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="dark:bg-[#111111]">
                    {loc === 'All' ? 'All Locations' : loc.split(',')[0]}
                  </option>
                ))}
              </select>
            </div>

            {/* Beds selector */}
            <div>
              <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                Bedrooms
              </label>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
              >
                <option value="All" className="dark:bg-[#111111]">All Beds</option>
                <option value="3" className="dark:bg-[#111111]">3 Bedrooms</option>
                <option value="4" className="dark:bg-[#111111]">4 Bedrooms</option>
                <option value="5" className="dark:bg-[#111111]">5 Bedrooms</option>
                <option value="6" className="dark:bg-[#111111]">6 Bedrooms</option>
              </select>
            </div>

          </div>

          {/* Price Slider Block */}
          <div className="mt-8 pt-6 border-t border-luxury-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="w-full sm:max-w-md">
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-mono text-[9px] tracking-widest text-[#777777] uppercase">Price Cap</span>
                <span className="font-mono text-xs font-bold text-[#C8A96A]">${(priceRange / 1000000).toFixed(1)} Million</span>
              </div>
              <input
                type="range"
                min="5000000"
                max="35000000"
                step="500000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C8A96A] h-1 bg-luxury-bg dark:bg-[#111111] rounded-lg cursor-pointer"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4 w-full sm:w-auto justify-end">
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 border border-luxury-black/10 dark:border-white/10 hover:border-luxury-black/20 dark:hover:border-white/20 text-luxury-muted dark:text-gray-400 hover:text-luxury-black dark:hover:text-white rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleFilterSearch}
                className="px-8 py-3.5 bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_4px_14px_rgba(200,169,106,0.2)] cursor-pointer"
              >
                Search Estate
              </button>
            </div>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-10">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <div className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 rounded-[24px] overflow-hidden flex flex-col justify-between h-[450px] relative shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
                    <div>
                      {/* Property Image Shimmer */}
                      <div className="relative aspect-[16/11] bg-[#ecebeb] dark:bg-[#252525] overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full animate-shimmer" />
                      </div>

                      {/* Property Meta info Shimmer */}
                      <div className="p-6 pb-4 space-y-4">
                        {/* Location tag shimmer */}
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#ecebeb] dark:bg-[#2a2a2a] animate-pulse" />
                          <div className="h-2.5 w-24 bg-[#ecebeb] dark:bg-[#2a2a2a] rounded animate-pulse" />
                        </div>
                        
                        {/* Title shimmer */}
                        <div className="h-6 w-3/4 bg-[#ecebeb] dark:bg-[#2a2a2a] rounded animate-pulse" />
                        
                        {/* Description shimmer */}
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-[#f3f2f2] dark:bg-[#222222] rounded animate-pulse" />
                          <div className="h-3 w-5/6 bg-[#f3f2f2] dark:bg-[#222222] rounded animate-pulse" />
                        </div>
                      </div>
                    </div>

                    {/* Specs shimmer row */}
                    <div className="px-6 pb-6 pt-4 border-t border-luxury-black/5 dark:border-white/5">
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex flex-col items-center space-y-1.5">
                            <div className="h-2 w-8 bg-[#f3f2f2] dark:bg-[#222222] rounded animate-pulse" />
                            <div className="h-4 w-12 bg-[#ecebeb] dark:bg-[#2a2a2a] rounded animate-pulse" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              properties.map((prop, idx) => (
                <PropertyCard
                  key={prop.id}
                  prop={prop}
                  idx={idx}
                  isFav={favorites.includes(prop.id)}
                  toggleFavorite={toggleFavorite}
                  setSelectedProperty={setSelectedProperty}
                />
              ))
            )}
          </AnimatePresence>

          {!isLoading && properties.length === 0 && (
            <div className="col-span-full bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 py-16 px-6 rounded-[24px] text-center">
              <span className="font-serif text-lg text-[#777777] dark:text-gray-400 block mb-4">
                No matching residences located in our active private portfolio.
              </span>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-[#C8A96A] text-[#111111] rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase font-mono cursor-pointer"
              >
                Restore Base Portfolio
              </button>
            </div>
          )}
        </div>

      </div>

      {/* PROPERTY DOSSIER SLIDE-OVER MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            id="dossier-overlay"
            className="fixed inset-0 z-9999 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop click closer */}
            <div 
              className="absolute inset-0 bg-[#111111]/85 backdrop-blur-sm"
              onClick={() => {
                setSelectedProperty(null);
                window.document.body.style.overflow = 'auto';
              }}
            />

            {/* Panel slider container */}
            <motion.div
              id="dossier-panel"
              className="relative w-full max-w-2xl bg-white dark:bg-[#121212] h-full shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-y-auto no-scrollbar flex flex-col justify-between border-l border-luxury-black/5 dark:border-white/5 z-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            >
              {/* Top Banner Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden border-b border-luxury-black/5 dark:border-white/5">
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
                
                {/* Floating controls inside */}
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    window.document.body.style.overflow = 'auto';
                  }}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-luxury-black/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#C8A96A] border border-white/15 transition-transform hover:scale-105 cursor-pointer"
                  aria-label="Close dossier"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                  <div>
                    <span className="font-mono text-[9px] text-[#C8A96A] tracking-[0.2em] uppercase font-bold bg-[#111111]/80 backdrop-blur-md border border-[#C8A96A]/20 px-3.5 py-1.5 rounded-full mb-2.5 inline-block">
                      {selectedProperty.type} Dossier
                    </span>
                    <h4 className="font-serif text-3xl font-light tracking-tight mt-1">
                      {selectedProperty.title}
                    </h4>
                  </div>
                  <div className="font-serif text-2xl text-[#C8A96A] font-light">
                    ${selectedProperty.price.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-8 md:p-10 flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-luxury-black/5 dark:border-white/5">
                  <div className="md:col-span-2">
                    <h5 className="font-mono text-[10px] tracking-widest text-[#777777] uppercase mb-4">
                      Architectural Vision
                    </h5>
                    <p className="text-xs text-[#1A1A1A] dark:text-gray-300 leading-relaxed font-light">
                      {selectedProperty.description}
                    </p>
                  </div>
                  
                  {/* Rating / Year details */}
                  <div className="bg-luxury-bg dark:bg-[#1a1a1a] p-4 rounded-2xl border border-luxury-black/5 dark:border-white/5 text-center flex flex-col justify-center items-center">
                    <span className="font-mono text-[8px] text-[#777777] uppercase tracking-widest mb-1.5">Rating Score</span>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-[#C8A96A] text-[#C8A96A]" />
                      <span className="font-mono text-sm text-luxury-black dark:text-white font-bold">{selectedProperty.rating}</span>
                    </div>
                    <span className="font-mono text-[8px] text-[#777777] uppercase tracking-widest mt-1.5 border-t border-luxury-black/5 dark:border-white/5 pt-2 w-full block">Built Year</span>
                    <span className="font-mono text-xs text-luxury-black dark:text-white font-bold mt-1">{selectedProperty.yearBuilt}</span>
                  </div>
                </div>

                {/* Grid Technical Specifications */}
                <div className="mb-10">
                  <h5 className="font-mono text-[10px] tracking-widest text-[#777777] uppercase mb-5">
                    TECHNICAL PARAMETERS
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-6 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-2xl">
                    <div className="text-center sm:border-r border-luxury-black/5 dark:border-white/5">
                      <span className="font-mono text-[9px] text-[#777777] block uppercase">Bedrooms</span>
                      <span className="font-mono text-sm text-luxury-black dark:text-white font-bold mt-1 block">{selectedProperty.beds}</span>
                    </div>
                    <div className="text-center sm:border-r border-luxury-black/5 dark:border-white/5">
                      <span className="font-mono text-[9px] text-[#777777] block uppercase">Bathrooms</span>
                      <span className="font-mono text-sm text-luxury-black dark:text-white font-bold mt-1 block">{selectedProperty.baths}</span>
                    </div>
                    <div className="text-center sm:border-r border-luxury-black/5 dark:border-white/5">
                      <span className="font-mono text-[9px] text-[#777777] block uppercase">Garage Bays</span>
                      <span className="font-mono text-sm text-luxury-black dark:text-white font-bold mt-1 block">{selectedProperty.garage} Bays</span>
                    </div>
                    <div className="text-center">
                      <span className="font-mono text-[9px] text-[#777777] block uppercase">Total Area</span>
                      <span className="font-mono text-sm text-luxury-black dark:text-white font-bold mt-1 block">{selectedProperty.sqft} SQFT</span>
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-10">
                  <h5 className="font-mono text-[10px] tracking-widest text-[#777777] uppercase mb-4">
                    PREMIUM FEATURES
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pl-1">
                    {selectedProperty.features?.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#C8A96A]" />
                        <span className="text-xs text-luxury-black dark:text-gray-300 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="border-t border-luxury-black/5 dark:border-white/5 pt-8">
                  <h5 className="font-serif text-xl font-light text-luxury-black dark:text-white mb-2">
                    Arrange Private Viewing
                  </h5>
                  <p className="text-[11px] text-[#777777] mb-6 font-light">
                    Submit coordinates, and our senior architectural consultant will contact you privately within 1 hour.
                  </p>

                  {bookSuccess ? (
                    <motion.div
                      className="bg-[#C8A96A]/10 border border-[#C8A96A]/30 p-5 rounded-2xl flex items-center gap-4 text-[#C8A96A]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <CheckCircle className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <h6 className="font-mono text-[11px] font-bold tracking-wider uppercase">Viewing Request Filed</h6>
                        <p className="text-[10px] opacity-80 mt-1">A private dossier confirmation code has been dispatched to your email address.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleBookViewing} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="relative">
                          <User className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                          <input
                            type="text"
                            required
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            placeholder="Full Name"
                            className="w-full pl-11 pr-4 py-3 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                          <input
                            type="email"
                            required
                            value={bookEmail}
                            onChange={(e) => setBookEmail(e.target.value)}
                            placeholder="Email Address"
                            className="w-full pl-11 pr-4 py-3 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777]" />
                          <input
                            type="tel"
                            required
                            value={bookPhone}
                            onChange={(e) => setBookPhone(e.target.value)}
                            placeholder="Phone Coordinate"
                            className="w-full pl-11 pr-4 py-3 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs tracking-wider text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] py-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_5px_15px_rgba(200,169,106,0.25)] cursor-pointer"
                      >
                        File Viewing Mandate
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
