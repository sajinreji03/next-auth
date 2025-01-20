    "use client"
    import React, { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import Link from "next/link";
    import { FaUserAlt,FaKey } from "react-icons/fa";
    import { FaGithub, FaGoogle } from "react-icons/fa";
    import { CredentialSignIn } from "@/component/signIn"
    import GetSession from "@/component/getsession";
    import { signIn } from "next-auth/react";

    const Login = () => {
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const route = useRouter();
      
        
        const CheckSession = async () => {
          const session = await GetSession();
          console.log("The session is", session);
          if (session?.user) route.replace("/pages/dashboard");
        };
      
        useEffect(() => {
          CheckSession();
        }, []);
      
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setError(null);
          setLoading(true);
      
          const form = e.target as HTMLFormElement;
          const email = form.email.value;
          const password = form.password.value;
      
          const response = await CredentialSignIn(email, password);
      
          if (response?.status === 400) {
            setError(response.message);
            setLoading(false);
            setTimeout(() => setError(null), 5000); 
          } else {
            route.push("/pages/dashboard");
          }
        };



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center text-gray-800">
            <FaUserAlt className="mr-2" /> Login
            </h1>
            {error && (
            <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-2 rounded">
                {error}
            </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                
                <input
                type="email"
                id="email"
                placeholder="Enter your email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div>
                
                <input
                type="password"
                id="password"
                placeholder="Enter your password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <button
                type="submit"
                className="border-2 w-full text-white bg-black pt-3 pb-2 mt-3 mb-2 rounded-md flex items-center justify-center space-x-1  focus:ring-indigo-500 focus:border-indigo-500 "
            >
                <FaKey className="mr-2" /> 
                {loading ? "Signing in..." : "Sign in with Credentials"}
            </button>

            <button className="border-2 w-full text-white bg-black pt-3 pb-2 mt-3 mb-2 rounded-md flex items-center justify-center space-x-1" 
                        type="button" onClick={() => signIn("github")}><FaGithub />
                    <p>Sign up with GitHub</p></button>
                    <button  className="border-2 w-full text-white bg-black pt-3 pb-2 mt-3 mb-2 rounded-md flex items-center justify-center space-x-1" 
                        type="button" onClick={() => signIn("google")}><FaGoogle/><p>Sign up with Google</p></button>
                    
            </form>

            <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
                Dont have an account?{" "}
                <Link href="/pages/register" className="text-indigo-600 hover:underline">Register
                </Link>
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default Login;
