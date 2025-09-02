import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Timer,
  CalendarIcon
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [customDate, setCustomDate] = useState<Date>();

  // Mock function to generate metrics based on date range
  const getMetricsForDateRange = (range: string) => {
    const baseMetrics = {
      "1d": { users: 347, interactions: 1245, responseTime: 0.8, duration: "2m 45s" },
      "7d": { users: 1423, interactions: 7834, responseTime: 1.0, duration: "3m 12s" },
      "30d": { users: 2847, interactions: 18459, responseTime: 1.2, duration: "4m 32s" },
      "90d": { users: 8456, interactions: 52367, responseTime: 1.4, duration: "5m 18s" },
      "custom": { users: 2847, interactions: 18459, responseTime: 1.2, duration: "4m 32s" }
    };

    return baseMetrics[range as keyof typeof baseMetrics] || baseMetrics["30d"];
  };

  const currentMetrics = getMetricsForDateRange(dateRange);

  const metrics = [
    {
      title: "Unique Users",
      value: currentMetrics.users.toLocaleString(),
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      description: `${dateRange === '1d' ? 'Today' : dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Selected period'}`
    },
    {
      title: "Total Interactions",
      value: currentMetrics.interactions.toLocaleString(),
      change: "+8.2%",
      trend: "up" as const,
      icon: MessageSquare,
      description: `${dateRange === '1d' ? 'Today' : dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'This month' : dateRange === '90d' ? 'Last 90 days' : 'Selected period'}`
    },
    {
      title: "Avg Response Time",
      value: `${currentMetrics.responseTime}s`,
      change: "-0.3s",
      trend: "down" as const,
      icon: Clock,
      description: "Response speed"
    },
    {
      title: "Session Duration",
      value: currentMetrics.duration,
      change: "+18s",
      trend: "up" as const,
      icon: Timer,
      description: "Average conversation length"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your AI agent performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          
          {dateRange === "custom" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[140px] justify-start text-left font-normal",
                    !customDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDate ? format(customDate, "PPP") : <span>Pick date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={customDate}
                  onSelect={setCustomDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          title="Interactions Over Time"
          description="Daily conversation volume"
          type="line"
        />
        <SimpleChart
          title="Unique Visitors"
          description="Visitors interacting with widget over time"
          type="area"
        />
      </div>

    </div>
  );
};

export default Dashboard;