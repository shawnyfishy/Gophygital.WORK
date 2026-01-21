import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  scrolled: boolean;
  onNavigate: (mode?: 'workplace' | 'building') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  // Enhanced Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['solutions', 'integrations', 'about', 'contact'];
      // Offset to account for sticky header
      const scrollPosition = window.scrollY + 150; 

      let currentSection = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSection = `#${section}`;
            }
        }
      }
      setActiveHash(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, mode?: 'workplace' | 'building') => {
    e.preventDefault();
    setIsOpen(false);
    
    // Handle mode switching first if present
    if (mode) {
        onNavigate(mode);
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Manually set hash without jumping
      window.history.pushState(null, '', `#${id}`);
      setActiveHash(`#${id}`);
    }
  };

  // Nav Items Configuration
  const navLinks = [
    { name: "Workplace", id: "solutions", mode: 'workplace' as const },
    { name: "Building", id: "solutions", mode: 'building' as const },
    { name: "Ecosystem", id: "integrations" },
    { name: "About", id: "about" }
  ];

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
        <nav
          className={`
            pointer-events-auto
            flex items-center gap-2 md:gap-4
            liquid-glass rounded-full
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled ? 'py-2 px-3 scale-95' : 'py-3 px-6'}
          `}
        >
          {/* Logo */}
          <div className="flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95 pr-2 md:pr-4">
             <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
               <img 
                 className="h-8 md:h-10 w-auto object-contain invert hue-rotate-180 drop-shadow-sm" 
                 alt="GoPhygital" 
                 src="https://gophygital.work/wp-content/uploads/gophygital-web-logo.png" 
               />
             </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a 
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id, item.mode)}
                className={`
                  relative px-5 py-2.5 rounded-full transition-all duration-300 text-sm font-semibold tracking-wide cursor-pointer
                  hover:bg-white/40
                  ${activeHash === `#${item.id}` && (!item.mode || (item.mode && window.location.hash.includes(item.mode))) 
                      ? 'text-peach-text font-bold bg-white/60 shadow-sm' 
                      : 'text-peach-text/70'
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block pl-2">
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
              <Button variant="primary" className="rounded-full px-6 py-2.5 text-sm font-bold tracking-wide shadow-lg hover:shadow-peach-accent/30 transition-all">
                Book Demo
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-peach-text bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 backdrop-blur-3xl z-40 transition-all duration-500 flex flex-col items-center justify-center ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col gap-10 text-center">
            {navLinks.map((item) => (
                <a 
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id, item.mode)}
                  className="text-4xl font-serif font-medium text-peach-text hover:text-peach-accent transition-colors cursor-pointer"
                >
                    {item.name}
                </a>
            ))}
            <div className="pt-10">
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                <Button variant="primary" className="px-14 py-6 rounded-full text-2xl shadow-xl">Book Free Demo</Button>
              </a>
            </div>
          </div>
      </div>
    </>
  );
};