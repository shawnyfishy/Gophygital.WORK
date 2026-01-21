import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Wifi, Lock, Server, Share2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';

export const IntegrationEcosystem: React.FC = () => {
  return (
    <section id="integrations" className="py-32 relative overflow-hidden z-20 section-glass border-t border-black/5">
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <Reveal width="100%">
            <div className="text-center mb-32">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight text-peach-text">
                Turn Data into Decisions.
              </h2>
              <p className="text-peach-muted text-xl max-w-2xl mx-auto font-sans leading-relaxed">
                Stop wrestling with spreadsheets. Gain a single source of truth by unifying your HR, Access, and HVAC systems into one intelligent brain that proactively manages costs.
              </p>
            </div>
        </Reveal>

        {/* Hub and Spoke Visual */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          
          {/* Center Hub - Removed Blur */}
          <motion.div 
            className="relative z-20 w-48 h-48 bg-white/95 rounded-full flex items-center justify-center shadow-2xl p-8 border border-peach-text/5"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
             <img 
                 className="w-full h-auto object-contain invert hue-rotate-180" 
                 alt="GoPhygital" 
                 src="https://gophygital.work/wp-content/uploads/gophygital-web-logo.png" 
               />
          </motion.div>

          {/* Orbiting Nodes - Removed Blur */}
          {[
            { icon: Database, label: "HRMS", desc: "Workday, SAP", x: "0%", y: "-180%" },
            { icon: Wifi, label: "IoT Sensors", desc: "Air Quality", x: "160%", y: "-90%" },
            { icon: Server, label: "CFMS", desc: "Facility Mgmt", x: "160%", y: "90%" },
            { icon: Lock, label: "Access Control", desc: "HID, Honeywell", x: "0%", y: "180%" },
            { icon: Cloud, label: "Private Cloud", desc: "AWS, Azure", x: "-160%", y: "90%" },
            { icon: Share2, label: "Communication", desc: "Slack, Teams", x: "-160%", y: "-90%" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute w-64 p-6 glass-panel bg-white/85 rounded-2xl flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all cursor-pointer group border border-black/5"
              style={{ 
                left: "50%", 
                top: "50%", 
                marginLeft: "-128px", 
                marginTop: "-48px", 
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: item.x, y: item.y }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-full bg-peach-accent/10 text-peach-accent flex items-center justify-center shrink-0 border border-peach-accent/20 group-hover:bg-peach-accent group-hover:text-white transition-colors">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-peach-text text-sm">{item.label}</h4>
                <p className="text-xs text-peach-muted group-hover:text-peach-text/70 transition-colors">{item.desc}</p>
              </div>
            </motion.div>
          ))}
          
          <div className="absolute border border-dashed border-peach-text/10 rounded-full w-[400px] h-[400px] animate-spin-slow pointer-events-none" />
          <div className="absolute border border-dashed border-peach-text/5 rounded-full w-[800px] h-[800px] animate-float pointer-events-none" />
        </div>
      </div>
    </section>
  );
};