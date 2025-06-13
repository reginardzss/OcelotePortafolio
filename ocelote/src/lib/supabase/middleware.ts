//ocelote/src/lib/supabase/middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  console.log("🛠 Middleware ejecutándose en:", request.nextUrl.pathname);

  let response = NextResponse.next(); // Respuesta base

  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  });

  const { data: { user } } = await supabase.auth.getUser();
  console.log("👤 Usuario detectado:", user);

  const isAuthRoute = request.nextUrl.pathname.startsWith("/pages/admin/login") || request.nextUrl.pathname.startsWith("/pages/admin/register");

  if (!user && !isAuthRoute) {
    console.log("🔴 Usuario no autenticado, redirigiendo a login midleware...");
    const url = request.nextUrl.clone();
    url.pathname = "/pages/admin/login";
    return NextResponse.redirect(url);
  }

  return response; // Retornar la respuesta con la sesión actualizada
}
