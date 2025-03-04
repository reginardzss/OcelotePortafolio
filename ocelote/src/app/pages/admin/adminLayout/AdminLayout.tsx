"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import NavbarAdmin from "@/app/components/admin/navbarAdmin";

export default function AdminLayout ({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ first_name: string; last_name: string } | null>(null);

    useEffect(() => {
        const checkAuth = async () => { 
            //Obtener datos de autenticación del usuario
            const {data:authData, error:authError} = await supabase.auth.getUser();
            
            //Si hay error o no hay usuario, redirige a la página de login
            if(authError || !authData.user) {
                router.push("/pages/admin/login");
                return;
            }

            //Si el usuario no ha confirmado su correo, muestra un mensaje y cierra sesión
            if (!authData.user.email_confirmed_at){
                alert("Debes confirmar tu correo antes de acceder");
                await supabase.auth.signOut();
                router.push("/pages/admin/login");
                return;
            }

            //Obtener datos del usuario desde la tabla "admin_users"
            const {data:userData, error:userError} = await supabase
                .from("admin_users")
                .select("first_name, last_name")
                .eq("user_id", authData.user.id)
                .single();

            if(userError){
                console.error("❌ Error fetching user data:", userError);
            } else {
                setUser(userData);
            }
            //Finalizar la carga
            setLoading(false);
        };
        //Ejecutar la función de verificación
        checkAuth();
}, [router]); //Ejecutar solo al cargar el componente

    //Función para cerrar sesión
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/pages/admin/login");
    };

    //Si la página está cargando, muestra un mensaje
    if(loading){
        return <p className="text-center text-white">Cargando...</p>;
    }

    return (
        <div>
        <div className="container mx-auto p-8">
          <p className="text-gray-300">Bienvenido, {user?.first_name}</p>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
            Cerrar sesión
          </button>
        </div>
        <main>{children}</main>
      </div>
    );
}