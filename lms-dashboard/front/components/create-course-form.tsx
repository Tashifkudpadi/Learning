"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Plus, Upload, CalendarIcon, Clock, BookOpen, Star, DollarSign, Globe, X, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateCourseFormProps {
  children: React.ReactNode
}

export default function CreateCourseForm({ children }: CreateCourseFormProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [courseImage, setCourseImage] = useState<string>("")
  const [prerequisites, setPrerequisites] = useState<string[]>([])
  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([])
  const [newOutcome, setNewOutcome] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
      // Reset form or show success message
    }, 2000)
  }

  const addPrerequisite = () => {
    if (newPrerequisite.trim() && !prerequisites.includes(newPrerequisite.trim())) {
      setPrerequisites([...prerequisites, newPrerequisite.trim()])
      setNewPrerequisite("")
    }
  }

  const removePrerequisite = (prerequisite: string) => {
    setPrerequisites(prerequisites.filter((p) => p !== prerequisite))
  }

  const addLearningOutcome = () => {
    if (newOutcome.trim() && !learningOutcomes.includes(newOutcome.trim())) {
      setLearningOutcomes([...learningOutcomes, newOutcome.trim()])
      setNewOutcome("")
    }
  }

  const removeLearningOutcome = (outcome: string) => {
    setLearningOutcomes(learningOutcomes.filter((o) => o !== outcome))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/30">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
            Create New Course
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Fill in the details below to create a comprehensive course for your students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Basic Information
              </CardTitle>
              <CardDescription>Essential details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-slate-700 font-medium">
                    Course Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Web Development"
                    required
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-slate-700 font-medium">
                    Course Code *
                  </Label>
                  <Input
                    id="code"
                    placeholder="e.g., WD101"
                    required
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-700 font-medium">
                  Short Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what students will learn..."
                  required
                  className="bg-white/80 border-gray-200 focus:border-gray-500 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="detailed-description" className="text-slate-700 font-medium">
                  Detailed Description
                </Label>
                <Textarea
                  id="detailed-description"
                  placeholder="Comprehensive course overview, methodology, and expectations..."
                  className="bg-white/80 border-gray-200 focus:border-gray-500 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-700 font-medium">
                    Category *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="mobile-development">Mobile Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                      <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                      <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                      <SelectItem value="database">Database Systems</SelectItem>
                      <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-slate-700 font-medium">
                    Difficulty Level *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-slate-700 font-medium">
                    Language *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Details */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Course Details
              </CardTitle>
              <CardDescription>Duration, schedule, and capacity information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Start Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/80 border-gray-200",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">End Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/80 border-gray-200",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-slate-700 font-medium">
                    Duration (weeks) *
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    placeholder="e.g., 8"
                    required
                    min="1"
                    max="52"
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-students" className="text-slate-700 font-medium">
                    Max Students
                  </Label>
                  <Input
                    id="max-students"
                    type="number"
                    placeholder="e.g., 50"
                    min="1"
                    max="1000"
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-slate-700 font-medium">
                    Price ($)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="pl-10 bg-white/80 border-gray-200 focus:border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Prerequisites & Learning Outcomes
              </CardTitle>
              <CardDescription>Define requirements and expected outcomes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Prerequisites</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPrerequisite}
                    onChange={(e) => setNewPrerequisite(e.target.value)}
                    placeholder="Add a prerequisite..."
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addPrerequisite())}
                  />
                  <Button type="button" onClick={addPrerequisite} size="sm" variant="outline">
                    Add
                  </Button>
                </div>
                {prerequisites.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {prerequisites.map((prerequisite, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {prerequisite}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removePrerequisite(prerequisite)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/30" />

              <div className="space-y-3">
                <Label className="text-slate-700 font-medium">Learning Outcomes</Label>
                <div className="flex gap-2">
                  <Input
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    placeholder="What will students learn..."
                    className="bg-white/80 border-gray-200 focus:border-gray-500"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLearningOutcome())}
                  />
                  <Button type="button" onClick={addLearningOutcome} size="sm" variant="outline">
                    Add
                  </Button>
                </div>
                {learningOutcomes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {learningOutcomes.map((outcome, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {outcome}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeLearningOutcome(outcome)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                Additional Settings
              </CardTitle>
              <CardDescription>Course visibility and certification options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-700 font-medium">Public Course</Label>
                      <p className="text-sm text-slate-600">Make this course visible to all users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-700 font-medium">Enable Discussions</Label>
                      <p className="text-sm text-slate-600">Allow students to participate in discussions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-700 font-medium">Certificate Available</Label>
                      <p className="text-sm text-slate-600">Issue certificates upon completion</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor" className="text-slate-700 font-medium">
                      Primary Instructor
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jane-smith">Dr. Jane Smith</SelectItem>
                        <SelectItem value="john-doe">Prof. John Doe</SelectItem>
                        <SelectItem value="robert-johnson">Dr. Robert Johnson</SelectItem>
                        <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">Course Image</Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-white/30">
                      <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="mt-2">
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/30">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Course...
                </div>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
