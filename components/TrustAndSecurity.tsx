import React from 'react';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const TrustAndSecurity: React.FC = () => {
  return (
    <section className="py-32 relative z-20 section-glass border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div>
            <Reveal variant="blur">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-peach-text mb-6 tracking-tight">
                  Security First.
                </h2>
            </Reveal>
            <Reveal delay={0.1} variant="fade-up">
                <p className="text-lg text-peach-muted mb-12 leading-relaxed font-sans">
                  Enterprise-grade security you can trust. Your data is protected with industry-leading standards, ensuring compliance for even the most regulated industries.
                </p>
            </Reveal>
            
            <div className="space-y-8">
              {[
                { icon: ShieldCheck, title: "ISO 27018 Certified", desc: "Standard for protecting PII in public clouds." },
                { icon: Lock, title: "GDPR Compliant", desc: "Full data privacy and right-to-be-forgotten adherence." },
                { icon: FileCheck, title: "Regular Audits", desc: "Penetration testing and security audits by third parties." },
              ].map((item, idx) => (
                <Reveal key={idx} delay={0.2 + (idx * 0.1)} variant="slide-right">
                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 bg-white border border-black/5 rounded-2xl flex items-center justify-center text-peach-text group-hover:text-peach-accent group-hover:border-peach-accent/30 transition-all shrink-0 shadow-sm group-hover:shadow-md">
                        <item.icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-peach-text text-lg mb-1">{item.title}</h4>
                        <p className="text-peach-muted text-sm">{item.desc}</p>
                      </div>
                    </div>
                </Reveal>
              ))}
            </div>
          </div>
          
          <Reveal delay={0.3} className="h-full" variant="scale">
              <div className="bg-white rounded-[2rem] p-12 lg:p-16 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group border border-black/5 shadow-xl">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-peach-accent/5 to-transparent opacity-50" />
                 
                 <div className="relative z-10 space-y-10">
                    <ShieldCheck size={80} className="text-peach-accent mx-auto drop-shadow-sm" strokeWidth={1} />
                    <div>
                        <div className="text-5xl font-bold text-peach-text mb-2">100%</div>
                        <div className="text-sm text-peach-muted uppercase tracking-widest font-bold">Secure & Compliant</div>
                    </div>
                    <div className="flex gap-4 justify-center text-peach-text/70 font-mono text-xs">
                        <span className="border border-black/10 px-3 py-1 rounded bg-peach-bg">ISO 27018</span>
                        <span className="border border-black/10 px-3 py-1 rounded bg-peach-bg">GDPR</span>
                    </div>
                 </div>
              </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};