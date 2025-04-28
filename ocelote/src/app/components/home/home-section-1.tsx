import React from 'react';
import InfiniteGallery from './InfiniteGallery';

const HomeSectionOne: React.FC = () => {
  return (
    <>
      <section className="w-screen h-80 md:h-screen lg:h-screen flex items-center justify-center overflow-hidden my-4">
        <InfiniteGallery/>
        <div className="absolute w-screen h-80 md:h-screen lg:h-screen bg-black opacity-80"></div>
        <div className="absolute w-screen h-80 md:h-screen lg:h-screen flex items-center justify-center px-4">
        <div className='flex flex-col items-center text-center text-lg lg:text-3xl'>
            <div>SOMOS UNA CASA PRODUCTORA DE CONTENIDO AUDIOVISUAL.</div>
            <br/>
            <div>HACEMOS QUE TU VIDEO <span className='text-oceloteRed'>DESTAQUE </span>DEL RESTO.</div>
          </div>
        </div>
    </section>  
    </> 
  );
};

export default HomeSectionOne;