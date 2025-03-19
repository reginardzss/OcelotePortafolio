//ocelote/src/app/pages/admin/login/page.tsx

"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Login() {
    const router = useRouter(); //Obtener el router
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //Función para iniciar sesión
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); //Evitar que el formulario recargue la página
        setLoading(true); //Mostrar mensaje de carga
        setError(""); //Limpiar mensajes de error

        //Iniciar sesión con Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push("/pages/admin/dashboard");
        }
    };


    return (
    <section>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6">
            <img
            alt="Ocelote Films"
            src="/logo/ocelote-logo-blanco4x.png"
            className="mx-auto h-12 w-auto"
            />    
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-900 border-zinc-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Sign in to your account
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400" 
                            placeholder="name@company.com" 
                            required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400" 
                            required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-zinc-700 border-zinc-600 dark:focus:ring-primary-600 ring-offset-zinc-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium hover:underline">Forgot password?</a>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-oceloteRed hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-oceloteRedHover focus:ring-primary-800">
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                    <p className="text-sm font-light">
                        Don’t have an account yet? 
                        <Link href="/pages/admin/register" className="font-medium text-primary-600 hover:underline">
                             Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
    </section>
    );
  }
  