"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import NavbarAdmin from "./navbarAdmin";
import path from "path";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtener la ruta actual

  if (pathname === "/pages/admin/login" || pathname === "/pages/admin/register") {
    return <main>{children}</main>;
  }
  return (
    <div>
      {/* Mostrar NavbarAdmin si la ruta actual comienza con /pages/admin */}
      {pathname.startsWith("/pages/admin") ? <NavbarAdmin /> : <Navbar />}
      <main>{children}</main>
    </div>
  );
}
