"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            alert("Success. Check your email for the confirmation link.");
        }
        setLoading(false);
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
            <div className="w-full bg-zinc-900 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  border-zinc-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Create an account
                    </h1>
                    {error && <p className="text-red-500">{error}</p>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 " 
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
                                className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400" 
                                required/>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">Confirm password</label>
                            <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400" required/>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-zinc-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-oceloteRed hover:bg-oceloteRedHover focus:ring-primary-800"
                            disabled={loading}>
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                        <p className="text-sm font-light text-gray-400">
                            Already have an account? 
                            <Link href="/pages/admin/login" className="font-medium hover:underline text-primary-500">
                                 Login here
                            </Link>
                            
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    );
  }
  