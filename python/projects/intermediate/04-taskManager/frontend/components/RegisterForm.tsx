"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "@/config";

interface RegisterError {
  message: string;
}

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<RegisterError | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL.BASE_API}/auth/register`, {
        username,
        email,
        password,
      });
      const { access_token, username: registeredUsername } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("username", registeredUsername); // Store username
      router.push("/dashboard");
    } catch (err: any) {
      setError({
        message: err.response?.data?.detail || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-90 mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-black mb-6">
        Sign Up
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: "oklch(0.47 0.05 2.05)" }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <p className="text-black text-center">Existing User?</p>
        <Link
          href="/login"
          className="font-medium text-blue-600 text-center dark:text-blue-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
