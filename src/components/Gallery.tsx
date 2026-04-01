import { motion } from 'motion/react';

export default function Gallery() {
  const images = [
    { url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&q=80&w=800', title: 'Electric Vibes', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1574094939582-8d16edad337a?auto=format&fit=crop&q=80&w=800', title: 'VIP Seating', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=800', title: 'Main Stage', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', title: 'The DJ', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80&w=800', title: 'Signature Drinks', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800', title: 'Crowd Energy', size: 'large' },
  ];

  return (
    <section id="gallery" className="py-24 bg-deep-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h3 className="text-gold-accent font-bold tracking-widest text-sm mb-4 uppercase">Visual Journey</h3>
            <h2 className="text-5xl font-black leading-none">MOMENTS THAT DEFINE THE NIGHT</h2>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest px-8 py-4 border border-white/10 rounded-full hover:bg-white hover:text-deep-black transition-all">
            View All Photos
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl ${
                img.size === 'large' ? 'col-span-2 row-span-2' : 
                img.size === 'medium' ? 'col-span-2 row-span-1' : ''
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/90 via-deep-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <p className="text-gold-accent text-[10px] uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Club CEO</p>
                <h4 className="text-soft-white font-black text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
