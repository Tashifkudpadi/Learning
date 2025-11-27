import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, FileText, Users, TrendingUp, Plus } from "lucide-react"
import CreateTestForm from "@/components/create-test-form"
import Image from "next/image"

export default function TestsPage() {
  // Sample tests data
  const tests = [
    {
      id: "1",
      title: "HTML & CSS Fundamentals",
      course: "Introduction to Web Development",
      description: "Test your knowledge of HTML and CSS basics",
      duration: "45 minutes",
      questions: 25,
      dueDate: "Oct 15, 2023",
      status: "Completed",
      score: "85%",
      attempts: 1,
      maxAttempts: 2,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "JavaScript Basics",
      course: "Introduction to Web Development",
      description: "Assessment on JavaScript fundamentals",
      duration: "60 minutes",
      questions: 30,
      dueDate: "Oct 22, 2023",
      status: "Upcoming",
      attempts: 0,
      maxAttempts: 2,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "React Hooks",
      course: "Advanced React Patterns",
      description: "Test your understanding of React Hooks",
      duration: "75 minutes",
      questions: 35,
      dueDate: "Oct 18, 2023",
      status: "Available",
      attempts: 0,
      maxAttempts: 3,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Database Normalization",
      course: "Database Design Fundamentals",
      description: "Assessment on database normalization forms",
      duration: "90 minutes",
      questions: 40,
      dueDate: "Oct 10, 2023",
      status: "Completed",
      score: "92%",
      attempts: 1,
      maxAttempts: 2,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative">
      {/* Dots Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #8b5cf6 1px, transparent 1px)`,
          backgroundSize: "25px 25px",
          backgroundPosition: "0 0, 12.5px 12.5px",
        }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              <TrendingUp className="w-4 h-4" />
              Assessment Center
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Tests & Assessments</h1>
            <p className="text-muted-foreground text-lg">View and take your course tests and assessments</p>
          </div>
          <CreateTestForm>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Test
            </Button>
          </CreateTestForm>
        </div>

        {/* Content */}
        <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CardContent className="p-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200">
                <TabsTrigger value="all">All Tests</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tests.map((test) => (
                    <TestCard key={test.id} test={test} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="available" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tests
                    .filter((test) => test.status === "Available")
                    .map((test) => (
                      <TestCard key={test.id} test={test} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tests
                    .filter((test) => test.status === "Completed")
                    .map((test) => (
                      <TestCard key={test.id} test={test} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {tests
                    .filter((test) => test.status === "Upcoming")
                    .map((test) => (
                      <TestCard key={test.id} test={test} />
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

function TestCard({ test }: { test: any }) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Available":
        return "default"
      case "Upcoming":
        return "secondary"
      case "Completed":
        return "outline"
      case "Overdue":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image src={test.thumbnail || "/placeholder.svg"} alt={test.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={getStatusVariant(test.status)}>{test.status}</Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{test.title}</CardTitle>
        <CardDescription className="text-primary font-medium">{test.course}</CardDescription>
        <CardDescription>{test.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{test.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{test.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{test.questions} questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {test.attempts}/{test.maxAttempts} attempts
              </span>
            </div>
          </div>

          {test.score && (
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm text-muted-foreground">Score:</span>
              <span className="text-lg font-bold text-primary">{test.score}</span>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            {test.status === "Completed" ? (
              <>
                <Button variant="outline" size="sm">
                  View Results
                </Button>
                <Button variant="outline" size="sm">
                  Review Test
                </Button>
              </>
            ) : test.status === "Available" ? (
              <Button size="sm">Start Test</Button>
            ) : test.status === "Overdue" ? (
              <Button size="sm" variant="destructive">
                Overdue
              </Button>
            ) : (
              <Button disabled size="sm">
                Not Available Yet
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
