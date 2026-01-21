import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { CheckCircle2, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const FinalCTA: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We've received your request.");
  };

  return (
    <section className="py-32 relative overflow-hidden z-20 bg-peach-text text-white">
      {/* Background Architectural Grid (Inverted) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }} 
        />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-peach-accent/20 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                    <Sparkles size={14} className="text-peach-accent" />
                    <span className="text-xs font-bold tracking-widest uppercase">Limited Availability</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-tighter leading-none">
                  Ready to <br/>
                  <span className="text-peach-accent">Modernize?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl text-white/70 mb-12 leading-relaxed font-sans font-light">
                  Join the forward-thinking enterprises using GoPhygital to reduce costs and delight tenants.
                </p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="space-y-8 mb-12 border-l border-white/20 pl-8">
                   <div className="group">
                      <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-peach-accent">
                            <MapPin size={16} />
                         </div>
                         HQ Location
                      </h4>
                      <p className="text-white/50 font-serif pl-11">Samshik Infoline Pvt. Ltd.<br/>Mumbai, India</p>
                   </div>
                   <div className="group">
                      <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                         <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-peach-accent">
                            <Mail size={16} />
                         </div>
                         Email Us
                      </h4>
                      <p className="text-white/50 font-serif pl-11">sales@gophygital.work</p>
                   </div>
                </div>
              </Reveal>
            </div>

            {/* Right Form - The "Card" */}
            <Reveal delay={0.4} className="lg:col-span-7 w-full">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                >
                   {/* Form Background Accent */}
                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-peach-accent via-peach-text to-peach-accent" />
                  
                   <div className="flex justify-between items-end mb-10">
                       <div>
                           <h3 className="text-3xl font-serif font-bold text-peach-text mb-2">Book a Demo</h3>
                           <p className="text-peach-muted text-sm">See the platform in action. No commitment.</p>
                       </div>
                       <div className="hidden md:block">
                           <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center">
                               <ArrowRight className="text-peach-text -rotate-45" />
                           </div>
                       </div>
                   </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label 
                            className={`absolute left-0 transition-all duration-300 ${focusedField === 'fname' || formValues.fname ? '-top-3 text-xs text-peach-accent font-bold' : 'top-3 text-peach-muted'}`}
                        >
                            First Name
                        </label>
                        <input 
                            id="fname"
                            type="text" 
                            value={formValues.fname}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('fname')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text" 
                        />
                      </div>
                      <div className="relative">
                        <label 
                            className={`absolute left-0 transition-all duration-300 ${focusedField === 'lname' || formValues.lname ? '-top-3 text-xs text-peach-accent font-bold' : 'top-3 text-peach-muted'}`}
                        >
                            Last Name
                        </label>
                        <input 
                            id="lname"
                            type="text" 
                            value={formValues.lname}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('lname')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text" 
                        />
                      </div>
                    </div>

                    <div className="relative">
                        <label 
                            className={`absolute left-0 transition-all duration-300 ${focusedField === 'email' || formValues.email ? '-top-3 text-xs text-peach-accent font-bold' : 'top-3 text-peach-muted'}`}
                        >
                            Work Email
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            value={formValues.email}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-0 py-3 bg-transparent border-b border-black/10 focus:border-peach-accent outline-none transition-colors text-peach-text" 
                        />
                    </div>
                    
                    <div className="relative">
                       <label className="text-xs text-peach-accent font-bold uppercase tracking-wider mb-2 block">I am interested in</label>
                       <div className="grid grid-cols-2 gap-3 mt-2">
                            {['Workplace Suite', 'Building Suite', 'Both', 'Partnership'].map((opt) => (
                                <label key={opt} className="cursor-pointer">
                                    <input type="radio" name="interest" className="peer sr-only" />
                                    <div className="px-4 py-3 rounded-lg border border-black/10 text-sm font-medium text-peach-muted hover:bg-gray-50 peer-checked:bg-peach-text peer-checked:text-white peer-checked:border-peach-text transition-all text-center">
                                        {opt}
                                    </div>
                                </label>
                            ))}
                       </div>
                    </div>

                    <div className="pt-6">
                        <Button variant="primary" className="w-full h-16 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl">
                            Confirm Booking
                            <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                  </form>
                  
                  <div className="mt-8 pt-6 border-t border-black/5 flex flex-wrap justify-center gap-6 text-xs text-peach-muted font-medium">
                     <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-600"/> 30-Day Free Trial</span>
                     <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-600"/> No Credit Card Required</span>
                     <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-600"/> Cancel Anytime</span>
                  </div>
                </motion.div>
            </Reveal>
        </div>
      </div>
    </section>
  );
};