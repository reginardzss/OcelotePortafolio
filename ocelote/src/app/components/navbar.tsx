import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'next/image'

const Navbar: React.FC = () => {
  return (
  <nav className="sticky top-0 z-10">
  <div className="flex w-screen h-16 items-center p-8 bg-black">
      <Link to="/"> 
        <Image 
          src="/logo/ocelote-logo-blanco4x.png" 
          height={30} 
          width={300}
          alt="ocelote-logo"  
          /> 
        </Link>
      <div className="w-full flex flex-row-reverse">
          <ul className="flex flex-row">
              <li className="px-4">
                  <Link to="/">ABOUT US</Link>
              </li>
              <li className="px-4">
                  <Link to="/">PROJECTS</Link>
              </li>
              <li className="pl-4">
                  <Link to="/">CONTACT US</Link>
              </li>
          </ul>
      </div>
  </div>
  </nav>
  );
};

export default Navbar;