import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Plus, Download } from "lucide-react"

export default function BatchesPage() {
  // Sample batches data
  const batches = [
    {
      id: "1",
      name: "Web Development 2023",
      startDate: "Sep 1, 2023",
      endDate: "Dec 15, 2023",
      students: 25,
      courses: 3,
      status: "Active",
    },
    {
      id: "2",
      name: "Mobile App Development",
      startDate: "Oct 10, 2023",
      endDate: "Feb 28, 2024",
      students: 20,
      courses: 2,
      status: "Active",
    },
    {
      id: "3",
      name: "Data Science Fundamentals",
      startDate: "Aug 15, 2023",
      endDate: "Nov 30, 2023",
      students: 30,
      courses: 4,
      status: "Active",
    },
    {
      id: "4",
      name: "UI/UX Design 2023",
      startDate: "Jul 5, 2023",
      endDate: "Oct 20, 2023",
      students: 15,
      courses: 2,
      status: "Completed",
    },
    {
      id: "5",
      name: "Cloud Computing",
      startDate: "Nov 1, 2023",
      endDate: "Mar 15, 2024",
      students: 22,
      courses: 3,
      status: "Upcoming",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Batches</h1>
          <p className="text-muted-foreground">Manage student batches and cohorts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Batch
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search batches..." className="w-full pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Courses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.name}</TableCell>
                <TableCell>{batch.startDate}</TableCell>
                <TableCell>{batch.endDate}</TableCell>
                <TableCell>{batch.students}</TableCell>
                <TableCell>{batch.courses}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      batch.status === "Active" ? "default" : batch.status === "Completed" ? "secondary" : "outline"
                    }
                  >
                    {batch.status}
                  </Badge>
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
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Batch</DropdownMenuItem>
                      <DropdownMenuItem>Manage Students</DropdownMenuItem>
                      <DropdownMenuItem>Assign Courses</DropdownMenuItem>
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
