import { motion } from 'motion/react';
import { Star, ShieldCheck, Music, Zap } from 'lucide-react';

export default function About() {
  const features = [
    { icon: <Music className="text-neon-purple" />, title: 'High-End Sound', desc: 'Immersive acoustic engineering.' },
    { icon: <ShieldCheck className="text-electric-blue" />, title: 'Safe & Secure', desc: 'Elite security for your peace of mind.' },
    { icon: <Zap className="text-gold-accent" />, title: '24/7 Energy', desc: 'The party never stops in Agbor.' },
  ];

  return (
    <section id="about" className="py-24 bg-deep-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-neon-purple font-bold tracking-widest text-sm mb-4 uppercase">Our Story</h3>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              WHERE ENERGY MEETS <span className="text-gold-accent">ELEGANCE</span>
            </h2>
            <p className="text-soft-white/70 text-lg mb-8 leading-relaxed">
              Club CEO is more than just a nightclub; it's a premium destination in Hij, Delta State. We've redefined nightlife in Delta State with a perfect blend of high-octane energy and sophisticated luxury.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-soft-white uppercase text-sm mb-1">{f.title}</h4>
                    <p className="text-soft-white/50 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 p-6 glass rounded-2xl border-l-4 border-neon-purple">
              <div className="text-center">
                <div className="text-3xl font-black text-soft-white">4.9</div>
                <div className="flex text-gold-accent mt-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div>
                <p className="text-soft-white/80 font-bold uppercase text-xs tracking-widest">Top Rated Nightclub</p>
                <p className="text-soft-white/40 text-[10px] mt-1">Based on 29+ verified guest reviews</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-neon-purple/20 rounded-3xl -rotate-3 z-0"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img
                src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1000"
                alt="Club Interior"
                className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <p className="text-gold-accent font-bold uppercase tracking-widest text-xs mb-2">Location</p>
                <p className="text-soft-white font-black text-xl">10, ABC street, Defg-Defg, Hij, Delta State</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-electric-blue text-deep-black font-black p-6 rounded-full text-center shadow-[0_0_30px_rgba(0,194,255,0.4)] z-20"
            >
              <div className="text-xs uppercase leading-none">Open</div>
              <div className="text-2xl leading-none">24H</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
