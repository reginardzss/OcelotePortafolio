//Solo los admins pueden acceder  a /admin
//Si no estas autenticado, te manda al login

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req:NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    
    //Obtener sesión del usuario
    const{data: {user}} = await supabase.auth.getUser();

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    //si es ruta admin verifica autenticacion
    if(isAdminRoute){
        if(!user){
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        //Verificar si el usuario es admin en Supabase
        const {data, error} = await supabase
            .from("admin_users")
            .select("id")
            .eq("user_id", user.id)
            .single();
        
        if (error || !data){
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }
    return res;
}

//solo rutas para admin y api
export const config = {
    matcher: ["/admin/:path*", "/api/:path*"],
}