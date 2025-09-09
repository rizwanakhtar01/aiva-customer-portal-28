import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  description: string;
}

export const KpiCard = ({ title, value, change, trend, icon: Icon, description }: KpiCardProps) => {
  const isPositive = (trend === "up" && !change.startsWith("-")) || (trend === "down" && change.startsWith("-"));
  
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group border-2">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-foreground">
            {value}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
            
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-medium",
                isPositive 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
              )}
            >
              {change}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};