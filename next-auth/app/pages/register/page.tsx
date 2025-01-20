"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Register } from "@/component/signUp";

interface formData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface registerResponse {
  message: string;
  status: number;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<formData>({} as formData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      setFormData({ name, email, password, confirmPassword });
      console.log(formData);

      const data = { name, email, password, confirmPassword };
      await Register(data.name, data.email, data.password).then((response: registerResponse) => {
        console.log(response);
        if (response.status === 200) {
          console.log("success");
          setSuccess(true);
          setError(null);
          setLoading(false);

          const interval = setInterval(() => {
            setSuccess(false);
            setError(null);
            clearInterval(interval);
            router.push("/pages/login");
          }, 5000);
        } else {
          console.log("error");
          setError(response.message);
          setLoading(false);

          const interval = setInterval(() => {
            setError(null);
            clearInterval(interval);
          }, 3000);
        }
      });
    } catch (error) {
      console.error(error);
      setError("Failed to Register, please try again");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 flex items-center justify-center text-gray-800">
          <FaUserPlus className="mr-2" /> Register
        </h1>
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setConfirmPassword('');
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(e.target.value === password)
              }}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {!confirmPasswordError && <p className="text-red-500">password dont match</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           disabled = {loading}
        >
           {loading ? "Registring...":"Register" }
          </button>
          <div className="space-y-2">
            <button
              className="border-2 w-full text-white bg-black py-2 rounded-md flex items-center justify-center space-x-2"
              type="button"
              onClick={() => signIn("github")}
            >
              <FaGithub />
              <p>Sign up with GitHub</p>
            </button>
            <button
              className="border-2 w-full text-white bg-black py-2 rounded-md flex items-center justify-center space-x-2"
              type="button"
              onClick={() => signIn("google")}
            >
              <FaGoogle />
              <p>Sign up with Google</p>
            </button>
          </div>
        </form>
        {success && (
          <p className="text-green-500 mt-4 text-center">
            Account Created Successfully! Redirecting to login page...
          </p>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/pages/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
