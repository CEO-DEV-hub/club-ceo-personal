import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: 'Chidi Okafor',
      role: 'Regular Guest',
      text: 'The best nightclub in Delta State, hands down. The sound system is incredible and the service is world-class.',
      rating: 5,
    },
    {
      name: 'Sarah Adebayo',
      role: 'Regular Guest',
      text: 'Electric atmosphere! I love the lighting effects and the DJs always play the best tracks. Safe and fun environment.',
      rating: 5,
    },
    {
      name: 'Emeka Nwosu',
      role: 'Regular Guest',
      text: 'Club CEO redefined nightlife in Delta State. The attention to detail in the decor and service is unmatched.',
      rating: 4,
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-deep-black relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none uppercase">
        Testimonials
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="flex text-gold-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
            <span className="text-soft-white font-black text-2xl">4.9</span>
          </div>
          <h2 className="text-5xl font-black">WHAT OUR GUESTS SAY</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass p-10 rounded-3xl relative group"
            >
              <div className="absolute top-6 right-8 text-neon-purple/20 group-hover:text-neon-purple/40 transition-colors">
                <Quote size={40} />
              </div>
              
              <div className="flex text-gold-accent mb-6">
                {[...Array(rev.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
              </div>

              <p className="text-soft-white/70 italic mb-8 leading-relaxed">"{rev.text}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-electric-blue flex items-center justify-center font-black text-white">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-soft-white text-sm uppercase">{rev.name}</h4>
                  <p className="text-soft-white/40 text-[10px] uppercase tracking-widest">{rev.role}</p>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(138,43,226,0.2)] pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
