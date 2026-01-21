import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface FeatureItem {
  title: string;
  desc: string;
}

interface FeatureCategory {
  category: string;
  items: FeatureItem[];
}

interface FeatureTabsProps {
  features: FeatureCategory[];
}

export const FeatureTabs: React.FC<FeatureTabsProps> = ({ features }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-8 no-scrollbar border-b border-black/10">
        {features.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategoryIndex(idx)}
            className={`whitespace-nowrap pb-4 text-base font-bold tracking-wide transition-colors relative ${
              activeCategoryIndex === idx ? 'text-peach-text' : 'text-peach-muted hover:text-peach-text'
            }`}
          >
            {cat.category}
            {activeCategoryIndex === idx && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-peach-text"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features[activeCategoryIndex].items.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1, 
                    ease: [0.16, 1, 0.3, 1] 
                }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-black/5 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-5">
                  <h4 className="font-serif font-bold text-xl text-peach-text group-hover:text-peach-accent transition-colors">
                    {item.title}
                  </h4>
                  <ArrowUpRight size={20} className="text-peach-muted group-hover:text-peach-accent transition-colors" />
                </div>
                <p className="text-peach-muted text-base leading-7 group-hover:text-peach-text/80 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};