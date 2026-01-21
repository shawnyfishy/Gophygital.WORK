import React from 'react';
import { Reveal } from './ui/Reveal';

const team = [
  { name: "Chetan Bafna", role: "CEO & Co-Founder", img: "https://gophygital.work/wp-content/uploads/chetan-bafna-pp.png" },
  { name: "Ssumir Yaadav", role: "Co-Founder (Ops)", img: "https://gophygital.work/wp-content/uploads/Ssumir-Yaadav-pp.png" },
  { name: "Aquil Husain", role: "Co-Founder (BD)", img: "https://gophygital.work/wp-content/uploads/aquil-husain.png" },
  { name: "Mahendra Lungare", role: "VP Engineering", img: "https://gophygital.work/wp-content/uploads/mahendra-lungare.png" },
];

export const TeamSection: React.FC = () => {
  return (
    <div className="py-20 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal width="100%" variant="blur">
            <div className="mb-20">
              <h2 className="text-3xl font-serif font-bold text-peach-text mb-4">The Team</h2>
              <div className="h-1 w-20 bg-peach-accent" />
            </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {team.map((member, i) => (
            <Reveal key={i} delay={i * 0.1} variant="scale">
                <div className="group cursor-pointer flex flex-col items-center text-center">
                  <div className="w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-full mb-6 bg-white shadow-md border border-black/5 relative">
                    <div className="absolute inset-0 bg-peach-accent/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                    <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-105" 
                    />
                  </div>
                  <h4 className="font-bold text-peach-text text-lg">{member.name}</h4>
                  <p className="text-sm text-peach-muted">{member.role}</p>
                </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};