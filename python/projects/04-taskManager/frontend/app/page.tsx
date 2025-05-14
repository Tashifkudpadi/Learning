"use client";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Task Manager</h1>
      <div className="space-x-4">
        <LoginForm />
      </div>
    </main>
  );
}
