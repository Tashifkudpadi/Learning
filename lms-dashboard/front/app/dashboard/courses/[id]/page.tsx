import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Calendar,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  FileText,
  Download,
  MessageSquare,
  BookOpen,
  Award,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ViewCoursePage({ params }: { params: { id: string } }) {
  // Sample course data - in real app, fetch based on params.id
  const course = {
    id: params.id,
    title: "Introduction to Web Development",
    description:
      "Master the fundamentals of web development with HTML, CSS, and JavaScript. Build responsive websites and learn modern development practices.",
    instructor: {
      name: "Dr. Jane Smith",
      title: "Senior Web Developer & Educator",
      avatar: "/placeholder.svg",
      rating: 4.9,
      students: 15420,
    },
    students: 120,
    startDate: "Sep 1, 2023",
    totalContents: 24,
    totalAssignments: 4,
    totalTests: 4,
  };

  const lessons = [
    {
      id: 1,
      title: "Introduction to HTML",
      duration: "15 min",
      type: "video",
      completed: true,
      locked: false,
    },
    {
      id: 2,
      title: "HTML Structure and Elements",
      duration: "22 min",
      type: "video",
      completed: true,
      locked: false,
    },
    {
      id: 3,
      title: "HTML Forms and Input Types",
      duration: "18 min",
      type: "video",
      completed: true,
      locked: false,
    },
    {
      id: 4,
      title: "HTML Quiz",
      duration: "10 min",
      type: "quiz",
      completed: true,
      locked: false,
    },
    {
      id: 5,
      title: "Introduction to CSS",
      duration: "20 min",
      type: "video",
      completed: true,
      locked: false,
    },
    {
      id: 6,
      title: "CSS Selectors and Properties",
      duration: "25 min",
      type: "video",
      completed: true,
      locked: false,
    },
    {
      id: 7,
      title: "CSS Flexbox Layout",
      duration: "30 min",
      type: "video",
      completed: false,
      locked: false,
    },
    {
      id: 8,
      title: "CSS Grid System",
      duration: "28 min",
      type: "video",
      completed: false,
      locked: false,
    },
    {
      id: 9,
      title: "Responsive Design Principles",
      duration: "35 min",
      type: "video",
      completed: false,
      locked: true,
    },
    {
      id: 10,
      title: "CSS Assignment",
      duration: "45 min",
      type: "assignment",
      completed: false,
      locked: true,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: "New Assignment Posted",
      message:
        "CSS Flexbox assignment is now available. Due date: October 25th.",
      date: "Oct 15, 2023",
      type: "assignment",
    },
    {
      id: 2,
      title: "Live Q&A Session",
      message: "Join us for a live Q&A session this Friday at 3 PM EST.",
      date: "Oct 12, 2023",
      type: "announcement",
    },
    {
      id: 3,
      title: "Course Materials Updated",
      message: "New resources and examples have been added to Module 3.",
      date: "Oct 10, 2023",
      type: "update",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "quiz":
        return <FileText className="h-4 w-4" />;
      case "assignment":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-600";
      case "quiz":
        return "text-green-600";
      case "assignment":
        return "text-purple-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative">
      {/* Dots Background Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)`,
          backgroundSize: "35px 35px",
          backgroundPosition: "0 0, 17.5px 17.5px",
        }}
      ></div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="bg-white/70 backdrop-blur-sm border-blue-200 text-blue-800 hover:bg-blue-50"
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Courses
            </Link>
          </Button>
        </div>

        {/* Course Header */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-8 text-white">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2"></div>
                <h1 className="text-4xl font-bold text-white">
                  {course.title}
                </h1>
                <p className="text-lg text-blue-100">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">
                    {course.totalContents}
                  </div>
                  <div className="text-sm text-blue-100">Contents</div>
                </div>

                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">
                    {course.students}
                  </div>
                  <div className="text-sm text-blue-100">Students</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">
                    {course.totalTests}
                  </div>
                  <div className="text-sm text-blue-100">Tests</div>
                </div>
                <div className="text-center p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">
                    {course.totalAssignments}
                  </div>
                  <div className="text-sm text-blue-100">Assignments</div>
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-xl border border-blue-200 shadow-xl">
                <CardHeader className="text-center">
                  <Avatar className="h-20 w-20 mx-auto ring-4 ring-white/30">
                    <AvatarImage
                      src={course.instructor.avatar || "/placeholder.svg"}
                      alt={course.instructor.name}
                    />
                    <AvatarFallback className="bg-blue-600 text-white text-lg font-bold">
                      {course.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-slate-900">
                    {course.instructor.name}
                  </CardTitle>
                  <CardDescription className="text-slate-700">
                    {course.instructor.title}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Instructor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-200 shadow-2xl p-6">
          <Tabs defaultValue="contents" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm border border-blue-200 rounded-xl p-1 shadow-lg">
              <TabsTrigger
                value="contents"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Contents
              </TabsTrigger>
              <TabsTrigger
                value="learners"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Learners
              </TabsTrigger>
              <TabsTrigger
                value="batches"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Batches
              </TabsTrigger>
              <TabsTrigger
                value="tests"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Tests
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Assignments
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* contents Tab */}
            <TabsContent value="contents" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    Course Content
                  </h3>
                </div>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <Card
                      key={lesson.id}
                      className={`bg-white/30 backdrop-blur-sm border border-white/30 hover:bg-white/40 transition-all duration-200 ${
                        lesson.locked ? "opacity-60" : "hover:scale-[1.02]"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg bg-white/50 ${getTypeColor(
                                lesson.type
                              )} ${lesson.completed ? "bg-green-100" : ""}`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : lesson.locked ? (
                                <Lock className="h-4 w-4 text-slate-400" />
                              ) : (
                                getTypeIcon(lesson.type)
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            disabled={lesson.locked}
                            className={
                              lesson.completed
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            }
                          >
                            {lesson.completed
                              ? "Review"
                              : lesson.locked
                              ? "Locked"
                              : "Start"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* learners Tab */}
            <TabsContent value="learners" className="mt-6">
              <div className="space-y-6">
                <h2>We have to show all learners here</h2>
              </div>
            </TabsContent>

            {/* batches Tab */}
            <TabsContent value="batches" className="mt-6">
              <div className="space-y-6">
                <h2>We have to show all batches here</h2>
              </div>
            </TabsContent>

            {/* tests Tab */}
            <TabsContent value="tests" className="mt-6">
              <div className="space-y-4">
                <div className="space-y-6">
                  <h2>
                    We have to show all tests here with more tabs (its
                    categories)
                  </h2>
                </div>
              </div>
            </TabsContent>

            {/* assignments Tab */}
            <TabsContent value="assignments" className="mt-6">
              <div className="space-y-4">
                <div className="space-y-6">
                  <h2>
                    We have to show all assignments here with more tabs (its
                    categories)
                  </h2>
                </div>
              </div>
            </TabsContent>

            {/* settings Tab */}
            <TabsContent value="settings" className="mt-6">
              <div className="space-y-4">
                <div className="space-y-6">
                  <h2>We have to show all setting here</h2>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
