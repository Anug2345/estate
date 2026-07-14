import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Instagram, Linkedin, Twitter, Sparkles, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsSuccess(true);
    setTimeout(() => {
      setNewsSuccess(false);
      setNewsEmail('');
    }, 4000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-luxury-black text-white py-20 px-6 md:px-12 relative overflow-hidden border-t border-white/5 z-10">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top footer row: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center gap-2 group mb-6">
              <span className="font-serif text-3xl font-light text-white tracking-[0.25em] group-hover:text-[#C8A96A] transition-colors">
                AURELIA
              </span>
              <div className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full group-hover:scale-150 transition-transform" />
            </a>
            
            <p className="text-[11px] text-gray-400 font-light leading-relaxed max-w-sm mb-6">
              Aurelia is a private boutique brokerage specializing in the representation, acquisition, and curation of award-winning architectural properties and residential monuments globally.
            </p>

            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#777777] hover:text-[#C8A96A] hover:border-[#C8A96A] hover:bg-white/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#777777] hover:text-[#C8A96A] hover:border-[#C8A96A] hover:bg-white/10 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#777777] hover:text-[#C8A96A] hover:border-[#C8A96A] hover:bg-white/10 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links Col */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase block mb-4">Jump Links</span>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="hover:text-[#C8A96A] transition-colors">Home Base</a></li>
                <li><a href="#properties" onClick={(e) => handleLinkClick(e, '#properties')} className="hover:text-[#C8A96A] transition-colors">Portfolios</a></li>
                <li><a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-[#C8A96A] transition-colors">Our Story</a></li>
                <li><a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-[#C8A96A] transition-colors">Why Us</a></li>
              </ul>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase block mb-4">Advisory</span>
              <ul className="space-y-2 text-xs text-gray-400 font-light">
                <li><a href="#agents" onClick={(e) => handleLinkClick(e, '#agents')} className="hover:text-[#C8A96A] transition-colors">Senior Partners</a></li>
                <li><a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="hover:text-[#C8A96A] transition-colors">Private Services</a></li>
                <li><a href="#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')} className="hover:text-[#C8A96A] transition-colors">Appraisals</a></li>
                <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-[#C8A96A] transition-colors">Inquire Office</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Col */}
          <div className="lg:col-span-4">
            <span className="font-mono text-[9px] tracking-widest text-gray-500 uppercase block mb-4">Newsletter Digest</span>
            <p className="text-[11px] text-gray-400 font-light leading-relaxed mb-4">
              Subscribe to recieve secure notification codes on incoming off-market structural listings. No unsolicited media.
            </p>

            {newsSuccess ? (
              <motion.div
                className="bg-[#C8A96A]/10 border border-[#C8A96A]/20 p-4 rounded-xl text-[#C8A96A] flex items-center gap-3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-4.5 h-4.5 flex-shrink-0" />
                <span className="font-mono text-[10px]">Secure Subscription Verified</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="vance@estate.luxury"
                  className="bg-white/5 border border-white/10 hover:border-[#C8A96A]/30 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8A96A] transition-all w-full tracking-wider text-white"
                />
                <button
                  type="submit"
                  className="bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] px-5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright metadata row */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            <span>© 2026 AURELIA ESTATES INC. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline text-white/10">|</span>
            <a href="#about" className="hover:text-white transition-colors">PRIVACY CODE NDA</a>
            <span className="hidden md:inline text-white/10">|</span>
            <a href="#about" className="hover:text-white transition-colors">LUXURY REGULATORY CODE</a>
          </div>

          <div className="font-mono text-[9px] text-[#C8A96A]/40 tracking-widest uppercase text-center md:text-right">
            CURATED IN MONACO // BEVERLY HILLS // PARIS
          </div>
        </div>

      </div>
    </footer>
  );
}
