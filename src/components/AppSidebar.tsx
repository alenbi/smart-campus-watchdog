import { Camera, Users, Bell, Shield, Settings, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarNav,
  SidebarNavLink,
  SidebarNavLinks,
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
        <SidebarNav>
          {navigation.map((item) => (
            <SidebarNavLink
              key={item.title}
              as={Link}
              to={item.url}
              className={location.pathname === item.url ? "active" : ""}
            >
              <item.icon className="mr-2" />
              {item.title}
            </SidebarNavLink>
          ))}
        </SidebarNav>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
