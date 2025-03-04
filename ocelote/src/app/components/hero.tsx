"use client";

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center relative">
      
      <video autoPlay loop playsInline className=" w-full h-full object-cover">
      <source src="/assets/bg-mp.mov" type="video/mp4"></source>
        Tu navegador no soporta videos en HTML5.
      </video> 
      
      <div className="absolute w-full h-full bg-black opacity-50"></div>
      <div className="absolute w-full h-full">
        <div className="w-full h-full flex items-center">
          <div className="flex flex-col p-16 text-8xl">
            <div className="text-oceloteRed">OCELOTE FILMS</div>
            <div>WHERE CREATIVITY <br /> MEETS FILMMAKING.</div>
          </div>
        </div>  
      </div>
    </section> 
  );
};

export default Hero;