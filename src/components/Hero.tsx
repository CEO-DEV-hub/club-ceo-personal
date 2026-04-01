import { motion } from 'motion/react';
import { ChevronDown, Phone, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2000"
          alt="Nightclub Atmosphere"
          className="w-full h-full object-cover scale-110 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black/60 via-deep-black/80 to-deep-black"></div>
        
        {/* Animated Light Beams */}
        <div className="absolute top-[-20%] left-[10%] w-[2px] h-[140%] bg-neon-purple/20 rotate-[35deg] blur-xl animate-float"></div>
        <div className="absolute top-[-20%] right-[20%] w-[2px] h-[140%] bg-electric-blue/20 rotate-[-25deg] blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-gold-accent font-bold tracking-[0.5em] text-sm md:text-base mb-4 uppercase">
            Welcome to the Apex
          </h2>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tighter">
            OWN THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue animate-neon-pulse">NIGHT.</span>
          </h1>
          <p className="text-soft-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
            The Ultimate Nightlife Experience in Delta State. Where energy meets elegance in a symphony of lights and sound.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <motion.a
              href="#reserve"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-neon-purple text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(138,43,226,0.4)] hover:shadow-[0_0_40px_rgba(138,43,226,0.6)] transition-all flex items-center gap-2"
            >
              <Calendar size={18} />
              Reserve a Table
            </motion.a>
            <motion.a
              href="tel:08148134614"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 hover:border-electric-blue text-white rounded-full font-bold uppercase tracking-widest text-sm backdrop-blur-sm transition-all flex items-center gap-2 group"
            >
              <Phone size={18} className="group-hover:text-electric-blue transition-colors" />
              Call Now
            </motion.a>
            <motion.a
              href="#location"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/20 hover:border-gold-accent text-white rounded-full font-bold uppercase tracking-widest text-sm backdrop-blur-sm transition-all flex items-center gap-2 group"
            >
              <MapPin size={18} className="group-hover:text-gold-accent transition-colors" />
              Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-soft-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
