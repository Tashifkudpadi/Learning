"use client";

import type React from "react";
import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import type { UserRole } from "@/types/user";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      {/* Main content with proper margin to account for sidebar */}
      <main className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
