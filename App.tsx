import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Scroll3DModel } from './components/Scroll3DModel';
import { Hero } from './components/Hero';
import { ClientsSection } from './components/ClientsSection';
import { ProblemStatement } from './components/ProblemStatement';
import { SolutionToggle } from './components/SolutionToggle';
import { IntegrationEcosystem } from './components/IntegrationEcosystem';
import { TrustAndSecurity } from './components/TrustAndSecurity';
import { AboutSection } from './components/AboutSection';
import { FinalCTA } from './components/FinalCTA';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSolution, setActiveSolution] = useState<'workplace' | 'building'>('workplace');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-peach-text font-sans selection:bg-peach-accent selection:text-white relative overflow-x-hidden">
      
      {/* 3D Background */}
      <Scroll3DModel activeMode={activeSolution} />
      
      <Navbar 
        scrolled={scrolled} 
        onNavigate={(mode) => {
           if (mode) setActiveSolution(mode);
        }}
      />
      
      <main className="relative z-10">
        <Hero />
        <ClientsSection />
        <ProblemStatement />
        <SolutionToggle activeTab={activeSolution} onTabChange={setActiveSolution} />
        <IntegrationEcosystem />
        <TrustAndSecurity />
        <AboutSection />
        <div id="contact">
          <FinalCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;