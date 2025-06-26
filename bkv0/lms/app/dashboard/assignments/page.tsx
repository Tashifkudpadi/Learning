import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Upload, CheckCircle, TrendingUp, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AssignmentsPage() {
  // Sample assignments data
  const assignments = [
    {
      id: "1",
      title: "Build a Responsive Website",
      course: "Introduction to Web Development",
      description: "Create a responsive website using HTML, CSS, and JavaScript with modern design principles",
      dueDate: "Oct 20, 2023",
      submittedDate: null,
      status: "In Progress",
      progress: 60,
      attachments: 2,
      maxScore: 100,
      difficulty: "Medium",
    },
    {
      id: "2",
      title: "React State Management Project",
      course: "Advanced React Patterns",
      description: "Implement a complex state management solution using React hooks and context API",
      dueDate: "Oct 25, 2023",
      submittedDate: null,
      status: "Not Started",
      progress: 0,
      attachments: 1,
      maxScore: 100,
      difficulty: "Hard",
    },
    {
      id: "3",
      title: "Database Schema Design",
      course: "Database Design Fundamentals",
      description: "Design a normalized database schema for an e-commerce platform with proper relationships",
      dueDate: "Oct 12, 2023",
      submittedDate: "Oct 10, 2023",
      status: "Submitted",
      progress: 100,
      attachments: 3,
      grade: "A",
      score: 95,
      maxScore: 100,
      feedback: "Excellent work on normalization and indexing strategy. Great attention to detail.",
      difficulty: "Medium",
    },
    {
      id: "4",
      title: "Mobile App UI Design",
      course: "Mobile App Development with Flutter",
      description: "Create a comprehensive UI design for a mobile application with user-friendly interface",
      dueDate: "Nov 15, 2023",
      submittedDate: null,
      status: "Not Started",
      progress: 0,
      attachments: 1,
      maxScore: 100,
      difficulty: "Easy",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-blue-700 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Assignment Hub
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Assignments</h1>
          <p className="text-slate-600 text-lg">View and submit your course assignments</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          View All Submissions
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
              All Assignments
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="submitted"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg rounded-lg font-medium transition-all duration-200"
            >
              Submitted
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
              {assignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments
                .filter((assignment) => assignment.status === "In Progress")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments
                .filter((assignment) => assignment.status === "Submitted")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="not-started" className="space-y-4 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {assignments
                .filter((assignment) => assignment.status === "Not Started")
                .map((assignment) => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AssignmentCard({ assignment }: { assignment: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Not Started":
        return "bg-slate-100 text-slate-800 border-slate-200"
      case "Submitted":
        return "bg-green-100 text-green-800 border-green-200"
      case "Overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-700 border-green-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Hard":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-50 text-slate-700 border-slate-200"
    }
  }

  return (
    <Card className="bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg text-slate-900 line-clamp-2 font-bold">{assignment.title}</CardTitle>
          <div className="flex flex-col gap-1">
            <Badge className={`${getStatusColor(assignment.status)} font-medium text-xs shadow-sm`}>
              {assignment.status}
            </Badge>
            <Badge variant="outline" className={`${getDifficultyColor(assignment.difficulty)} text-xs`}>
              {assignment.difficulty}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm text-blue-600 font-semibold">{assignment.course}</CardDescription>
        <CardDescription className="text-slate-700 line-clamp-2">{assignment.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-600" />
              <span className="text-slate-700 font-medium">
                {assignment.attachments} {assignment.attachments === 1 ? "file" : "files"}
              </span>
            </div>
            {assignment.submittedDate && (
              <div className="flex items-center gap-2 col-span-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-slate-700 font-medium">Submitted: {assignment.submittedDate}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-700 font-medium">Progress</span>
              <span className="font-bold text-slate-900">{assignment.progress}%</span>
            </div>
            <Progress value={assignment.progress} className="h-3 bg-white/50 rounded-full overflow-hidden" />
          </div>

          {assignment.grade && (
            <div className="flex justify-between items-center pt-2 border-t border-white/30">
              <div className="text-sm">
                <span className="font-medium text-slate-700">Grade:</span>
                <span className="ml-2 text-lg font-bold text-green-600">{assignment.grade}</span>
              </div>
              <div className="text-sm text-slate-600">
                {assignment.score}/{assignment.maxScore}
              </div>
            </div>
          )}

          {assignment.feedback && (
            <div className="pt-2 border-t border-white/30">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-white/20 p-0 h-auto font-medium"
              >
                View Feedback
              </Button>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2">
            {assignment.status === "Submitted" ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/50 border-white/40 text-slate-700 hover:bg-white/70 backdrop-blur-sm"
              >
                View Submission
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/50 border-white/40 text-slate-700 hover:bg-white/70 backdrop-blur-sm"
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {assignment.status === "In Progress" ? "Continue" : "Start"}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
