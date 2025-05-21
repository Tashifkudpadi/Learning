"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API_URL from "@/config";

interface LoginError {
  message: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginError | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL.BASE_API}/auth/login`, {
        email,
        password,
      });
      const { access_token, username } = response.data;
      localStorage.setItem("token", access_token); // Store JWT
      localStorage.setItem("username", username); // Store username
      router.push("/dashboard"); // Redirect to dashboard
    } catch (err: any) {
      setError({ message: err.response?.data?.detail || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-90 mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>
      <form onSubmit={handleSubmit}>
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
          className={`w-full py-2 px-4 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: "oklch(0.47 0.05 2.05)" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="flex justify-center mt-4 flex-column">
        <p className="text-black">New Registeration?</p>
        <Link
          href="/register"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
}
