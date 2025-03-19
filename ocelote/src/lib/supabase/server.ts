import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // ✅ Ahora usamos `await` correctamente

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookies()).getAll(); // ✅ `await cookies()` para obtener las cookies correctamente
        },
        async setAll(cookiesToSet) {
          const store = await cookies(); // ✅ Esperamos `cookies()` antes de modificar
          cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
        },
      },
    }
  );
}
