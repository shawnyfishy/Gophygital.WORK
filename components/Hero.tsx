import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Reveal, TextReveal } from './ui/Reveal';
import { ArrowRight, PlayCircle, TrendingUp } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const Hero: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToSolutions = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('solutions');
    if (element) {
        const navHeight = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-48 pb-12 overflow-hidden bg-blueprint">
      
      {/* Real Estate Architectural Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Floor Plan Outline Top Right */}
        <svg className="absolute top-[10%] right-[5%] w-[400px] h-[400px] opacity-[0.03] stroke-peach-text" viewBox="0 0 100 100" fill="none" strokeWidth="0.5">
           <path d="M10,10 L90,10 L90,90 L50,90 L50,60 L10,60 Z" />
           <path d="M50,10 L50,60" />
           <path d="M10,35 L50,35" />
           <rect x="20" y="40" width="10" height="15" />
           <rect x="60" y="20" width="20" height="20" />
           <circle cx="70" cy="75" r="5" />
        </svg>
        
        {/* Measurement Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-peach-text/5 dashed" />
        <div className="absolute left-1/4 top-0 w-px h-full bg-peach-text/5 dashed" />
      </div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full flex flex-col items-center justify-center">
        
        {/* Tagline for Results Focus */}
        <Reveal delay={0.1} variant="fade-in">
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 border border-peach-text/10 rounded-full bg-white/40 backdrop-blur-sm shadow-sm hover:bg-white/60 transition-colors cursor-default">
                <TrendingUp size={14} className="text-peach-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-peach-muted">PropTech that Pays for Itself</span>
            </div>
        </Reveal>

        {/* Impact-Driven Header */}
        <h1 className="text-center text-5xl md:text-8xl font-serif font-medium tracking-tighter leading-[0.95] mb-8 text-peach-text drop-shadow-sm select-none">
            <div className="overflow-hidden flex justify-center py-2"><TextReveal text="Maximize" className="pb-4 px-1" /></div>
            <div className="overflow-hidden flex justify-center py-2"><TextReveal text="Asset Value." delay={0.15} className="pb-4 px-1" /></div>
        </h1>

        <div className="text-center mb-12 max-w-3xl mx-auto p-6 rounded-xl relative bg-white/30 backdrop-blur-sm border border-white/20 shadow-sm transition-transform hover:scale-[1.01] duration-500">
            {/* Corner Marks mimicking blueprint */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-peach-text/20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-peach-text/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-peach-text/20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-peach-text/20" />

            <Reveal delay={0.3} width="100%" variant="blur">
                <p className="text-lg md:text-2xl text-peach-muted font-sans font-normal leading-relaxed text-balance">
                    Turn your real estate into a <strong className="font-bold text-peach-text">competitive advantage</strong>. <br className="hidden md:block"/>
                    Reduce operational costs, accelerate leasing, and boost employee productivity with one unified platform.
                </p>
            </Reveal>
        </div>

        {/* Enhanced CTAs */}
        <Reveal delay={0.5} width="100%" className="mx-auto" variant="fade-up">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="#solutions" onClick={scrollToSolutions}>
                    <Button 
                      variant="primary" 
                      className="group rounded-full px-10 py-5 text-base font-bold tracking-wider uppercase shadow-2xl hover:scale-105 hover:shadow-peach-accent/40 transition-all"
                    >
                        Start Optimizing
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>
                
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-3 group text-peach-text font-semibold px-8 py-5 rounded-full hover:bg-white/80 transition-all bg-white/60 shadow-lg border border-white/50 backdrop-blur-sm active:scale-95"
                >
                    <PlayCircle className="w-6 h-6 text-peach-accent group-hover:scale-110 transition-transform" />
                    <span>See The Results</span>
                </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold text-peach-muted/80 uppercase tracking-widest opacity-80">
                <span>Trusted by 50+ Enterprises</span>
                <span className="w-1 h-1 rounded-full bg-peach-muted/40" />
                <span>ISO 27018 Certified</span>
            </div>
        </Reveal>
      </div>

      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
        videoId="G0V0uTvO7Rk" 
      />
    </section>
  );
};