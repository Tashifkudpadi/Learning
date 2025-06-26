"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from "lucide-react"

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
          <TabsTrigger
            value="signin"
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg text-white font-medium transition-all duration-200"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg text-white font-medium transition-all duration-200"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="mt-6">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Welcome Back</CardTitle>
              <CardDescription className="text-slate-600">Sign in to continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="signin-email"
                      placeholder="Enter your email"
                      required
                      type="email"
                      className="pl-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-role" className="text-slate-700 font-medium">
                    Role
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password" className="text-slate-700 font-medium">
                      Password
                    </Label>
                    <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="signin-password"
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signup" className="mt-6">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Create Account</CardTitle>
              <CardDescription className="text-slate-600">Join our learning community today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-slate-700 font-medium">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      required
                      className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-slate-700 font-medium">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      required
                      className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="signup-email"
                      placeholder="Enter your email"
                      required
                      type="email"
                      className="pl-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-700 font-medium">
                    Role
                  </Label>
                  <Select required>
                    <SelectTrigger className="h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-slate-700 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="signup-password"
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-700 font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="confirm-password"
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10 h-11 border-slate-200 focus:border-green-500 focus:ring-green-500 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
