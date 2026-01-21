import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden bg-blueprint">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/10 via-transparent to-white/20 pointer-events-none" />
      
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full flex flex-col items-center justify-center text-center">
        
        <Reveal delay={0.2} variant="fade-in">
            <div className="flex items-center gap-2 mb-8 px-4 py-1.5 border border-peach-text/10 rounded-full bg-white/30 backdrop-blur-sm shadow-sm select-none">
                <TrendingUp size={14} className="text-peach-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-peach-muted">Modernizing Workplace ROI</span>
            </div>
        </Reveal>

        <Reveal variant="blur">
            <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight leading-[1.1] mb-8 text-peach-text drop-shadow-sm select-none">
                Maximize Your <br/>
                <span className="text-peach-muted italic">Asset Value.</span>
            </h1>
        </Reveal>

        <div className="mb-12 max-w-2xl mx-auto">
            <Reveal delay={0.3} width="100%" variant="fade-up">
                <p className="text-xl md:text-2xl text-peach-muted font-sans font-light leading-relaxed text-balance">
                    Unified PropTech to reduce operational costs, accelerate leasing, and boost employee productivity.
                </p>
            </Reveal>
        </div>

        <Reveal delay={0.5} width="100%" variant="fade-up">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="#solutions" onClick={scrollToSolutions}>
                    <Button variant="primary" className="group rounded-full px-10 py-5 text-sm font-bold tracking-widest uppercase shadow-xl">
                        Start Optimizing
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>
                
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-2 group text-peach-text font-bold px-8 py-5 rounded-full hover:bg-white transition-all bg-white/20 shadow-sm border border-white/40 backdrop-blur-sm"
                >
                    <PlayCircle className="w-5 h-5 text-peach-accent" />
                    <span className="text-sm tracking-wide">Watch Story</span>
                </button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-4 text-[9px] font-bold text-peach-muted/50 uppercase tracking-[0.2em]">
                <span>ISO 27018</span>
                <span>GDPR Compliant</span>
                <span>Enterprise Grade</span>
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