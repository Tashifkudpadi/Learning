"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  };

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav
      className="text-white p-4"
      style={{ backgroundColor: "#1f4959", color: "#fff" }}
    >
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold">Task Manager</span>
        <a
          onClick={handleLogout}
          className="focus:outline-none hover:cursor-pointer bg-none"
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
