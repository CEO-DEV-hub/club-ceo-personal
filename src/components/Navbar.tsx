import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Location', href: '/#location' },
    { name: 'Reserve', href: '/#reserve' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-deep-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-black tracking-tighter flex items-center gap-2 group"
          >
            <span className="text-neon-purple group-hover:text-electric-blue transition-colors">CLUB</span>
            <span className="text-soft-white group-hover:text-gold-accent transition-colors">CEO</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm uppercase font-semibold tracking-widest text-soft-white/70 hover:text-neon-purple transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-purple transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            
            <div className="flex items-center gap-4 ml-4">
              <motion.a
                href="tel:+2348148134614"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-2 bg-neon-purple text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-electric-blue transition-all duration-300 shadow-[0_0_15px_rgba(138,43,226,0.5)]"
              >
                Call Now
              </motion.a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              className="text-soft-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-deep-black border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg uppercase font-bold tracking-widest text-soft-white hover:text-neon-purple transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                
                <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                  <a href="tel:+2348148134614" className="flex items-center gap-3 text-soft-white/70">
                    <Phone size={18} className="text-neon-purple" />
                    +2348148134614
                  </a>
                  <a href="#location" className="flex items-center gap-3 text-soft-white/70">
                    <MapPin size={18} className="text-electric-blue" />
                    10, ABC Street, Defg-Defg, Hij
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
