import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.access_token);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
