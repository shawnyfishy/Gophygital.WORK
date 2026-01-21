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
    description: "Transform your office from a cost center into a productivity engine. Use real-time usage data to right-size your portfolio, reduce overhead, and deliver the seamless hybrid experience your employees deserve.",
    audience: "For Corporates & Enterprises",
    benefits: ["Prove ROI with Space Analytics", "Boost Employee Productivity", "Right-Size Portfolio Cost", "Eliminate Ghost Bookings"],
    features: [
      {
        category: "Space & Hybrid Work",
        items: [
          { title: "Desk Booking", desc: "Interactive floor maps for hot-desking with team neighborhoods." },
          { title: "Meeting Room Mgmt", desc: "Outlook/Google Calendar sync with amenities booking." },
          { title: "Parking Management", desc: "Book parking spots in advance with real-time availability." },
          { title: "Visitor Management", desc: "Touchless entry, pre-registration, and host notifications." },
          { title: "Wayfinding", desc: "Digital indoor navigation to find colleagues and rooms." },
        ]
      },
      {
        category: "Employee Services",
        items: [
          { title: "Cafeteria Ordering", desc: "Order food from your desk. Cashless payments & queue tracking." },
          { title: "Helpdesk & Ticketing", desc: "Report IT or facility issues instantly via the app." },
          { title: "Internal Communication", desc: "Company-wide announcements, polls, and news feeds." },
          { title: "Events & Communities", desc: "Discover and register for office events and interest clubs." },
          { title: "Wellness & Health", desc: "Health declarations, gym booking, and wellness content." },
        ]
      },
      {
        category: "Admin & Operations",
        items: [
          { title: "Space Analytics", desc: "Heatmaps and utilization reports to optimize real estate spend." },
          { title: "Access Control", desc: "Mobile-based access (BLE/NFC) integrated with turnstiles." },
          { title: "Employee Directory", desc: "Find and connect with colleagues across locations." },
          { title: "Vendor Management", desc: "Manage service providers and contracts seamlessly." },
        ]
      }
    ]
  },
  building: {
    id: 'building',
    title: "Commerce Building Suite",
    tagline: "Increase NOI.",
    subTagline: "Automate Everything.",
    description: "Stop leaving money on the table. Automate billing to ensure 100% revenue capture, reduce facility downtime to zero, and provide a premium digital experience that allows you to command higher market rents.",
    audience: "For Developers & Property Managers",
    benefits: ["Maximize Net Operating Income", "Zero Revenue Leakage", "Premium Tenant Retention", "Increase Asset Valuation"],
    features: [
      {
        category: "Leasing & Finance",
        items: [
          { title: "Lease Management", desc: "Digital lease abstraction, renewal alerts, and document repository." },
          { title: "Automated Billing", desc: "Generate rent, CAM, and utility invoices automatically." },
          { title: "Utility Metering", desc: "IoT integration for real-time electricity/water consumption tracking." },
          { title: "Payment Gateway", desc: "Collect payments online with automated reconciliation." },
          { title: "Revenue Analytics", desc: "Track occupancy, yield, and arrears in real-time." },
        ]
      },
      {
        category: "Facility Operations",
        items: [
          { title: "Asset Management", desc: "Track equipment lifecycles, warranties, and maintenance schedules." },
          { title: "Planned Maintenance", desc: "Automate PPM schedules and work order dispatching." },
          { title: "Vendor Portal", desc: "Onboard vendors, track performance, and process gate passes." },
          { title: "Security & Gate Pass", desc: "Material movement tracking (In/Out) and digital gate passes." },
          { title: "Inventory Management", desc: "Track spares and consumables with low-stock alerts." },
        ]
      },
      {
        category: "Tenant Experience",
        items: [
          { title: "Tenant App", desc: "White-labeled app for tenants to access services and amenities." },
          { title: "Amenity Booking", desc: "Monetize shared spaces like conference halls and courts." },
          { title: "Complaint Mgmt", desc: "SLA-driven helpdesk for tenant grievances and service requests." },
          { title: "Visitor Management", desc: "Enterprise-grade VMS for secure building access." },
          { title: "Community Feed", desc: "Engage tenants with building updates, offers, and events." },
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
    <div id="solutions" className="py-32 relative z-20 section-glass border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-black/10 pb-8">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif text-peach-text mb-2">Designed for Impact.</h2>
                    <h2 className="text-4xl md:text-5xl font-serif text-peach-muted/50">Tailored to Your Goals.</h2>
                </div>
                <div className="mt-8 md:mt-0">
                     <div className="inline-flex bg-white shadow-inner p-1 rounded-full">
                        <button
                          onClick={() => onTabChange('workplace')}
                          className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                            activeTab === 'workplace' 
                                ? 'bg-peach-text text-white shadow-lg' 
                                : 'text-peach-text/60 hover:text-peach-text'
                          }`}
                        >
                          Workplace
                        </button>
                        <button
                          onClick={() => onTabChange('building')}
                          className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                            activeTab === 'building' 
                                ? 'bg-peach-text text-white shadow-lg' 
                                : 'text-peach-text/60 hover:text-peach-text'
                          }`}
                        >
                          Building
                        </button>
                      </div>
                </div>
            </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-12 gap-12 lg:gap-24"
          >
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block px-4 py-1.5 mb-6 border border-peach-accent/30 bg-peach-accent/5 rounded-full text-xs font-bold uppercase tracking-widest text-peach-accent"
                  >
                    {suites[activeTab].audience}
                  </motion.div>
                  <h3 className="text-5xl md:text-7xl font-serif text-peach-text tracking-tight leading-[1.0] mb-4">
                    {suites[activeTab].tagline}
                    <span className="block text-peach-text/30 italic">{suites[activeTab].subTagline}</span>
                  </h3>
              </div>
              
              <p className="text-xl text-peach-muted leading-relaxed font-sans">
                {suites[activeTab].description}
              </p>
              
              <ul className="space-y-4 pt-4 border-t border-black/10">
                {suites[activeTab].benefits.map((benefit, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-4 text-lg text-peach-text font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-peach-accent" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 pt-12">
               <FeatureTabs features={suites[activeTab].features} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};