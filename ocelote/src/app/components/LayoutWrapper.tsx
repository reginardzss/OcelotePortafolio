"use client"; // 🔹 Ahora sí podemos usar `usePathname`

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // ✅ Obtener la ruta actual

  return (
    <div>
      {/* ✅ Mostrar Navbar solo si NO estamos en /login */}
      {pathname !== "/pages/admin/login" && <Navbar />}
      <main>{children}</main>
    </div>
  );
}
