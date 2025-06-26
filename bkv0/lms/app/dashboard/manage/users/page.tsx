import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search, UserPlus, Download } from "lucide-react"

export default function UsersPage() {
  // Sample users data
  const users = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Student",
      lastActive: "Today, 2:30 PM",
      status: "Active",
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      email: "jane.smith@example.com",
      role: "Faculty",
      lastActive: "Today, 10:15 AM",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Student",
      lastActive: "Yesterday",
      status: "Inactive",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Faculty",
      lastActive: "Today, 9:45 AM",
      status: "Active",
    },
    {
      id: "5",
      name: "Robert Taylor",
      email: "robert.taylor@example.com",
      role: "Admin",
      lastActive: "Today, 3:20 PM",
      status: "Active",
    },
    {
      id: "6",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      role: "Student",
      lastActive: "3 days ago",
      status: "Suspended",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage all users in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="w-full pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?${user.id}`} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Active" ? "default" : user.status === "Inactive" ? "secondary" : "destructive"
                    }
                  >
                    {user.status}
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
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>Change Role</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      {user.status !== "Suspended" ? (
                        <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Reactivate User</DropdownMenuItem>
                      )}
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
