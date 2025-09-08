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
  CalendarIcon,
  AlertTriangle,
  BarChart3,
  Target,
  MousePointer
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
      "1d": { 
        users: 347, 
        interactions: 1245, 
        responseTime: 0.8, 
        duration: "2m 45s",
        fallbackRate: 12.5,
        channelWeb: 65,
        channelMobile: 25,
        channelApi: 10,
        intentSupport: 45,
        intentSales: 30,
        intentGeneral: 25,
        urlClickRate: 18.3
      },
      "7d": { 
        users: 1423, 
        interactions: 7834, 
        responseTime: 1.0, 
        duration: "3m 12s",
        fallbackRate: 15.2,
        channelWeb: 68,
        channelMobile: 22,
        channelApi: 10,
        intentSupport: 42,
        intentSales: 33,
        intentGeneral: 25,
        urlClickRate: 21.7
      },
      "30d": { 
        users: 2847, 
        interactions: 18459, 
        responseTime: 1.2, 
        duration: "4m 32s",
        fallbackRate: 13.8,
        channelWeb: 70,
        channelMobile: 20,
        channelApi: 10,
        intentSupport: 40,
        intentSales: 35,
        intentGeneral: 25,
        urlClickRate: 24.5
      },
      "90d": { 
        users: 8456, 
        interactions: 52367, 
        responseTime: 1.4, 
        duration: "5m 18s",
        fallbackRate: 16.1,
        channelWeb: 72,
        channelMobile: 18,
        channelApi: 10,
        intentSupport: 38,
        intentSales: 37,
        intentGeneral: 25,
        urlClickRate: 26.8
      },
      "custom": { 
        users: 2847, 
        interactions: 18459, 
        responseTime: 1.2, 
        duration: "4m 32s",
        fallbackRate: 13.8,
        channelWeb: 70,
        channelMobile: 20,
        channelApi: 10,
        intentSupport: 40,
        intentSales: 35,
        intentGeneral: 25,
        urlClickRate: 24.5
      }
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
    },
    {
      title: "Fallback Rate",
      value: `${currentMetrics.fallbackRate}%`,
      change: "-2.1%",
      trend: "down" as const,
      icon: AlertTriangle,
      description: "When AI couldn't help"
    },
    {
      title: "Channel Distribution",
      value: `${currentMetrics.channelWeb}%`,
      change: "+3.2%",
      trend: "up" as const,
      icon: BarChart3,
      description: "Web widget usage"
    },
    {
      title: "Customer Intents",
      value: `${currentMetrics.intentSupport}%`,
      change: "-1.5%",
      trend: "down" as const,
      icon: Target,
      description: "Top intent: Support"
    },
    {
      title: "URL Click Rate",
      value: `${currentMetrics.urlClickRate}%`,
      change: "+4.7%",
      trend: "up" as const,
      icon: MousePointer,
      description: "Links clicked in conversations"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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