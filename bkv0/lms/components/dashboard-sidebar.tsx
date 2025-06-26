"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  ClipboardList,
  FileText,
  Users,
  UserPlus,
  Layers,
  User,
  BookText,
  Menu,
  X,
  GraduationCap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserRole } from "@/types/user"

interface SidebarProps {
  userRole: UserRole
}

export default function DashboardSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Courses",
      href: "/dashboard",
      icon: BookOpen,
      roles: ["admin", "faculty", "student"],
    },
    {
      name: "Tests",
      href: "/dashboard/tests",
      icon: ClipboardList,
      roles: ["admin", "faculty", "student"],
    },
    {
      name: "Assignments",
      href: "/dashboard/assignments",
      icon: FileText,
      roles: ["admin", "faculty", "student"],
    },
    {
      name: "Learners",
      href: "/dashboard/manage/learners",
      icon: Users,
      roles: ["admin", "faculty"],
    },
    {
      name: "Faculties",
      href: "/dashboard/manage/faculties",
      icon: UserPlus,
      roles: ["admin"],
    },
    {
      name: "Batches",
      href: "/dashboard/manage/batches",
      icon: Layers,
      roles: ["admin"],
    },
    {
      name: "Users",
      href: "/dashboard/manage/users",
      icon: User,
      roles: ["admin"],
    },
    {
      name: "Subjects",
      href: "/dashboard/manage/subjects",
      icon: BookText,
      roles: ["admin"],
    },
  ]

  const filteredNavigation = navigation.filter((item) => item.roles.includes(userRole))

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const roleLabels = {
    admin: "Administrator",
    faculty: "Faculty",
    student: "Student",
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-red-600"
      case "faculty":
        return "bg-green-600"
      case "student":
        return "bg-blue-600"
      default:
        return "bg-blue-600"
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-white/90 backdrop-blur-sm border-white/20 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white/10 backdrop-blur-xl border-r border-white/20 transition-transform duration-300 ease-in-out shadow-2xl",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">LMS Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 hover:bg-white/20"
              onClick={toggleMobileMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center px-4 py-4 border-b border-white/20 bg-white/5">
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className={`${getRoleColor(userRole)} text-white font-semibold`}>JD</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-semibold text-slate-800">John Doe</p>
              <p className="text-xs text-slate-600">{roleLabels[userRole]}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-slate-700 hover:bg-white/20 hover:text-slate-900 hover:scale-105",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-transform duration-200",
                      isActive ? "text-white" : "text-slate-600 group-hover:text-slate-800",
                    )}
                  />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20 bg-white/5">
            <Button
              variant="outline"
              className="w-full bg-white/10 border-white/20 text-slate-700 hover:bg-white/20 hover:text-slate-900 backdrop-blur-sm"
              asChild
            >
              <Link href="/">Sign Out</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm md:hidden" onClick={toggleMobileMenu} />
      )}
    </>
  )
}
