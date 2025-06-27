"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Plus,
  Upload,
  CalendarIcon,
  Clock,
  BookOpen,
  Star,
  DollarSign,
  Globe,
  X,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateCourseFormProps {
  children: React.ReactNode;
}

export default function CreateCourseForm({ children }: CreateCourseFormProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [courseImage, setCourseImage] = useState<string>("");
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [newPrerequisite, setNewPrerequisite] = useState("");
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>([]);
  const [newOutcome, setNewOutcome] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOpen(false);
      // Reset form or show success message
    }, 2000);
  };

  const addPrerequisite = () => {
    if (
      newPrerequisite.trim() &&
      !prerequisites.includes(newPrerequisite.trim())
    ) {
      setPrerequisites([...prerequisites, newPrerequisite.trim()]);
      setNewPrerequisite("");
    }
  };

  const removePrerequisite = (prerequisite: string) => {
    setPrerequisites(prerequisites.filter((p) => p !== prerequisite));
  };

  const addLearningOutcome = () => {
    if (newOutcome.trim() && !learningOutcomes.includes(newOutcome.trim())) {
      setLearningOutcomes([...learningOutcomes, newOutcome.trim()]);
      setNewOutcome("");
    }
  };

  const removeLearningOutcome = (outcome: string) => {
    setLearningOutcomes(learningOutcomes.filter((o) => o !== outcome));
  };

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
            Fill in the details below to create a comprehensive course for your
            students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Course Details
              </CardTitle>
              <CardDescription>
                Essential details about your course
              </CardDescription>
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
                    Subjects *
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
                <Label
                  htmlFor="description"
                  className="text-slate-700 font-medium"
                >
                  Short Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what students will learn..."
                  required
                  className="bg-white/80 border-gray-200 focus:border-gray-500 min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-slate-700 font-medium"
                  >
                    Students *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui-ux">
                        show users whose role is students
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level" className="text-slate-700 font-medium">
                    Faculties *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select faculties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui-ux">
                        show faculties whose role is faculty
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="language"
                    className="text-slate-700 font-medium"
                  >
                    Category *
                  </Label>
                  <Select required>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-gray-500">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upsc">UPSC</SelectItem>
                      <SelectItem value="tnpc">TNPC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                Course visibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-slate-700 font-medium">
                        Public Course
                      </Label>
                      <p className="text-sm text-slate-600">
                        Make this course visible to all users
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Course Image
                    </Label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-white/30">
                      <ImageIcon className="mx-auto h-12 w-12 text-slate-400" />
                      <div className="mt-2">
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Image
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
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
  );
}
