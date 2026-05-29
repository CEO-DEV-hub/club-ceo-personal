import { motion } from 'motion/react';
import { Instagram, Facebook, Twitter, Phone, MapPin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deep-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <a href="#" className="text-3xl font-display font-black tracking-tighter flex items-center gap-2">
              <span className="text-neon-purple">CLUB</span>
              <span className="text-soft-white">CEO</span>
            </a>
            <p className="text-soft-white/40 text-sm leading-relaxed max-w-xs">
              The ultimate nightlife experience in Hij, Delta State. Where luxury meets the rhythm of the night.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-soft-white font-bold uppercase text-sm tracking-widest mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {['About', 'Experience', 'Gallery', 'Reviews', 'Location'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-soft-white/40 hover:text-neon-purple text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-px bg-neon-purple group-hover:w-4 transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-soft-white font-bold uppercase text-sm tracking-widest mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Phone size={18} className="text-neon-purple shrink-0" />
                <span className="text-soft-white/40 text-sm">+234 814 813 4614</span>
              </li>
              <li className="flex gap-4">
                <MapPin size={18} className="text-electric-blue shrink-0" />
                <span className="text-soft-white/40 text-sm">10, ABC Street, Defg-Defg, Hij, Delta State</span>
              </li>
              <li className="flex gap-4">
                <Mail size={18} className="text-gold-accent shrink-0" />
                <span className="text-soft-white/40 text-sm">hello@clubceo.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-soft-white/20 text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Club CEO. All Rights Reserved.
          </p>

          <p className="text-soft-white/20 text-[10px] uppercase tracking-widest">
            Developed and Designed by Okafor Emmanuel Chukwuemeka 
            </p>
            
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-soft-white/40 hover:text-neon-purple hover:border-neon-purple transition-all group"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>

        </div>
      </div>
    </footer>
  );
}
