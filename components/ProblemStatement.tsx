import React from 'react';
import { Reveal } from './ui/Reveal';
import { ParallaxImage } from './ui/ParallaxImage';

export const ProblemStatement: React.FC = () => {
  return (
    <section id="problem" className="relative z-20">
      {/* Story Part 1: Operational Efficiency Outcome */}
      <div className="min-h-screen flex items-center justify-center py-24 px-6 section-glass">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative group px-6 lg:px-0">
                <Reveal width="100%" variant="slide-right">
                    <ParallaxImage 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
                        alt="Chaotic Office" 
                        aspectRatio="4/3"
                        className="shadow-2xl rounded-2xl"
                        mode="zoom-out"
                    />
                </Reveal>
            </div>
            <div className="order-1 lg:order-2">
                <Reveal variant="blur">
                    <h2 className="text-4xl md:text-6xl font-serif text-peach-text mb-8 tracking-tight leading-[1.1]">
                        Inefficiency is bleeding your revenue.
                    </h2>
                </Reveal>
                <Reveal delay={0.2} variant="fade-up">
                    <p className="text-xl text-peach-muted leading-relaxed font-sans max-w-md">
                        Fragmented tools don't just waste time—they cost money. From lost lease renewals to underutilized desk space, the cost of disconnection is higher than you think.
                    </p>
                </Reveal>
                <Reveal delay={0.4} variant="scale">
                     <div className="mt-12 flex gap-12 border-t border-black/10 pt-8">
                        <div className="text-left">
                            <span className="block text-5xl font-serif text-peach-accent mb-2">30%</span>
                            <span className="text-xs text-peach-muted font-bold uppercase tracking-widest">Avg. OpEx Savings</span>
                        </div>
                        <div className="text-left">
                            <span className="block text-5xl font-serif text-peach-accent mb-2">100%</span>
                            <span className="text-xs text-peach-muted font-bold uppercase tracking-widest">Revenue Capture</span>
                        </div>
                     </div>
                </Reveal>
            </div>
        </div>
      </div>

      {/* Story Part 2: Talent/Tenant Retention Outcome */}
      <div className="min-h-screen flex items-center justify-center py-24 px-6 section-glass border-t border-black/5">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-1">
                <Reveal variant="blur">
                    <h2 className="text-4xl md:text-6xl font-serif text-peach-text mb-8 tracking-tight leading-[1.1]">
                        Experience drives retention.
                    </h2>
                </Reveal>
                <Reveal delay={0.2} variant="fade-up">
                    <p className="text-xl text-peach-muted leading-relaxed font-sans max-w-md">
                        Top talent and premium tenants demand flexibility. Delivering a seamless, tech-enabled experience is your key differentiator to command higher rents and reduce churn.
                    </p>
                </Reveal>
                 <Reveal delay={0.4} variant="fade-up">
                     <div className="mt-12 pt-8 border-t border-black/10">
                        <p className="text-lg font-serif italic text-peach-text">
                            "The platform paid for itself in 6 months just by optimizing our energy usage and space allocation."
                        </p>
                        <p className="text-xs font-bold uppercase tracking-widest text-peach-muted mt-4">— Head of Estates, Fortune 500 Client</p>
                     </div>
                </Reveal>
            </div>
            <div className="order-2 relative group px-6 lg:px-0">
                <Reveal width="100%" variant="slide-left">
                    <ParallaxImage 
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1600" 
                        alt="Modern Hybrid Office" 
                        aspectRatio="4/3"
                        className="shadow-2xl rounded-2xl"
                        mode="zoom-in"
                    />
                </Reveal>
            </div>
        </div>
      </div>
    </section>
  );
};