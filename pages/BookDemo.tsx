import React from 'react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

export const BookDemo: React.FC = () => {
  return (
    <div className="pt-32 pb-20 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-24 items-center">
        
        {/* Left Content */}
        <div>
          <Reveal>
            <span className="font-sans font-bold text-peach-accent text-sm tracking-widest uppercase border-b border-peach-accent/30 pb-1 mb-6 block w-fit">
              Get Started
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-peach-text mb-8 tracking-tighter">
              Transform Your <br/> Workplace Today.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-peach-muted mb-12 leading-relaxed font-serif">
              Schedule a personalized demo with our experts to see how GoPhygital can streamline your operations and enhance tenant experience.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <div className="space-y-8 mb-12 border-l-2 border-peach-accent/20 pl-8">
               <div>
                  <h4 className="text-peach-text font-bold text-lg mb-2 flex items-center gap-3">
                     <MapPin className="text-peach-accent" size={20} /> HQ Location
                  </h4>
                  <p className="text-peach-muted font-serif">Samshik Infoline Pvt. Ltd.<br/>Mumbai, India</p>
               </div>
               <div>
                  <h4 className="text-peach-text font-bold text-lg mb-2 flex items-center gap-3">
                     <Mail className="text-peach-accent" size={20} /> Email Us
                  </h4>
                  <p className="text-peach-muted font-serif">sales@gophygital.work</p>
               </div>
            </div>
          </Reveal>
        </div>

        {/* Right Form */}
        <Reveal delay={0.4} className="w-full">
            <form className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-peach-accent/5 rounded-full blur-[80px] pointer-events-none" />
              
               <h3 className="text-2xl font-serif font-bold text-peach-text mb-8">Book Your Session</h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-peach-muted mb-2">First Name</label>
                    <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text placeholder-peach-text/30" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-peach-muted mb-2">Last Name</label>
                    <input type="text" className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text placeholder-peach-text/30" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-peach-muted mb-2">Work Email</label>
                  <input type="email" className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text placeholder-peach-text/30" placeholder="jane@company.com" />
                </div>
                
                <div>
                   <label className="block text-xs font-bold uppercase tracking-wider text-peach-muted mb-2">Solution Interest</label>
                   <select className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none text-peach-text appearance-none cursor-pointer">
                     <option>Workplace Suite</option>
                     <option>Building Suite</option>
                     <option>Partnership</option>
                   </select>
                </div>

                <div className="pt-4">
                    <Button variant="primary" className="w-full h-14 text-lg font-bold rounded-lg shadow-lg">
                        Confirm Booking
                    </Button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-black/5 flex flex-wrap justify-between gap-4 text-xs text-peach-muted">
                 <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-peach-accent"/> 30-Day Free Trial</span>
                 <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-peach-accent"/> No Commitments</span>
              </div>
            </form>
        </Reveal>

      </div>
    </div>
  );
};