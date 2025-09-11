import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SimpleChart } from "@/components/dashboard/SimpleChart";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { EnquiryTrendsChart } from "@/components/dashboard/EnquiryTrendsChart";
import { TopQuestionsChart } from "@/components/dashboard/TopQuestionsChart";
import { OfficeHoursChart } from "@/components/dashboard/OfficeHoursChart";
import { SentimentChart } from "@/components/dashboard/SentimentChart";
import { ConversionFunnelChart } from "@/components/dashboard/ConversionFunnelChart";
import { ChannelDistributionChart } from "@/components/dashboard/ChannelDistributionChart";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Timer,
  CalendarIcon,
  AlertTriangle,
  BarChart3,
  Target,
  MousePointer,
  Heart,
  HelpCircle,
  UserCheck,
  TrendingUp,
  ClockIcon,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [customDate, setCustomDate] = useState<Date>();
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);

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
        urlClickRate: 18.3,
        satisfactionRate: 87.5,
        totalEnquiries: 1845,
        escalationRate: 8.2,
        conversionRate: 12.4,
        humanHoursSaved: 24.5
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
        urlClickRate: 21.7,
        satisfactionRate: 85.2,
        totalEnquiries: 12456,
        escalationRate: 9.8,
        conversionRate: 14.7,
        humanHoursSaved: 168.3
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
        urlClickRate: 24.5,
        satisfactionRate: 89.6,
        totalEnquiries: 34567,
        escalationRate: 7.3,
        conversionRate: 16.2,
        humanHoursSaved: 745.8
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
        urlClickRate: 26.8,
        satisfactionRate: 88.1,
        totalEnquiries: 98734,
        escalationRate: 8.9,
        conversionRate: 18.5,
        humanHoursSaved: 2134.6
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
        urlClickRate: 24.5,
        satisfactionRate: 89.6,
        totalEnquiries: 34567,
        escalationRate: 7.3,
        conversionRate: 16.2,
        humanHoursSaved: 745.8
      }
    };

    return baseMetrics[range as keyof typeof baseMetrics] || baseMetrics["30d"];
  };

  const currentMetrics = getMetricsForDateRange(dateRange);

  // KPI data for top section
  const kpiData = [
    {
      title: "Satisfaction Rate",
      value: `${currentMetrics.satisfactionRate}%`,
      change: "+2.1%",
      trend: "up" as const,
      icon: Heart,
      description: "Average CSAT score"
    },
    {
      title: "Total Enquiries",
      value: currentMetrics.totalEnquiries.toLocaleString(),
      change: "+15.3%",
      trend: "up" as const,
      icon: HelpCircle,
      description: `${dateRange === '1d' ? 'Today' : dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'This month' : dateRange === '90d' ? 'Last 90 days' : 'Selected period'}`
    },
    {
      title: "Escalation Rate",
      value: `${currentMetrics.escalationRate}%`,
      change: "-1.4%",
      trend: "down" as const,
      icon: UserCheck,
      description: "Escalated to human"
    },
    {
      title: "Conversion Rate",
      value: `${currentMetrics.conversionRate}%`,
      change: "+3.7%",
      trend: "up" as const,
      icon: TrendingUp,
      description: "Bookings/Leads generated"
    },
    {
      title: "Human Hours Saved",
      value: `${currentMetrics.humanHoursSaved}h`,
      change: "+18.9%",
      trend: "up" as const,
      icon: ClockIcon,
      description: "AI vs manual handling"
    }
  ];

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
      title: "Customer Intents",
      value: `${currentMetrics.intentSupport}%`,
      change: "-1.5%",
      trend: "down" as const,
      icon: Target,
      description: "Top intent: Support"
    }
  ];

  // Sample AIVA-related URLs for the URL click dialog
  const sampleUrls = [
    {
      url: "https://aiva.ai/pricing",
      title: "AIVA Pricing Plans",
      clicks: 847,
      category: "Product"
    },
    {
      url: "https://aiva.ai/features/ai-assistant",
      title: "AI Assistant Features", 
      clicks: 623,
      category: "Features"
    },
    {
      url: "https://aiva.ai/integrations/whatsapp",
      title: "WhatsApp Integration Guide",
      clicks: 412,
      category: "Integration"
    },
    {
      url: "https://aiva.ai/support/getting-started",
      title: "Getting Started Guide",
      clicks: 386,
      category: "Support"
    },
    {
      url: "https://aiva.ai/demo",
      title: "Schedule Demo",
      clicks: 294,
      category: "Sales"
    },
    {
      url: "https://aiva.ai/blog/customer-service-automation",
      title: "Customer Service Automation Best Practices",
      clicks: 267,
      category: "Blog"
    },
    {
      url: "https://aiva.ai/api-docs",
      title: "API Documentation",
      clicks: 156,
      category: "Developer"
    },
    {
      url: "https://aiva.ai/case-studies",
      title: "Customer Success Stories",
      clicks: 134,
      category: "Case Studies"
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
        
        {/* URL Click Rate - Clickable */}
        <Dialog open={urlDialogOpen} onOpenChange={setUrlDialogOpen}>
          <DialogTrigger asChild>
            <div className="cursor-pointer">
              <MetricCard
                title="URL Click Rate"
                value={`${currentMetrics.urlClickRate}%`}
                change="+4.7%"
                trend="up"
                icon={MousePointer}
                description="Links clicked in conversations"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                URL Click Analytics
              </DialogTitle>
              <DialogDescription>
                Most clicked URLs in customer conversations ({dateRange === '1d' ? 'Today' : dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Selected period'})
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 overflow-y-auto max-h-[60vh]">
              {sampleUrls.map((urlData, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <h4 className="font-medium text-sm text-foreground truncate">
                        {urlData.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {urlData.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {urlData.url}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-foreground">
                      {urlData.clicks.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      clicks
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Charts Section */}
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

      {/* New Insights Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Customer Insights</h2>
            <p className="text-muted-foreground mt-1">Deep dive into customer experience and business outcomes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnquiryTrendsChart dateRange={dateRange} />
          <TopQuestionsChart dateRange={dateRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelDistributionChart dateRange={dateRange} />
          <OfficeHoursChart dateRange={dateRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentChart dateRange={dateRange} />
          <ConversionFunnelChart dateRange={dateRange} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;