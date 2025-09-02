import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Palette, 
  BookOpen, 
  LogOut,
  Menu,
  X,
  MessageSquare,
  Crown,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Customization",
    href: "/customization",
    icon: Palette,
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: MessageSquare,
  },
  {
    name: "Plans",
    href: "/plans",
    icon: Crown,
  },
  {
    name: "User Management",
    href: "/user-management",
    icon: Users,
  },
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
  },
];

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // In a real app, this would clear tokens/session
    navigate("/login");
  };

  return (
    <div className={cn(
      "flex flex-col bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/b0b24832-4ec5-4ba0-9d25-e913c03505ac.png" 
                alt="Customer Portal Logo" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="font-semibold text-foreground">Customer Portal</span>
            </div>
          )}
          {isCollapsed && (
            <img 
              src="/lovable-uploads/b0b24832-4ec5-4ba0-9d25-e913c03505ac.png" 
              alt="Customer Portal Logo" 
              className="w-8 h-8 rounded-lg"
            />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    isCollapsed && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Sign out</span>}
        </Button>
      </div>
    </div>
  );
};