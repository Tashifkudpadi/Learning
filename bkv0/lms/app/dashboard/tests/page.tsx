import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, FileText, Users, TrendingUp, Plus } from "lucide-react"

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
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-blue-700 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Assessment Center
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Tests & Assessments</h1>
          <p className="text-slate-600 text-lg">View and take your course tests and assessments</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          View All Results
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-1 shadow-lg">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              All Tests
            </TabsTrigger>
            <TabsTrigger
              value="available"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Available
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Upcoming
            </TabsTrigger>
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
      </div>
    </div>
  )
}

function TestCard({ test }: { test: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg text-slate-900 line-clamp-2 font-bold">{test.title}</CardTitle>
          <Badge className={`${getStatusColor(test.status)} font-medium shadow-sm`}>{test.status}</Badge>
        </div>
        <CardDescription className="text-sm text-blue-600 font-semibold">{test.course}</CardDescription>
        <CardDescription className="text-slate-700">{test.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{test.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{test.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">{test.questions} questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">
                {test.attempts}/{test.maxAttempts} attempts
              </span>
            </div>
          </div>

          {test.score && (
            <div className="flex justify-between items-center pt-2 border-t border-white/30">
              <span className="text-sm font-medium text-slate-700">Score:</span>
              <span className="text-lg font-bold text-green-600">{test.score}</span>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            {test.status === "Completed" ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-white/40 text-slate-700 hover:bg-white/70 backdrop-blur-sm"
                >
                  View Results
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-white/40 text-blue-700 hover:bg-white/70 backdrop-blur-sm"
                >
                  Review Test
                </Button>
              </>
            ) : test.status === "Available" ? (
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
              >
                Start Test
              </Button>
            ) : test.status === "Overdue" ? (
              <Button size="sm" variant="destructive">
                Overdue
              </Button>
            ) : (
              <Button disabled size="sm" className="bg-slate-300">
                Not Available Yet
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
