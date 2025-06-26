import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Download } from "lucide-react"

export default function SubjectsPage() {
  // Sample subjects data
  const subjects = [
    {
      id: "1",
      name: "Web Development",
      code: "WD101",
      department: "Computer Science",
      courses: 3,
      faculty: 2,
      status: "Active",
    },
    {
      id: "2",
      name: "Database Systems",
      code: "DB201",
      department: "Information Technology",
      courses: 2,
      faculty: 1,
      status: "Active",
    },
    {
      id: "3",
      name: "Mobile App Development",
      code: "MAD301",
      department: "Computer Science",
      courses: 2,
      faculty: 1,
      status: "Active",
    },
    {
      id: "4",
      name: "UI/UX Design",
      code: "UID202",
      department: "Design",
      courses: 1,
      faculty: 1,
      status: "Inactive",
    },
    {
      id: "5",
      name: "Artificial Intelligence",
      code: "AI401",
      department: "Computer Science",
      courses: 2,
      faculty: 2,
      status: "Active",
    },
    {
      id: "6",
      name: "Cloud Computing",
      code: "CC301",
      department: "Information Technology",
      courses: 1,
      faculty: 1,
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">
            Manage subjects and course categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subjects..."
            className="w-full pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Faculty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.department}</TableCell>
                <TableCell>{subject.courses}</TableCell>
                <TableCell>{subject.faculty}</TableCell>
                <TableCell>
                  <Badge
                    variant={subject.status === "Active" ? "default" : "secondary"}
                  >
                    {subject.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="\
