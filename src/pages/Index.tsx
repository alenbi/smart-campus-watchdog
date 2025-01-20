import { Camera, AlertTriangle, UserCheck, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [backendStatus, setBackendStatus] = useState<string>("");

  useEffect(() => {
    // Test backend connection
    const testBackend = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/test");
        const data = await response.json();
        setBackendStatus(data.message);
        toast({
          title: "Backend Connection",
          description: "Successfully connected to Python backend!",
        });
      } catch (error) {
        console.error("Backend connection error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to backend. Make sure it's running!",
          variant: "destructive",
        });
      }
    };

    testBackend();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
            Start Monitoring
          </button>
        </div>
      </div>

      {backendStatus && (
        <Card className="p-4 bg-green-50">
          <p className="text-green-600">Backend Status: {backendStatus}</p>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="stat-card">
          <Camera className="h-8 w-8 text-primary mb-2" />
          <span className="text-2xl font-bold">4</span>
          <span className="text-sm text-gray-500">Active Cameras</span>
        </Card>
        <Card className="stat-card">
          <AlertTriangle className="h-8 w-8 text-yellow-500 mb-2" />
          <span className="text-2xl font-bold">12</span>
          <span className="text-sm text-gray-500">Violations Today</span>
        </Card>
        <Card className="stat-card">
          <UserCheck className="h-8 w-8 text-green-500 mb-2" />
          <span className="text-2xl font-bold">89%</span>
          <span className="text-sm text-gray-500">Compliance Rate</span>
        </Card>
        <Card className="stat-card">
          <Bell className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-2xl font-bold">5</span>
          <span className="text-sm text-gray-500">New Alerts</span>
        </Card>
      </div>

      {/* Live Feeds */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="video-feed">
            <div className="absolute top-3 left-3">
              <span className="status-badge success">Camera 1 - Main Entrance</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="status-badge">Live</span>
            </div>
          </div>
          <div className="video-feed">
            <div className="absolute top-3 left-3">
              <span className="status-badge success">Camera 2 - Hallway</span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="status-badge">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Violations */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Violations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="violation-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold">ID Card Missing</h3>
                  <p className="text-sm text-gray-500">Student #{i}</p>
                </div>
                <span className="status-badge warning">Pending</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Detected at Main Entrance - {new Date().toLocaleTimeString()}
              </p>
              <div className="flex justify-between items-center">
                <button className="text-primary text-sm hover:underline">
                  View Details
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Dismiss
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;