"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import DashboardSidebar from "@/components/dashboard-sidebar"
import type { UserRole } from "@/types/user"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userRole, setUserRole] = useState<UserRole>("student")
  const pathname = usePathname()

  // For demo purposes, allow changing roles
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "1") setUserRole("student")
      if (e.ctrlKey && e.key === "2") setUserRole("faculty")
      if (e.ctrlKey && e.key === "3") setUserRole("admin")
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%236366f1' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <DashboardSidebar userRole={userRole} />
      {/* Main content with proper margin to account for sidebar */}
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300 relative z-10">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
