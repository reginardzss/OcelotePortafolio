"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function AdminDashboard(){
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{ first_name: string; last_name: string} | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: authData, error: authError } = await supabase.auth.getUser();

            if (authError || !authData.user) {
                console.warn("🔴 Usuario no autenticado, redirigiendo a login...");
                router.push("/pages/admin/login");
                return;
            }

            // Si el usuario no ha confirmado su correo, lo redirige al login
            if (!authData.user.email_confirmed_at) {
                alert("Debes confirmar tu correo antes de acceder.");
                await supabase.auth.signOut();
                router.push("/pages/admin/login");
                return;
            }

            // Obtener datos del usuario desde la tabla "admin_users"
            const { data: userData, error: userError } = await supabase
                .from("admin_users")
                .select("first_name, last_name")
                .eq("user_id", authData.user.id)
                .single();

            if (userError) {
                console.error("❌ Error obteniendo datos del usuario:", userError);
                setUser(null);
            } else {
                setUser(userData);
            }

            setLoading(false);
        };

        checkAuth();
    }, [router, supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/pages/admin/login");
    };

    if (loading) {
        return <p className="text-center text-white">Cargando...</p>;
    }
    
    return(
        <div>
            <h1>Admin Dashboard</h1>
            <p>Bienvenido, {user?.first_name}</p>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
                Cerrar sesión
            </button>
        </div>
    )
}
