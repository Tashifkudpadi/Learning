import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Users, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Sample courses data
  const courses = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      instructor: "Dr. Jane Smith",
      progress: 75,
      enrolled: 120,
      duration: "8 weeks",
      startDate: "Sep 1, 2023",
      status: "In Progress",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and patterns",
      instructor: "Prof. John Doe",
      progress: 45,
      enrolled: 85,
      duration: "6 weeks",
      startDate: "Oct 15, 2023",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Database Design Fundamentals",
      description: "Learn relational database design principles",
      instructor: "Dr. Robert Johnson",
      progress: 100,
      enrolled: 150,
      duration: "10 weeks",
      startDate: "Aug 5, 2023",
      status: "Completed",
    },
    {
      id: "4",
      title: "Mobile App Development with Flutter",
      description: "Build cross-platform mobile applications",
      instructor: "Sarah Williams",
      progress: 0,
      enrolled: 95,
      duration: "12 weeks",
      startDate: "Nov 10, 2023",
      status: "Not Started",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-blue-700 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Dashboard Overview
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Courses Dashboard</h1>
          <p className="text-slate-600 text-lg">Manage and track your course progress</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Enroll in New Course
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-1 shadow-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              All Courses
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="not-started"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Not Started
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "In Progress")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "Completed")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="not-started" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "Not Started")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg text-slate-900 line-clamp-2 font-bold">{course.title}</CardTitle>
          <Badge className={`${getStatusColor(course.status)} font-medium shadow-sm`}>{course.status}</Badge>
        </div>
        <CardDescription className="text-slate-700 font-medium">{course.description}</CardDescription>
        <CardDescription className="text-blue-600 font-semibold">by {course.instructor}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-700 font-medium">Progress</span>
              <span className="font-bold text-slate-900">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-3 bg-white/50 rounded-full overflow-hidden" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{course.startDate}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Users className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{course.enrolled} students enrolled</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full bg-white/50 border-white/40 text-slate-800 hover:bg-white/70 hover:text-slate-900 font-semibold backdrop-blur-sm"
              asChild
            >
              <Link href={`/dashboard/courses/${course.id}`}>View Course</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
