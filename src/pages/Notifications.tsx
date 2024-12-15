import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";

const demoNotifications = [
  {
    id: 1,
    title: "New Violation Report",
    message: "A new uniform violation has been reported for John Smith",
    type: "violation",
    time: "5 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Violation Resolved",
    message: "The uniform violation for Emma Wilson has been resolved",
    type: "success",
    time: "1 hour ago",
    read: true
  }
];

const Notifications = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      
      <div className="grid gap-4">
        {demoNotifications.map((notification) => (
          <Card key={notification.id} className={`p-4 ${notification.read ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {notification.type === 'violation' ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : notification.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Bell className="h-5 w-5 text-blue-500" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <Badge variant={notification.read ? "outline" : "default"}>
                    {notification.read ? "Read" : "New"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notifications;