import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/10 relative z-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
               <img 
                 className="h-8 w-auto object-contain" 
                 alt="GoPhygital" 
                 src="https://gophygital.work/wp-content/uploads/gophygital-web-logo.png" 
                 srcSet="https://gophygital.work/wp-content/uploads/gophygital-web-logo.png 1x, https://gophygital.work/wp-content/uploads/gophygital-web-logo.png 2x"
               />
            </div>
            <p className="text-sm text-white/50 mb-6">
              India's Leading Commercial Real Estate & Community Management Platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-accent-green transition-colors">Workplace Suite</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Building Suite</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-accent-green transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#" className="hover:text-accent-green transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-green transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-green text-white font-bold">Client Login</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
          <p>© 2026 GoPhygital.work - Samshik Infoline Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Sitemap</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};