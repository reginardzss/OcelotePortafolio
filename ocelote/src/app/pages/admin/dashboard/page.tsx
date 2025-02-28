"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const {data, error} = await supabase.auth.getUser();
            if(error || !data.user) {
                router.push("/pages/admin/login");
                return;
            }
            if (!data.user.email_confirmed_at){
                alert("Debes confirmar tu correo antes de acceder");
                await supabase.auth.signOut();
                router.push("/pages/admin/login");
                return;
            }
            setUser(data.user);
            setLoading(false);
        };
        checkAuth();
}, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/pages/admin/login");
    };

    if(loading){
        return <p className="text-center text-white">Cargando...</p>;

    }
    return(
        <div>
            <h1>Admin Dashboard</h1>
            <p>Bienvenido, {user.email}</p>
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
            >
                Cerrar sesión
            </button>
        </div>
    )
}
