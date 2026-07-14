import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Send, Sparkles, CheckCircle } from 'lucide-react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has already seen or closed it
      const hasSeen = localStorage.getItem('aurelia_newsletter_seen');
      if (hasSeen) return;

      // Scroll threshold 30%
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 30) {
        setIsOpen(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('aurelia_newsletter_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="newsletter-popup"
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 w-full max-w-sm"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180 }}
        >
          {/* Main Card Frame */}
          <div className="bg-white/80 dark:bg-[#151515]/95 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-[#C8A96A]/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative">
            
            {/* Close trigger button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-luxury-bg dark:bg-[#1a1a1a] hover:bg-[#C8A96A]/10 text-[#777777] hover:text-[#C8A96A] flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {success ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-[#C8A96A]" />
                </div>
                <h4 className="font-serif text-lg font-light text-luxury-black dark:text-white mb-1">
                  Access Granted
                </h4>
                <p className="text-[10px] text-[#777777]">
                  Your coordinate credentials have been stored in our off-market vault.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[#C8A96A] mb-3">
                  <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-widest uppercase font-bold">AURELIA MEMBERSHIP</span>
                </div>

                <h3 className="font-serif text-xl font-light text-luxury-black dark:text-white mb-2 leading-snug">
                  Unlock Off-Market Portfolios
                </h3>
                
                <p className="text-[10px] text-luxury-muted dark:text-gray-400 font-light leading-relaxed mb-6">
                  Recieve cryptographic codes to preview restricted Beverly Hills and Malibu estates before they publish.
                </p>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vance@estate.luxury"
                    className="bg-luxury-bg dark:bg-[#1a1a1a] border border-luxury-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C8A96A] transition-all w-full text-luxury-black dark:text-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#C8A96A] hover:bg-[#B59556] text-[#111111] px-4 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Submit subscribe email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
