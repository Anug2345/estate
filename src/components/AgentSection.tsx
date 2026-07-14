import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Phone, Mail, Instagram, Linkedin, Twitter, Calendar, X, CheckCircle } from 'lucide-react';
import { AGENTS_DATA } from '../data';
import { Agent } from '../types';

export default function AgentSection() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) return;
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedAgent(null);
      setBookingDate('');
      setBookingTime('');
    }, 4000);
  };

  return (
    <section id="agents" className="py-28 px-6 md:px-12 bg-white dark:bg-[#111111] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Senior Partners
          </motion.span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white">
            Meet Our Elite Brokers
          </h2>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {AGENTS_DATA.map((agent, idx) => (
            <motion.div
              key={agent.id}
              className="bg-luxury-bg dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              whileHover={{ 
                rotateY: 2, 
                rotateX: -2,
                z: 10,
                borderColor: 'rgba(200, 169, 106, 0.3)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.06)'
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <div>
                {/* Large Portrait Cover */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 group-hover:shadow-xl transition-shadow duration-500">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-104"
                    loading="lazy"
                  />
                  {/* Subtle dark mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Social media tray (floating on portrait) */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-luxury-black/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {agent.socials.instagram && (
                      <a href={agent.socials.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-[#C8A96A] transition-colors">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {agent.socials.linkedin && (
                      <a href={agent.socials.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-[#C8A96A] transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {agent.socials.twitter && (
                      <a href={agent.socials.twitter} target="_blank" rel="noreferrer" className="text-white hover:text-[#C8A96A] transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Agent Meta Details */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] text-[#C8A96A] uppercase tracking-widest">
                    {agent.role}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#C8A96A] text-[#C8A96A]" />
                    <span className="font-mono text-[10px] text-luxury-black dark:text-white font-bold">{agent.rating}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-light text-luxury-black dark:text-white group-hover:text-[#C8A96A] transition-colors mb-2.5">
                  {agent.name}
                </h3>

                <div className="flex items-center justify-between py-3 border-t border-b border-luxury-black/5 dark:border-white/5 mb-6 text-xs text-[#777777] font-mono">
                  <span>Experience:</span>
                  <span className="text-luxury-black dark:text-white font-bold">{agent.experience}</span>
                </div>
              </div>

              {/* Appointment CTA */}
              <button
                onClick={() => setSelectedAgent(agent)}
                className="w-full bg-luxury-black dark:bg-[#111111] group-hover:bg-[#C8A96A] text-white group-hover:text-[#111111] py-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.2em] uppercase border border-luxury-black/5 dark:border-white/5 transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                Book Consultation
              </button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* AGENT APPOINTMENT SCHEDULER MODAL */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            id="scheduler-overlay"
            className="fixed inset-0 z-99999 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#111111]/85 backdrop-blur-md" 
              onClick={() => setSelectedAgent(null)}
            />

            {/* Modal dialog box */}
            <motion.div
              id="scheduler-card"
              className="bg-white dark:bg-[#151515] w-full max-w-md rounded-3xl p-8 border border-luxury-black/5 dark:border-white/5 shadow-2xl relative z-10"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            >
              {/* Close trigger */}
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-luxury-bg dark:bg-[#1c1c1c] hover:bg-[#C8A96A]/10 text-[#777777] hover:text-[#C8A96A] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close scheduler"
              >
                <X className="w-4 h-4" />
              </button>

              {bookingSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#C8A96A]" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-luxury-black dark:text-white mb-2">
                    Consultation Secured
                  </h3>
                  <p className="text-xs text-[#777777] leading-relaxed max-w-sm mx-auto">
                    A secure booking slot has been reserved with <strong className="text-luxury-black dark:text-white font-medium">{selectedAgent.name}</strong>. A calendar mandate has been dispatched to your email coordinates.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-luxury-black/5">
                      <img
                        src={selectedAgent.image}
                        alt={selectedAgent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-mono text-[8px] text-[#C8A96A] uppercase tracking-widest block">{selectedAgent.role}</span>
                      <h3 className="font-serif text-lg font-light text-luxury-black dark:text-white">Reserve {selectedAgent.name}</h3>
                    </div>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2">Select Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full px-4 py-3 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2">Select Time Slot</label>
                      <select
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full px-4 py-3 bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      >
                        <option value="">Choose Slot</option>
                        <option value="09:00">09:00 AM — GMT-7</option>
                        <option value="11:00">11:00 AM — GMT-7</option>
                        <option value="14:00">02:00 PM — GMT-7</option>
                        <option value="16:00">04:00 PM — GMT-7</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] py-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_4px_14px_rgba(200,169,106,0.3)] cursor-pointer"
                      >
                        Request Calendar Booking
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
