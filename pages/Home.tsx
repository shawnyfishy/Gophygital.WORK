import React from 'react';
import { Hero } from '../components/Hero';
import { ProblemStatement } from '../components/ProblemStatement';
import { SolutionToggle } from '../components/SolutionToggle';
import { IntegrationEcosystem } from '../components/IntegrationEcosystem';
import { TrustAndSecurity } from '../components/TrustAndSecurity';
import { FinalCTA } from '../components/FinalCTA';

interface HomeProps {
  activeSolution: 'workplace' | 'building';
  setActiveSolution: (solution: 'workplace' | 'building') => void;
}

export const Home: React.FC<HomeProps> = ({ activeSolution, setActiveSolution }) => {
  return (
    <>
      <Hero />
      <div className="relative">
        <ProblemStatement />
        <SolutionToggle activeTab={activeSolution} onTabChange={setActiveSolution} />
        <IntegrationEcosystem />
        <TrustAndSecurity />
        <FinalCTA />
      </div>
    </>
  );
};