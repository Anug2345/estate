import { motion } from 'motion/react';
import { Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { PROPERTIES_DATA } from '../data';

export default function PropertySpotlight() {
  const spotlightProp = PROPERTIES_DATA[2]; // Lumina Sea Estate - Malibu, CA ($32M)

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative overflow-hidden z-10 border-b border-luxury-black/5 dark:border-white/5">
      {/* Golden glow backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8A96A]/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Subtle Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
            Curator Highlight
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
            Property of the Week
          </h2>
        </div>

        {/* Feature Layout Card */}
        <motion.div
          className="relative rounded-[32px] overflow-hidden border border-[#C8A96A]/20 dark:border-[#C8A96A]/10 bg-luxury-bg dark:bg-[#181818] p-6 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.3)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle slow gold sweeping line inside card */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8A96A]/5 to-transparent -translate-x-full animate-[shimmer_5s_infinite_linear]" />

          {/* Picture Box - Spans 7 */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-[16/10] border border-luxury-black/5 dark:border-white/5">
            <img
              src={spotlightProp.image}
              alt={spotlightProp.title}
              className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-104"
              loading="lazy"
            />
            {/* Spotlight halo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-transparent to-transparent opacity-80" />
            
            {/* Top Left Highlight tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#C8A96A] text-[#111111] font-mono text-[9px] tracking-widest px-4 py-2 uppercase rounded-full border border-white/20 shadow-lg font-bold">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>MALIBU ICON</span>
            </div>
          </div>

          {/* Content Info Box - Spans 5 */}
          <div className="lg:col-span-5 relative flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 text-[#777777] mb-3">
                <MapPin className="w-4 h-4 text-[#C8A96A]" />
                <span className="font-mono text-[10px] tracking-widest uppercase">{spotlightProp.location}</span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-light text-luxury-black dark:text-white leading-tight mb-4">
                {spotlightProp.title}
              </h3>

              <div className="font-serif text-2xl text-[#C8A96A] font-light mb-6">
                ${spotlightProp.price.toLocaleString()}
              </div>

              <p className="text-xs text-luxury-muted dark:text-gray-400 font-light leading-relaxed mb-8">
                Stretching along 150 feet of pristine Malibu shoreline, Lumina Sea merges organic modernism with the rhythm of the tides, incorporating native stone walls, massive structural cantilevers, and fully glazed sliding boundaries.
              </p>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-b border-luxury-black/5 dark:border-white/5 py-4 mb-8">
                <div>
                  <span className="font-mono text-[8px] text-[#777777] uppercase block">Total Area</span>
                  <span className="text-xs font-mono text-luxury-black dark:text-white font-bold mt-1 block">12,400 SQFT</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#777777] uppercase block">Pool Space</span>
                  <span className="text-xs font-mono text-luxury-black dark:text-white font-bold mt-1 block">Indoor/Outdoor</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#777777] uppercase block">Private Beach</span>
                  <span className="text-xs font-mono text-luxury-black dark:text-white font-bold mt-1 block">150 FT Cove</span>
                </div>
              </div>
            </div>

            {/* Inquire coordinates button */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] py-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_5px_15px_rgba(200,169,106,0.3)] cursor-pointer"
            >
              <span>Request Private Walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
