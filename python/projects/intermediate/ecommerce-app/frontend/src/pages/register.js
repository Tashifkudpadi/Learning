import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
        {
          email,
          password,
        }
      );
      toast.success("Registration successful! Please login.");
      router.push("/");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
