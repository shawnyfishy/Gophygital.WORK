import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureTabs } from './FeatureTabs';
import { Reveal } from './ui/Reveal';

const suites = {
  workplace: {
    id: 'workplace',
    title: "Workplace Experience Suite",
    tagline: "Retain Talent.",
    subTagline: "Cut Real Estate Costs.",
    description: "Transform your office into a productivity engine. Use real-time data to right-size your portfolio and deliver the seamless hybrid experience your employees deserve.",
    audience: "For Corporates & Enterprises",
    benefits: ["Space Analytics ROI", "Boost Productivity", "Right-Size Costs", "Automated Booking"],
    features: [
      {
        category: "Space & Hybrid Work",
        items: [
          { title: "Desk Booking", desc: "Interactive floor maps with team neighborhoods." },
          { title: "Meeting Room Mgmt", desc: "Outlook/Google Calendar sync." },
          { title: "Parking Mgmt", desc: "Real-time spot availability." },
          { title: "Visitor Mgmt", desc: "Touchless entry and host notifications." },
        ]
      },
      {
        category: "Operations",
        items: [
          { title: "Space Analytics", desc: "Heatmaps to optimize real estate spend." },
          { title: "Access Control", desc: "Mobile-based BLE/NFC integration." },
          { title: "Internal Comms", desc: "Company announcements and news feeds." },
        ]
      }
    ]
  },
  building: {
    id: 'building',
    title: "Commerce Building Suite",
    tagline: "Increase NOI.",
    subTagline: "Automate Everything.",
    description: "Stop leaving money on the table. Automate billing to ensure revenue capture and provide a premium digital experience that commands higher rents.",
    audience: "For Developers & Property Managers",
    benefits: ["Maximize Income", "Zero Revenue Leakage", "Tenant Retention", "Higher Asset Valuation"],
    features: [
      {
        category: "Finance",
        items: [
          { title: "Automated Billing", desc: "Rent, CAM, and utility invoices." },
          { title: "Utility Metering", desc: "IoT real-time consumption tracking." },
          { title: "Revenue Analytics", desc: "Track yield and arrears in real-time." },
        ]
      },
      {
        category: "Tenant Experience",
        items: [
          { title: "Tenant App", desc: "White-labeled app for building services." },
          { title: "Amenity Booking", desc: "Monetize shared conference halls." },
          { title: "Complaint Mgmt", desc: "SLA-driven helpdesk for grievances." },
        ]
      }
    ]
  }
};

interface SolutionToggleProps {
  activeTab: 'workplace' | 'building';
  onTabChange: (tab: 'workplace' | 'building') => void;
}

export const SolutionToggle: React.FC<SolutionToggleProps> = ({ activeTab, onTabChange }) => {
  return (
    <div id="solutions" className="py-24 relative z-20 section-glass border-t border-black/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal width="100%">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-serif text-peach-text tracking-tight mb-2">Impact Driven Solutions.</h2>
                    <p className="text-peach-muted text-lg font-sans">Tailored experiences for modern real estate ecosystems.</p>
                </div>
                <div className="inline-flex bg-peach-soft p-1 rounded-full border border-black/5">
                    <button
                        onClick={() => onTabChange('workplace')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'workplace' 
                            ? 'bg-peach-text text-white shadow-lg' 
                            : 'text-peach-text/60 hover:text-peach-text'
                        }`}
                    >
                        Workplace
                    </button>
                    <button
                        onClick={() => onTabChange('building')}
                        className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeTab === 'building' 
                            ? 'bg-peach-text text-white shadow-lg' 
                            : 'text-peach-text/60 hover:text-peach-text'
                        }`}
                    >
                        Building
                    </button>
                </div>
            </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-2 gap-16 lg:gap-24"
          >
            <div className="space-y-10">
              <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-peach-accent/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-peach-accent">
                    {suites[activeTab].audience}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif text-peach-text tracking-tight">
                    {suites[activeTab].tagline}
                    <span className="block text-peach-muted/60">{suites[activeTab].subTagline}</span>
                  </h3>
              </div>
              
              <p className="text-xl text-peach-muted leading-relaxed font-sans">
                {suites[activeTab].description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/5">
                {suites[activeTab].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-peach-text font-bold text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-peach-accent" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div>
               <FeatureTabs features={suites[activeTab].features} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};