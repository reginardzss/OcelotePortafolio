import React from 'react';

const Hero: React.FC = () => {
  return (
     <section className="w-screen h-screen flex items-center justify-center">
        <video 
          autoPlay loop playsInline 
          className=" w-full h-full object-cover">
          <source src="/assets/bg-mp.mov" type="video/mp4"/>
          Your browser does not support the video tag.
        </video> 
        <div className="absolute w-screen h-screen bg-black opacity-50"></div>
        <div className="absolute w-screen h-screen flex items-center">
        <div className="flex flex-col p-8 text-4xl md:text-6xl lg:text-8xl  ">
            <div className="text-oceloteRed">OCELOTE FILMS</div>
            <div>WHERE CREATIVITY <br /> MEETS FILMMAKING.</div>
          </div>
        </div>
    </section>  
  );
};

export default Hero;