import React from 'react';
import { Reveal } from './ui/Reveal';

const clients = [
  "PSIPL",
  "Godrej Properties",
  "CBRE",
  "Sunteck",
  "Edelweiss Tokio Life",
  "Axis Bank",
  "Runwal",
  "IDFC FIRST Bank",
  "JLL",
  "Oberoi Realty",
  "John Deere",
  "SD Corp",
  "Shapoorji Pallonji",
  "Kalpataru",
  "Marathon"
];

export const ClientsSection: React.FC = () => {
  return (
    <section className="py-6 bg-peach-bg border-b border-black/5 overflow-hidden relative z-20">
      <div className="max-w-[1400px] mx-auto px-6 mb-4 text-center">
        <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-peach-muted opacity-80">
                Trusted by Industry Leaders
            </p>
        </Reveal>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex whitespace-nowrap gap-12 px-8 items-center">
          {[...clients, ...clients].map((client, i) => (
            <span 
                key={i} 
                className="text-xl md:text-3xl font-serif font-bold text-peach-text/50 hover:text-peach-accent transition-colors cursor-default select-none tracking-tight"
            >
                {client}
            </span>
          ))}
        </div>
        
        {/* Gradient Masks - lighter and narrower for visibility */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-peach-bg via-peach-bg/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-peach-bg via-peach-bg/90 to-transparent z-10 pointer-events-none" />
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        .group:hover .animate-marquee {
            animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};