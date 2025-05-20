import { HomeIcon, MessageSquareIcon, UsersIcon, LayoutDashboardIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateMessage from "./pages/CreateMessage.jsx";
import ManageMentors from "./pages/ManageMentors.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <LayoutDashboardIcon className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Create Message",
    to: "/create-message",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <CreateMessage />,
  },
  {
    title: "Manage Mentors",
    to: "/mentors",
    icon: <UsersIcon className="h-4 w-4" />,
    page: <ManageMentors />,
  },
];
