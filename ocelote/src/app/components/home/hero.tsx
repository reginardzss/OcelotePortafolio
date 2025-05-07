//ocelote/src/app/components/home/hero.tsx

'use client'
import React from 'react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
     <section className="w-screen h-[90lvh] md:h-screen flex items-center justify-center">
        <video 
          autoPlay muted loop playsInline 
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => console.error("Error cargando el video")}
          className=" w-full h-full object-cover">
          <source src="/assets/bg-mp.mov" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></span>
            </div>
          )}

 
        <div className="absolute w-screen h-[90lvh] md:h-screen bg-black opacity-50"></div>
        <div className="absolute w-screen h-[90lvh] md:h-screen flex items-center">
        <div className="flex flex-col p-8 lg:p-16  text-4xl md:text-6xl lg:text-8xl  ">
            <div className="text-oceloteRed">OCELOTE FILMS</div>
            <div>WHERE CREATIVITY <br /> MEETS FILMMAKING.</div>
          </div>
        </div>
    </section>  
  );
};

export default Hero;