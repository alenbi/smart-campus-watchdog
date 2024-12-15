import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Pencil, History, Trash2, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Demo data
const demoStudents = [
  {
    id: "STU001",
    name: "John Smith",
    rollNo: "CS21001",
    department: "Computer Science",
    year: "3rd Year",
    section: "A",
    violations: 2,
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    email: "john.smith@example.com"
  },
  {
    id: "STU002",
    name: "Emma Wilson",
    rollNo: "CS21002",
    department: "Computer Science",
    year: "3rd Year",
    section: "B",
    violations: 0,
    photo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    email: "emma.wilson@example.com"
  },
  {
    id: "STU003",
    name: "Michael Brown",
    rollNo: "CS21003",
    department: "Computer Science",
    year: "3rd Year",
    section: "A",
    violations: 1,
    photo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    email: "michael.brown@example.com"
  },
];

const demoMailLogs = [
  {
    id: 1,
    studentId: "STU001",
    date: "2024-02-20",
    subject: "Uniform Violation Notice",
    type: "ID Card Missing",
    status: "Sent"
  },
  {
    id: 2,
    studentId: "STU001",
    date: "2024-02-19",
    subject: "Dress Code Violation",
    type: "Untucked Shirt",
    status: "Sent"
  },
  {
    id: 3,
    studentId: "STU003",
    date: "2024-02-18",
    subject: "Uniform Violation Notice",
    type: "ID Card Missing",
    status: "Sent"
  }
];

const Students = () => {
  const [students, setStudents] = useState(demoStudents);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showMailLogs, setShowMailLogs] = useState(false);
  const { toast } = useToast();

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent = {
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
      name: formData.get('name') as string,
      rollNo: formData.get('rollNo') as string,
      department: formData.get('department') as string,
      year: formData.get('year') as string,
      section: formData.get('section') as string,
      violations: 0,
      photo: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      email: formData.get('email') as string
    };
    setStudents([...students, newStudent]);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const getStudentMailLogs = (studentId: string) => {
    return demoMailLogs.filter(log => log.studentId === studentId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input id="rollNo" name="rollNo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input id="year" name="year" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" name="section" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
              </div>
              <Button type="submit" className="w-full">Add Student</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Total Students</h3>
          <p className="text-3xl font-bold">{students.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Active Violations</h3>
          <p className="text-3xl font-bold">{students.reduce((acc, student) => acc + student.violations, 0)}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold text-lg mb-2">Compliance Rate</h3>
          <p className="text-3xl font-bold">
            {Math.round((students.filter(s => s.violations === 0).length / students.length) * 100)}%
          </p>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Violations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={student.photo} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.violations}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>Student Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col items-center gap-4">
                            <Avatar className="w-32 h-32">
                              <AvatarImage src={student.photo} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                              <h3 className="font-semibold text-lg">{student.name}</h3>
                              <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Roll Number</Label>
                              <Input defaultValue={student.rollNo} />
                            </div>
                            <div>
                              <Label>Department</Label>
                              <Input defaultValue={student.department} />
                            </div>
                            <div>
                              <Label>Year</Label>
                              <Input defaultValue={student.year} />
                            </div>
                            <div>
                              <Label>Section</Label>
                              <Input defaultValue={student.section} />
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mail Logs - {student.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {getStudentMailLogs(student.id).map((log) => (
                            <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{log.subject}</p>
                                <p className="text-sm text-gray-500">{log.date}</p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                {log.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Students;