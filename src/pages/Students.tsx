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
import { PlusCircle, Pencil, History, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  },
  {
    id: "STU002",
    name: "Emma Wilson",
    rollNo: "CS21002",
    department: "Computer Science",
    year: "3rd Year",
    section: "B",
    violations: 0,
  },
  {
    id: "STU003",
    name: "Michael Brown",
    rollNo: "CS21003",
    department: "Computer Science",
    year: "3rd Year",
    section: "A",
    violations: 1,
  },
];

const Students = () => {
  const [students, setStudents] = useState(demoStudents);
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
    };
    setStudents([...students, newStudent]);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
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
          <DialogContent>
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

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.year}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>{student.violations}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <History className="h-4 w-4" />
                    </Button>
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