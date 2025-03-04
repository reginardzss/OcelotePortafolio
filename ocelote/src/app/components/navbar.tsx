"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 bg-black">
      <div className="flex w-screen h-16 items-center p-8">
        <Link href="/">
          <Image
            src="/logo/ocelote-logo-blanco4x.png"
            height={30}
            width={300}
            alt="Ocelote Logo"
          />
        </Link>
        
        <div className="w-full flex flex-row-reverse">
          <ul className="flex flex-row text-white">
            <li className="px-4">
              <Link href="/">ABOUT US</Link>
            </li>
            <li className="px-4">
              <Link href="/pages/projects">PROJECTS</Link>
            </li>
            <li className="px-4">
              <Link href="/">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
