import { motion } from 'motion/react';
import { Crown, GlassWater, Disc3 } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      icon: <Crown className="w-12 h-12 text-gold-accent mb-6" />,
      title: 'VIP Lounge',
      features: ['Private Seating', 'Bottle Service', 'Exclusive Access'],
      color: 'gold-accent',
      delay: 0.1,
    },
    {
      icon: <GlassWater className="w-12 h-12 text-electric-blue mb-6" />,
      title: 'Premium Bar',
      features: ['Signature Cocktails', 'Top-tier Spirits', 'Pro Bartenders'],
      color: 'electric-blue',
      delay: 0.2,
    },
    {
      icon: <Disc3 className="w-12 h-12 text-neon-purple mb-6" />,
      title: 'DJ & Dance',
      features: ['High-energy Music', 'Live DJ Sessions', 'Immersive Lighting'],
      color: 'neon-purple',
      delay: 0.3,
    },
  ];

  return (
    <section id="experience" className="py-24 bg-deep-black relative">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon-purple/10 blur-[120px] rounded-full"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-electric-blue/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-electric-blue font-bold tracking-[0.3em] text-sm mb-4 uppercase"
          >
            Elevate Your Night
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black"
          >
            THE CLUB CEO EXPERIENCE
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: exp.delay, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-3xl group relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-${exp.color}/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10">
                {exp.icon}
                <h3 className="text-2xl font-black mb-6 tracking-tight">{exp.title}</h3>
                <ul className="space-y-4">
                  {exp.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-soft-white/60 text-sm font-medium">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${exp.color}`}></div>
                      {feat}
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-10 text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-${exp.color}`}
                >
                  Learn More <span>→</span>
                </motion.button>
              </div>

              {/* Border Animation */}
              <div className={`absolute inset-0 border border-white/5 rounded-3xl group-hover:border-${exp.color}/50 transition-colors duration-500`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
