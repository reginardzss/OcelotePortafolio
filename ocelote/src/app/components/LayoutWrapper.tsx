"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import NavbarAdmin from "./admin/navbarAdmin";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtener la ruta actual

  // 🔹 Ocultar navbar en login y register
  if (pathname.startsWith("/pages/admin/login") || pathname.startsWith("/pages/admin/register")) {
    return <main>{children}</main>;
  }

  return (
    <div>
      {/* 🔹 Mostrar NavbarAdmin en TODAS las páginas dentro de /pages/admin */}
      {pathname.startsWith("/pages/admin") ? <NavbarAdmin /> : <Navbar />}
      <main>{children}</main>
    </div>
  );
}
