import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Wifi, Lock, Server, Share2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const nodes = [
    { icon: Database, label: "HRMS", desc: "Workday, SAP", x: "0%", y: "-180%" },
    { icon: Wifi, label: "IoT Sensors", desc: "Air Quality", x: "160%", y: "-90%" },
    { icon: Server, label: "CFMS", desc: "Facility Mgmt", x: "160%", y: "90%" },
    { icon: Lock, label: "Access Control", desc: "HID, Honeywell", x: "0%", y: "180%" },
    { icon: Cloud, label: "Private Cloud", desc: "AWS, Azure", x: "-160%", y: "90%" },
    { icon: Share2, label: "Communication", desc: "Slack, Teams", x: "-160%", y: "-90%" },
];

export const IntegrationEcosystem: React.FC = () => {
  return (
    <section id="integrations" className="py-32 relative overflow-hidden z-20 section-glass border-t border-black/5">
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <Reveal width="100%" className="mx-auto text-center" variant="blur">
            <div className="mb-24">
              <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 tracking-tight text-peach-text">
                One intelligent brain for <br/> your entire ecosystem.
              </h2>
              <p className="text-peach-muted text-xl max-w-2xl mx-auto font-sans leading-relaxed">
                Connect your existing infrastructure and software. GoPhygital unifies disparate data points into actionable insights.
              </p>
            </div>
        </Reveal>

        <div className="relative h-[600px] w-full flex items-center justify-center">
          
          {/* Hub */}
          <motion.div 
            className="relative z-20 w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl p-8 border border-black/5"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
             <img 
                 className="w-full h-auto object-contain invert hue-rotate-180" 
                 alt="GoPhygital" 
                 src="https://gophygital.work/wp-content/uploads/gophygital-web-logo.png" 
               />
          </motion.div>

          {/* Nodes */}
          {nodes.map((item, index) => (
            <motion.div
              key={index}
              className="absolute w-52 p-4 bg-white/80 backdrop-blur-sm rounded-xl flex items-center gap-3 hover:bg-white hover:shadow-xl transition-all cursor-pointer group border border-black/5"
              style={{ left: "50%", top: "50%", marginLeft: "-104px", marginTop: "-40px" }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x: item.x, y: item.y }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-lg bg-peach-bg text-peach-text flex items-center justify-center shrink-0 border border-black/5 group-hover:bg-peach-accent group-hover:text-white transition-colors">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-peach-text text-sm">{item.label}</h4>
                <p className="text-[10px] text-peach-muted uppercase tracking-wider font-bold opacity-60">{item.desc}</p>
              </div>
            </motion.div>
          ))}
          
          <div className="absolute border border-black/5 rounded-full w-[400px] h-[400px] animate-spin-slow pointer-events-none" />
          <div className="absolute border border-black/[0.02] rounded-full w-[800px] h-[800px] animate-float pointer-events-none" />
        </div>
      </div>
    </section>
  );
};