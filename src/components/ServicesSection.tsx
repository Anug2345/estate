import React from 'react';
import { motion } from 'motion/react';
import { Compass, Maximize, Building, TrendingUp, ShieldCheck, Scale } from 'lucide-react';
import { SERVICES_DATA } from '../data';

// Map icon name strings to actual React components safely for TypeScript
const ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 text-[#C8A96A]" />,
  Maximize: <Maximize className="w-5 h-5 text-[#C8A96A]" />,
  Building: <Building className="w-5 h-5 text-[#C8A96A]" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-[#C8A96A]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#C8A96A]" />,
  Scale: <Scale className="w-5 h-5 text-[#C8A96A]" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl text-left">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
              Bespoke Services
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white leading-tight">
              An Elevated Tier of Personal Advisory
            </h2>
          </div>
          <p className="text-xs md:text-sm text-luxury-muted dark:text-gray-400 font-light max-w-sm leading-relaxed">
            From off-market structural sourcing to legal escrow and portfolio trust optimization, we manage your architectural capital with perfect discretion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              className="border border-luxury-black/5 dark:border-white/5 bg-luxury-bg dark:bg-[#1c1c1c] p-8 rounded-3xl relative group overflow-hidden transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              whileHover={{ 
                y: -6,
                borderColor: 'rgba(200, 169, 106, 0.25)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Radial glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8A96A]/2 rounded-bl-[100px] pointer-events-none" />

              {/* Icon */}
              <div className="w-10 h-10 bg-[#C8A96A]/10 border border-[#C8A96A]/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                {ICON_MAP[service.iconName]}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-light text-luxury-black dark:text-white mb-3.5 group-hover:text-[#C8A96A] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-luxury-muted dark:text-gray-400 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
