import React from 'react';
import Hero from '../../components/home/hero';
import HomeSectionOne from '@/app/components/home/home-section-1';

const Home: React.FC = () => {
  return (
    <div>
      <Hero/>
      <HomeSectionOne/>
    </div>
  );
};

export default Home;