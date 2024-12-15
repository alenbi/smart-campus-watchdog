import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const demoViolations = [
  {
    id: 1,
    student: {
      name: "John Smith",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    type: "ID Card Missing",
    date: "2024-03-15",
    status: "Pending",
    description: "Student was found without ID card during morning inspection"
  },
  {
    id: 2,
    student: {
      name: "Emma Wilson",
      photo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    type: "Untucked Shirt",
    date: "2024-03-14",
    status: "Resolved",
    description: "Uniform violation - untucked shirt during afternoon classes"
  }
];

const Violations = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Uniform Violations</h1>
      
      <div className="grid gap-4">
        {demoViolations.map((violation) => (
          <Card key={violation.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={violation.student.photo} alt={violation.student.name} />
                <AvatarFallback>{violation.student.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{violation.student.name}</h3>
                  <Badge variant={violation.status === "Resolved" ? "success" : "destructive"}>
                    {violation.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-500 mt-1">{violation.type}</p>
                <p className="text-sm mt-2">{violation.description}</p>
                <p className="text-sm text-gray-500 mt-2">Reported on: {violation.date}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Violations;