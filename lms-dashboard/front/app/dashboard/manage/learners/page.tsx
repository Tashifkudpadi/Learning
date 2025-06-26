import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus, Download } from "lucide-react"

export default function LearnersPage() {
  // Sample learners data
  const learners = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      courses: 3,
      enrollmentDate: "Aug 15, 2023",
      status: "Active",
      progress: 75,
    },
    {
      id: "2",
      name: "Samantha Lee",
      email: "samantha.lee@example.com",
      courses: 2,
      enrollmentDate: "Sep 5, 2023",
      status: "Active",
      progress: 45,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      courses: 4,
      enrollmentDate: "Jul 22, 2023",
      status: "Inactive",
      progress: 10,
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      courses: 1,
      enrollmentDate: "Oct 1, 2023",
      status: "Active",
      progress: 30,
    },
    {
      id: "5",
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      courses: 2,
      enrollmentDate: "Sep 12, 2023",
      status: "Active",
      progress: 60,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learners</h1>
          <p className="text-muted-foreground">Manage and track student progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Learner
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search learners..." className="w-full pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {learners.map((learner) => (
              <TableRow key={learner.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?${learner.id}`} alt={learner.name} />
                      <AvatarFallback>{learner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{learner.name}</span>
                  </div>
                </TableCell>
                <TableCell>{learner.email}</TableCell>
                <TableCell>{learner.courses}</TableCell>
                <TableCell>{learner.enrollmentDate}</TableCell>
                <TableCell>
                  <Badge variant={learner.status === "Active" ? "default" : "secondary"}>{learner.status}</Badge>
                </TableCell>
                <TableCell>{learner.progress}%</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
