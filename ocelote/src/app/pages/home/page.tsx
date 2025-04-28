import React from 'react';
import Hero from '../../components/home/hero';
import HomeSectionOne from '@/app/components/home/home-section-1';
import HomeSectionTwo from '@/app/components/home/home-section-2';

const Home: React.FC = () => {
  return (
    <div>
      <Hero/>
      <HomeSectionOne/>
      <HomeSectionTwo/>
    </div>
  );
};

export default Home;