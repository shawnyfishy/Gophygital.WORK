import React from 'react';
import { Reveal } from './ui/Reveal';
import { ParallaxImage } from './ui/ParallaxImage';
import { TeamSection } from './TeamSection';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative z-20 section-glass border-t border-black/5 pt-32 pb-16">
      
      {/* Story Section */}
      <div className="max-w-[1400px] mx-auto px-6 mb-32">
        <Reveal>
          <span className="font-sans font-bold text-peach-accent text-sm tracking-widest uppercase border-b border-peach-accent/30 pb-1 mb-6 block w-fit">
            Our Story
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-medium text-peach-text mb-12 tracking-tighter leading-[0.95]">
            Bridging the <br/>
            <span className="text-peach-muted italic">Physical & Digital.</span>
          </h2>
        </Reveal>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
           <Reveal delay={0.2}>
             <p className="text-xl text-peach-muted leading-relaxed font-serif">
               GoPhygital.work is a subsidiary of <strong>Samshik Infoline Pvt. Ltd.</strong>, positioned as India's leading sophisticated community experience provider.
             </p>
             <p className="text-xl text-peach-muted leading-relaxed mt-6 font-serif">
               For over 5 years, we have been helping organizations and property owners transform spaces into connected, intelligent communities where people thrive.
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
      </div>

      {/* Stats Strip */}
      <div className="border-y border-black/5 py-16 bg-white/40 backdrop-blur-sm mb-20">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-around gap-12 text-center">
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
      </div>

      {/* Team Section (Embedded) */}
      <TeamSection />

      {/* Philosophy */}
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center pb-16">
        <Reveal>
          <h2 className="text-3xl font-serif font-bold text-peach-text mb-8">Our Philosophy</h2>
          <p className="text-2xl font-serif italic text-peach-muted leading-relaxed">
            "We help organizations and property owners transform spaces into connected, intelligent communities where people thrive."
          </p>
        </Reveal>
      </div>

    </section>
  );
};