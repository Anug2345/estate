import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Heart, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  key?: React.Key | null;
  prop: Property;
  idx: number;
  isFav: boolean;
  toggleFavorite: (id: string, e: React.MouseEvent) => void;
  setSelectedProperty: (prop: Property | null) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  prop,
  idx,
  isFav,
  toggleFavorite,
  setSelectedProperty,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkTouch = () => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
      };
      checkTouch();
      window.addEventListener('resize', checkTouch);
      return () => window.removeEventListener('resize', checkTouch);
    }
  }, []);

  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 120 });
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 120 });

  // Map normalized mouse position (-0.5 to 0.5) to tilt rotation (-6 to 6 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  // Map normalized mouse position to inner image parallax movement
  const parallaxX = useTransform(mouseXSpring, [-0.5, 0.5], [10, -10]);
  const parallaxY = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized coordinates (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Entrance variants for viewport slide-up and fade-in
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 80,
        delay: idx * 0.08,
      }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="perspective-1000 w-full"
    >
      <motion.div
        className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 rounded-[24px] overflow-hidden group shadow-[0_15px_35px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.1)] flex flex-col justify-between h-full transition-shadow duration-500 relative cursor-pointer"
        onClick={() => {
          setSelectedProperty(prop);
          window.document.body.style.overflow = 'hidden';
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        style={isTouchDevice ? {} : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="view"
      >
        <div style={isTouchDevice ? {} : { transform: 'translateZ(20px)' }}>
          {/* Property Image & Tags with inner parallax */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-t-[24px]">
            <motion.img
              src={prop.image}
              alt={prop.title}
              className="w-full h-full object-cover origin-center"
              style={isTouchDevice ? { scale: 1 } : {
                x: parallaxX,
                y: parallaxY,
                scale: 1.12, // Scale up slightly to prevent edges showing during translation
              }}
              loading="lazy"
            />

            {/* Dark overlay that brightens on hover */}
            <div className="absolute inset-0 bg-[#111111]/20 transition-colors group-hover:bg-[#111111]/10 z-1" />

            {/* Top bar (Badge and Favorite button) */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10" style={{ transform: 'translateZ(30px)' }}>
              {prop.badge && (
                <span className="font-mono text-[8px] bg-[#111111]/85 backdrop-blur-md text-[#C8A96A] border border-[#C8A96A]/20 tracking-[0.25em] px-3 py-1.5 rounded-full uppercase">
                  {prop.badge}
                </span>
              )}
              <button
                onClick={(e) => toggleFavorite(prop.id, e)}
                className="w-8 h-8 rounded-full bg-luxury-black/60 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:border-[#C8A96A] hover:bg-[#111111] transition-all transform hover:scale-110 cursor-pointer"
                aria-label="Save Property"
              >
                <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
            </div>

            {/* Glassmorphic Quick Stats Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-4 right-4 z-20 bg-white/10 dark:bg-[#111111]/45 backdrop-blur-xl border border-white/20 dark:border-white/10 p-3 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] flex flex-col gap-1.5"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-1">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-[#C8A96A] uppercase font-bold">Price / SqFt</span>
                    <span className="font-mono text-[9px] text-white font-medium">
                      ${Math.round(prop.price / prop.sqft).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-[#C8A96A] uppercase font-bold">Built</span>
                    <span className="font-mono text-[9px] text-white font-medium">{prop.yearBuilt}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Price on image with beautiful gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111111]/80 to-transparent flex items-end p-5 z-2" style={{ transform: 'translateZ(10px)' }}>
              <span className="font-serif text-2xl font-light text-[#C8A96A]">
                ${prop.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Property Meta info */}
          <div className="p-6 pb-4" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-center gap-1 text-[#777777] mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#C8A96A]" />
              <span className="font-mono text-[10px] tracking-wider uppercase">{prop.location}</span>
            </div>
            
            <h3 className="font-serif text-xl font-light text-luxury-black dark:text-white group-hover:text-[#C8A96A] transition-colors mb-2.5">
              {prop.title}
            </h3>
            
            <p className="text-[11px] text-[#777777] line-clamp-2 leading-relaxed font-light mb-4">
              {prop.description}
            </p>
          </div>
        </div>

        {/* Specs & Action Row */}
        <div className="px-6 pb-6 pt-4 border-t border-luxury-black/5 dark:border-white/5" style={{ transform: 'translateZ(10px)' }}>
          <div className="grid grid-cols-4 gap-2 items-center text-center">
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-[#777777] uppercase tracking-wider mb-0.5">Beds</span>
              <div className="flex items-center justify-center gap-1 text-xs text-luxury-black dark:text-white font-medium">
                <Bed className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                <span>{prop.beds}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-[#777777] uppercase tracking-wider mb-0.5">Baths</span>
              <div className="flex items-center justify-center gap-1 text-xs text-luxury-black dark:text-white font-medium">
                <Bath className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                <span>{prop.baths}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-[#777777] uppercase tracking-wider mb-0.5">Garage</span>
              <div className="flex items-center justify-center gap-1 text-xs text-luxury-black dark:text-white font-medium">
                <Maximize className="w-3.5 h-3.5 text-[#C8A96A]/70" />
                <span>{prop.garage}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[8px] text-[#777777] uppercase tracking-wider mb-0.5">Sq Ft</span>
              <span className="text-xs text-luxury-black dark:text-white font-mono mt-0.5">{prop.sqft}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PropertyCard;
