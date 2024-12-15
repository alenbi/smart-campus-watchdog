import { Camera, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Security = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Security Monitoring</h1>
        <div className="flex gap-4">
          <Button variant="destructive" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Emergency Alert
          </Button>
          <Button className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Start Monitoring
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="success">Active</Badge>
              <span className="text-sm text-muted-foreground">All systems operational</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/4</div>
            <p className="text-xs text-muted-foreground">All cameras online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In the last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Camera Feeds */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Camera Feeds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((camera) => (
            <div
              key={camera}
              className="relative aspect-video bg-black rounded-lg overflow-hidden border border-border"
            >
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  Camera {camera}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 z-10">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Live
                  </div>
                </Badge>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground">Camera Feed {camera}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              time: "2 minutes ago",
              event: "Motion detected in Camera 2",
              type: "info"
            },
            {
              time: "5 minutes ago",
              event: "Unknown person detected in Camera 1",
              type: "warning"
            },
            {
              time: "10 minutes ago",
              event: "Camera 4 detected student without ID",
              type: "alert"
            }
          ].map((activity, index) => (
            <Card key={index}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      activity.type === "warning"
                        ? "destructive"
                        : activity.type === "alert"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {activity.type}
                  </Badge>
                  <div>
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;