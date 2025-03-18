"use client";

import Link from "next/link";
import Image from "next/image";

const NavbarAdmin: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 bg-black">
      <div className="flex w-screen h-16 items-center p-8">
        <Link href="/pages/admin/dashboard">
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
                <Link href="/pages/admin/content/upload">UPLOAD</Link>
            </li>
            <li className="px-4">
              <Link href="/pages/projects">PROJECTS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;