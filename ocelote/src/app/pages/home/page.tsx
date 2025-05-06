//ocelote/src/app/pages/home/page.tsx 

import React from 'react';
import Hero from '../../components/home/hero';
import HomeSectionOne from '@/app/components/home/home-section-1';
import HomeSectionTwo from '@/app/components/home/home-section-2';
import HomeSectionThree from '@/app/components/home/home-section-3';
import BackToTopButton from '@/app/components/backToTop';


const Home: React.FC = () => {
  return (
    <div>
      <Hero/>
      <HomeSectionOne/>
      <HomeSectionTwo/>
      <HomeSectionThree/>
      <BackToTopButton/>
    </div>
  );
};

export default Home;