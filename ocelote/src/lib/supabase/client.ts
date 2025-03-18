//ocelote/src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";


// Create a single supabase client for interacting with your database
// Se usa en componentes que se ejecutan en el cliente (ej. Login).
export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
