import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function AddStudentDialog({ onAddStudent }: { onAddStudent: (student: any) => void }) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { toast } = useToast();

  const handleAddStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newStudent = {
      id: `STU${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      name: formData.get('name'),
      rollNo: formData.get('rollNo'),
      department: formData.get('department'),
      year: formData.get('year'),
      section: formData.get('section'),
      email: formData.get('email'),
      violations: 0,
      photo: selectedImage || "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
    };
    
    onAddStudent(newStudent);
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full"
                />
              )}
            </div>
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
  );
}