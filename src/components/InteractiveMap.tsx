import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowUpRight, Bed, Bath, Maximize, X } from 'lucide-react';
import { PROPERTIES_DATA } from '../data';
import { Property } from '../types';

export default function InteractiveMap() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(PROPERTIES_DATA[0]);
  const [hoveredProperty, setHoveredProperty] = useState<Property | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#111111] text-white relative overflow-hidden">
      {/* Grid Blueprint Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Radiant Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#C8A96A]/3 rounded-full blur-[200px]" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#C8A96A]/2 rounded-full blur-[250px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
              Geographical Index
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white">
              Bespoke Portfolio Map
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#777777] max-w-md leading-relaxed">
            Interact with our premium holdings mapped across major luxury zones. Click on the golden pins to examine structural profiles and spatial coordinates.
          </p>
        </div>

        {/* Map Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* MAP DISPLAY (Left/Center col, spans 2) */}
          <div className="lg:col-span-2 relative aspect-[16/10] md:aspect-[16/9] bg-[#161616] rounded-3xl border border-white/5 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
            {/* Architectural Abstract Contour Lines Map (SVG) */}
            <svg className="absolute inset-0 w-full h-full text-white/[0.015] pointer-events-none" viewBox="0 0 1000 600" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M-100,100 C200,80 400,200 600,150 C800,100 900,300 1200,250" />
              <path d="M-100,150 C200,130 400,250 600,200 C800,150 900,350 1200,300" />
              <path d="M-100,200 C200,180 400,300 600,250 C800,200 900,400 1200,350" strokeWidth="1" stroke="currentColor" className="text-white/[0.03]" />
              <path d="M-100,250 C200,230 400,350 600,300 C800,250 900,450 1200,400" />
              <path d="M-100,300 C200,280 400,400 600,350 C800,300 900,500 1200,450" />
              {/* Latitude Lines */}
              <line x1="0" y1="100" x2="1000" y2="100" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              <line x1="0" y1="250" x2="1000" y2="250" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              <line x1="0" y1="400" x2="1000" y2="400" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              <line x1="0" y1="550" x2="1000" y2="550" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              {/* Longitude Lines */}
              <line x1="200" y1="0" x2="200" y2="600" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              <line x1="450" y1="0" x2="450" y2="600" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
              <line x1="700" y1="0" x2="700" y2="600" strokeDasharray="3,8" stroke="white" className="text-white/[0.05]" />
            </svg>

            {/* Ocean abstract coastline shading */}
            <div className="absolute left-0 bottom-0 top-1/2 right-1/4 bg-[#141414]/90 rounded-tr-[150px] border-t border-r border-white/[0.03] pointer-events-none flex items-end p-6">
              <span className="font-mono text-[8px] text-[#777777] tracking-[0.2em] uppercase">PACIFIC OCEAN DIVISION</span>
            </div>

            {/* Coordinates Indicators */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-[#777777] tracking-widest bg-black/40 px-2.5 py-1 rounded border border-white/5 uppercase">
              GRID SCALE: 1 : 25,000
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[8px] text-[#777777] tracking-widest bg-black/40 px-2.5 py-1 rounded border border-white/5 uppercase">
              MAPPED ZONES: CA, NY, CO, FL
            </div>

            {/* Glowing Map Pins */}
            {PROPERTIES_DATA.map((prop) => {
              const isSelected = selectedProperty?.id === prop.id;
              const isHovered = hoveredProperty?.id === prop.id;

              return (
                <div
                  key={prop.id}
                  className="absolute"
                  style={{ left: `${prop.coordinates.x}%`, top: `${prop.coordinates.y}%` }}
                >
                  <button
                    onClick={() => setSelectedProperty(prop)}
                    onMouseEnter={() => setHoveredProperty(prop)}
                    onMouseLeave={() => setHoveredProperty(null)}
                    className="relative group flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 focus:outline-none cursor-pointer"
                    aria-label={`Select ${prop.title}`}
                  >
                    {/* Pulsing halo */}
                    <div className={`absolute w-12 h-12 rounded-full border border-[#C8A96A] transition-all duration-1000 ${
                      isSelected ? 'animate-ping scale-150' : 'scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-40'
                    }`} />

                    {/* Outer ring */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                        ? 'bg-[#C8A96A] text-[#111111] shadow-[0_0_20px_rgba(200,169,106,0.6)] scale-110' 
                        : 'bg-luxury-black border border-[#C8A96A] text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#111111]'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>

                    {/* Tooltip on hover (Desktop) */}
                    <AnimatePresence>
                      {isHovered && !isSelected && (
                        <motion.div
                          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-luxury-black/95 border border-white/10 px-3.5 py-2 rounded-xl shadow-2xl z-40 whitespace-nowrap pointer-events-none"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        >
                          <span className="font-serif text-xs font-light block text-white">{prop.title}</span>
                          <span className="font-mono text-[10px] text-[#C8A96A] block mt-0.5">${(prop.price / 1000000).toFixed(1)}M</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>

          {/* PROPERTY PANEL (Right col, details of selected) */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              {selectedProperty ? (
                <motion.div
                  key={selectedProperty.id}
                  className="h-full bg-white/5 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 group border border-white/5">
                      <img
                        src={selectedProperty.image}
                        alt={selectedProperty.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 font-mono text-[8px] bg-luxury-black/80 backdrop-blur-md text-[#C8A96A] px-3 py-1.5 border border-[#C8A96A]/20 tracking-widest uppercase rounded-full">
                        {selectedProperty.type}
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-[#C8A96A] uppercase tracking-widest">
                        {selectedProperty.location}
                      </span>
                      <span className="font-mono text-[9px] text-[#777777]">
                        Built {selectedProperty.yearBuilt}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-light text-white mb-3">
                      {selectedProperty.title}
                    </h3>

                    {/* Price */}
                    <div className="font-serif text-2xl text-[#C8A96A] font-light mb-4">
                      ${selectedProperty.price.toLocaleString()}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#777777] leading-relaxed mb-6">
                      {selectedProperty.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-4 gap-2 py-4 border-t border-b border-white/5 mb-6 text-center">
                      <div>
                        <span className="font-mono text-[9px] text-[#777777] block uppercase">Beds</span>
                        <div className="flex items-center justify-center gap-1 mt-1 text-white text-xs">
                          <Bed className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                          <span>{selectedProperty.beds}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#777777] block uppercase">Baths</span>
                        <div className="flex items-center justify-center gap-1 mt-1 text-white text-xs">
                          <Bath className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                          <span>{selectedProperty.baths}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#777777] block uppercase">Garage</span>
                        <div className="flex items-center justify-center gap-1 mt-1 text-white text-xs">
                          <Maximize className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                          <span>{selectedProperty.garage}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[#777777] block uppercase">Sq Ft</span>
                        <span className="block text-white text-xs mt-1 font-mono">{selectedProperty.sqft}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] py-3.5 rounded-xl font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  >
                    <span>Request Private Dossier</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ) : (
                <div className="h-full bg-white/5 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                  <MapPin className="w-8 h-8 text-[#777777] mb-4 animate-bounce" />
                  <p className="text-sm text-[#777777] font-serif">Select a coordinate to view active architectural profiles.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
