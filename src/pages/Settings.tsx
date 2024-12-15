import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Shield, Mail } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </h2>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="violation-alerts">Violation Alerts</Label>
              <Switch id="violation-alerts" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Templates
          </h2>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label>Violation Notice Template</Label>
              <Input defaultValue="Dear [Parent Name], This is to inform you about a uniform violation..." />
            </div>
            
            <div className="space-y-2">
              <Label>Warning Template</Label>
              <Input defaultValue="Dear [Parent Name], This is a warning regarding repeated uniform violations..." />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </h2>
          
          <div className="mt-4 space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="outline" className="ml-2">Enable Two-Factor Auth</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;