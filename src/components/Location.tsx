import { motion } from 'motion/react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function Location() {
  return (
    <section id="location" className="py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-electric-blue font-bold tracking-widest text-sm mb-4 uppercase">Visit Us</h3>
            <h2 className="text-5xl font-black mb-10 leading-none">FIND THE PARTY</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-neon-purple shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-soft-white uppercase text-sm mb-1">Address</h4>
                  <p className="text-soft-white/60 leading-relaxed">
                    10, ABC street, Defg-Defg,<br />
                    Hij, Delta State, Nigeria
                  </p>
                  <p className="text-gold-accent text-xs mt-2 font-mono">Plus Code: 65WW+J8 Delta State</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-electric-blue shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-soft-white uppercase text-sm mb-1">Contact</h4>
                  <p className="text-soft-white/60">+234 814 813 4614</p>
                  <p className="text-soft-white/40 text-xs mt-1">Available 24/7 for inquiries</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-gold-accent shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-soft-white uppercase text-sm mb-1">Hours</h4>
                  <p className="text-soft-white/60">Open 24 Hours</p>
                  <p className="text-soft-white/40 text-xs mt-1">Dine-in available</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=10+ABC+street+Defg-Defg+Hij+Delta+State+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-soft-white text-deep-black rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-electric-blue hover:text-white transition-all"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href="tel:+2348148134614"
                className="px-8 py-4 border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:border-neon-purple transition-all"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden glass p-2"
          >
            <iframe
              src="https://maps.google.com/maps?q=10,%20ABC%20street,%20Defg-Defg,%20Hij,%20Delta%20State&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
