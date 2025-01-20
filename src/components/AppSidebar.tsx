import { Camera, Users, Bell, Shield, Settings, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

const navigation = [
  { title: "Students", icon: Users, url: "/students" },
  { title: "Violations", icon: AlertTriangle, url: "/violations" },
  { title: "Security", icon: Shield, url: "/security" },
  { title: "Notifications", icon: Bell, url: "/notifications" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg font-bold">App Name</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={location.pathname === item.url}
              >
                <Link to={item.url}>
                  <item.icon className="mr-2" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;