import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus, Download } from "lucide-react"

export default function FacultiesPage() {
  // Sample faculty data
  const faculties = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      email: "jane.smith@example.com",
      department: "Computer Science",
      courses: 3,
      joinDate: "Jan 15, 2022",
      status: "Active",
    },
    {
      id: "2",
      name: "Prof. John Doe",
      email: "john.doe@example.com",
      department: "Web Development",
      courses: 2,
      joinDate: "Mar 10, 2022",
      status: "Active",
    },
    {
      id: "3",
      name: "Dr. Robert Johnson",
      email: "robert.johnson@example.com",
      department: "Database Systems",
      courses: 2,
      joinDate: "Feb 5, 2021",
      status: "On Leave",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      department: "Mobile Development",
      courses: 1,
      joinDate: "Aug 20, 2022",
      status: "Active",
    },
    {
      id: "5",
      name: "Dr. Michael Brown",
      email: "michael.brown@example.com",
      department: "Artificial Intelligence",
      courses: 2,
      joinDate: "May 15, 2022",
      status: "Active",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty</h1>
          <p className="text-muted-foreground">Manage faculty members and instructors</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search faculty..." className="w-full pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculties.map((faculty) => (
              <TableRow key={faculty.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?${faculty.id}`} alt={faculty.name} />
                      <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{faculty.name}</span>
                  </div>
                </TableCell>
                <TableCell>{faculty.email}</TableCell>
                <TableCell>{faculty.department}</TableCell>
                <TableCell>{faculty.courses}</TableCell>
                <TableCell>{faculty.joinDate}</TableCell>
                <TableCell>
                  <Badge variant={faculty.status === "Active" ? "default" : "secondary"}>{faculty.status}</Badge>
                </TableCell>
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
                      <DropdownMenuItem>Assign Courses</DropdownMenuItem>
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
