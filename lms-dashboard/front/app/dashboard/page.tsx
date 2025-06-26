import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Users, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import CreateCourseForm from "@/components/create-course-form"
import Image from "next/image"

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
      thumbnail: "/placeholder.svg?height=200&width=300",
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
      thumbnail: "/placeholder.svg?height=200&width=300",
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
      thumbnail: "/placeholder.svg?height=200&width=300",
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
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative">
      {/* Dots Background Pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              <TrendingUp className="w-4 h-4" />
              Dashboard Overview
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Courses Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage and track your course progress</p>
          </div>
          <CreateCourseForm>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </CreateCourseForm>
        </div>

        {/* Tabs */}
        <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  All Courses
                </TabsTrigger>
                <TabsTrigger
                  value="in-progress"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="not-started"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CourseCard({ course }: { course: any }) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "In Progress":
        return "default"
      case "Completed":
        return "secondary"
      case "Not Started":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={getStatusVariant(course.status)}>{course.status}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
        <CardDescription className="text-primary font-medium">by {course.instructor}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{course.startDate}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{course.enrolled} students enrolled</span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/dashboard/courses/${course.id}`}>View Course</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
