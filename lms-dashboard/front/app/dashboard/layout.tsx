"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard-sidebar";
import type { UserRole } from "@/types/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<UserRole>("admin");
  const pathname = usePathname();

  // For demo purposes, allow changing roles
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "1") setUserRole("student");
      if (e.ctrlKey && e.key === "2") setUserRole("faculty");
      if (e.ctrlKey && e.key === "3") setUserRole("admin");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar userRole={userRole} />
      {/* Main content with proper margin to account for sidebar */}
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
