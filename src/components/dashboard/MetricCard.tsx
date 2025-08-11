import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: LucideIcon;
  description: string;
}

export const MetricCard = ({ title, value, change, trend, icon: Icon, description }: MetricCardProps) => {
  const isPositive = (trend === "up" && !change.startsWith("-")) || (trend === "down" && change.startsWith("-"));
  
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {value}
            </div>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>
          
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
      </CardContent>
    </Card>
  );
};