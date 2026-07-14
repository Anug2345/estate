import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Villa');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
      setInterest('Villa');
      setMessage('');
    }, 5000);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 bg-luxury-bg dark:bg-[#151515] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#C8A96A] uppercase block mb-4">
                Private Escrow Coordinates
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-luxury-black dark:text-white mb-6 leading-tight">
                Let's Find Your <br />Dream Home
              </h2>
              <p className="text-xs md:text-sm text-luxury-muted dark:text-gray-400 font-light leading-relaxed mb-10 max-w-sm">
                Connect with our partners to initiate your acquisition or marketing mandate. Absolute privacy and professional discretion are guaranteed.
              </p>
            </div>

            {/* Address Coordinates cards */}
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5 text-[#C8A96A]" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#777777] uppercase tracking-widest block">Main Bureau Address</span>
                  <p className="text-xs text-luxury-black dark:text-white font-serif mt-1 font-light leading-relaxed">
                    9560 Wilshire Blvd, Beverly Hills, CA 90212
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4.5 h-4.5 text-[#C8A96A]" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#777777] uppercase tracking-widest block">Communication Channels</span>
                  <a href="tel:+2348141972357" className="text-xs text-luxury-black dark:text-white font-mono mt-1 font-light block hover:text-[#C8A96A] transition-colors">
                    +234 814 197 2357 (Private Desk)
                  </a>
                  <a href="mailto:gomezanu@gmail.com" className="text-xs text-[#777777] font-mono mt-0.5 block hover:text-[#C8A96A] transition-colors">
                    gomezanu@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C8A96A]/10 border border-[#C8A96A]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4.5 h-4.5 text-[#C8A96A]" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#777777] uppercase tracking-widest block">Operations Hours</span>
                  <p className="text-xs text-luxury-black dark:text-white font-mono mt-1 font-light">
                    08:00 AM — 08:00 PM EST (Strictly Appt Only)
                  </p>
                </div>
              </div>

            </div>

            {/* Geographical Map Mockup / SVG line */}
            <div className="mt-12 text-left font-mono text-[8px] text-[#777777]/50 tracking-[0.2em] uppercase hidden lg:block border-t border-luxury-black/5 dark:border-white/5 pt-6">
              SECURE TLS ENCRYPTED PORTAL // Mapped Node ID 92-04
            </div>
          </div>

          {/* Right Column: Luxury Form */}
          <div className="lg:col-span-7">
            <motion.div
              className="bg-white dark:bg-[#1c1c1c] border border-luxury-black/5 dark:border-white/5 p-8 md:p-10 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              {success ? (
                <motion.div
                  className="text-center py-12 flex flex-col items-center justify-center h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-[#C8A96A]" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-luxury-black dark:text-white mb-3">
                    Inquiry Filed Securely
                  </h3>
                  <p className="text-xs text-[#777777] leading-relaxed max-w-sm mx-auto">
                    Your luxury coordinates have been recorded in our secure vault. A designated private broker will establish secure contact within 1 hour.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name input */}
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sir Reginald Vance"
                        className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                        Private Email Coordinate
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. vance@estate.luxury"
                        className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Input */}
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                        Direct Phone Coordinate
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +234 814 197 2357"
                        className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      />
                    </div>

                    {/* Property interest selector */}
                    <div>
                      <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                        Residency Interest
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all"
                      >
                        <option value="Villa" className="dark:bg-[#111111]">Architectural Villa</option>
                        <option value="Penthouse" className="dark:bg-[#111111]">Skyline Penthouse</option>
                        <option value="Apartment" className="dark:bg-[#111111]">Biophilic Residence</option>
                        <option value="Mansion" className="dark:bg-[#111111]">Sea Edge Mansion</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="font-mono text-[9px] tracking-widest text-[#777777] uppercase block mb-2.5">
                      Bespoke Requirements / Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Detail physical lighting preferences, canyon or shore scopes, structural material mandates..."
                      className="w-full px-4 py-3.5 bg-luxury-bg dark:bg-[#111111] border border-luxury-black/5 dark:border-white/5 rounded-xl text-xs text-luxury-black dark:text-white focus:outline-none focus:border-[#C8A96A] transition-all resize-none"
                    />
                  </div>

                  {/* Large Luxury submit button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] py-4 rounded-xl font-mono text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 transform active:scale-95 shadow-[0_8px_20px_rgba(200,169,106,0.3)] cursor-pointer"
                    >
                      <span>Inquire Secret Dossier</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
