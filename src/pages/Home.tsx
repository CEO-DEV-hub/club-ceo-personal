import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import Location from '../components/Location';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <div className="relative">
        {/* Background Ambient Lights */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/5 blur-[150px] rounded-full animate-float" />
          <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-electric-blue/5 blur-[150px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-gold-accent/5 blur-[150px] rounded-full animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <About />
        <Experience />
        <Gallery />
        <Reviews />
        <Location />
      </div>
    </main>
  );
}
