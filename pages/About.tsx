import React from 'react';
import { TeamSection } from '../components/TeamSection';
import { Reveal } from '../components/ui/Reveal';
import { ParallaxImage } from '../components/ui/ParallaxImage';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 relative z-10">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <Reveal>
          <span className="font-sans font-bold text-peach-accent text-sm tracking-widest uppercase border-b border-peach-accent/30 pb-1 mb-6 block w-fit">
            Our Story
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-medium text-peach-text mb-12 tracking-tighter leading-[0.95]">
            Bridging the <br/>
            <span className="text-peach-muted italic">Physical & Digital.</span>
          </h1>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
           <Reveal delay={0.2}>
             <p className="text-xl text-peach-muted leading-relaxed font-serif">
               GoPhygital.work is a subsidiary of <strong>Samshik Infoline Pvt. Ltd.</strong>, positioned as India's leading sophisticated community experience provider.
             </p>
             <p className="text-xl text-peach-muted leading-relaxed mt-6 font-serif">
               For over 5 years, we have been helping organizations and property owners transform spaces into connected, intelligent communities where people thrive—bridging the physical and digital workplace experience into one seamless platform.
             </p>
           </Reveal>
           <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/40">
             <ParallaxImage 
               src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600"
               alt="Office Architecture"
               aspectRatio="16/9"
               className="h-full"
             />
           </div>
        </div>
      </section>

      {/* Stats/Certifications Strip */}
      <section className="border-y border-black/5 py-16 bg-white/40 backdrop-blur-sm mb-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-12 text-center">
            {[
              { label: "Founded", val: "2018" },
              { label: "Certifications", val: "ISO 27018" },
              { label: "Compliance", val: "GDPR Ready" },
              { label: "Operations", val: "Pan India" }
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                 <div className="text-4xl font-serif font-bold text-peach-text mb-2">{stat.val}</div>
                 <div className="text-xs font-sans text-peach-accent uppercase tracking-widest font-bold">{stat.label}</div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Values */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <Reveal>
          <h2 className="text-3xl font-serif font-bold text-peach-text mb-8">Our Philosophy</h2>
          <p className="text-2xl font-serif italic text-peach-muted leading-relaxed">
            "We help organizations and property owners transform spaces into connected, intelligent communities where people thrive."
          </p>
        </Reveal>
      </section>

    </div>
  );
};