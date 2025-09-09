import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ChannelDistributionChartProps {
  dateRange: string;
}

export const ChannelDistributionChart = ({ dateRange }: ChannelDistributionChartProps) => {
  // Mock data for different channels based on date range
  const getChannelData = (range: string) => {
    const baseData = {
      "1d": [
        { name: "Web Widget", value: 45, color: "hsl(var(--primary))" },
        { name: "WhatsApp", value: 25, color: "hsl(var(--secondary))" },
        { name: "Email", value: 15, color: "hsl(var(--accent))" },
        { name: "Facebook", value: 10, color: "hsl(var(--muted))" },
        { name: "Instagram", value: 5, color: "hsl(var(--destructive))" }
      ],
      "7d": [
        { name: "Web Widget", value: 50, color: "hsl(var(--primary))" },
        { name: "WhatsApp", value: 28, color: "hsl(var(--secondary))" },
        { name: "Email", value: 12, color: "hsl(var(--accent))" },
        { name: "Facebook", value: 7, color: "hsl(var(--muted))" },
        { name: "Instagram", value: 3, color: "hsl(var(--destructive))" }
      ],
      "30d": [
        { name: "Web Widget", value: 55, color: "hsl(var(--primary))" },
        { name: "WhatsApp", value: 22, color: "hsl(var(--secondary))" },
        { name: "Email", value: 13, color: "hsl(var(--accent))" },
        { name: "Facebook", value: 7, color: "hsl(var(--muted))" },
        { name: "Instagram", value: 3, color: "hsl(var(--destructive))" }
      ],
      "90d": [
        { name: "Web Widget", value: 58, color: "hsl(var(--primary))" },
        { name: "WhatsApp", value: 20, color: "hsl(var(--secondary))" },
        { name: "Email", value: 14, color: "hsl(var(--accent))" },
        { name: "Facebook", value: 5, color: "hsl(var(--muted))" },
        { name: "Instagram", value: 3, color: "hsl(var(--destructive))" }
      ],
      "custom": [
        { name: "Web Widget", value: 55, color: "hsl(var(--primary))" },
        { name: "WhatsApp", value: 22, color: "hsl(var(--secondary))" },
        { name: "Email", value: 13, color: "hsl(var(--accent))" },
        { name: "Facebook", value: 7, color: "hsl(var(--muted))" },
        { name: "Instagram", value: 3, color: "hsl(var(--destructive))" }
      ]
    };
    
    return baseData[range as keyof typeof baseData] || baseData["30d"];
  };

  const channelData = getChannelData(dateRange);
  const total = channelData.reduce((sum, item) => sum + item.value, 0);

  // Simple pie chart using CSS
  const createPieSlice = (data: typeof channelData[0], index: number, offset: number) => {
    const percentage = (data.value / total) * 100;
    const angle = (percentage / 100) * 360;
    
    return (
      <div
        key={data.name}
        className="absolute w-full h-full rounded-full"
        style={{
          background: `conic-gradient(${data.color} 0deg ${angle}deg, transparent ${angle}deg 360deg)`,
          transform: `rotate(${offset}deg)`,
        }}
      />
    );
  };

  let cumulativeOffset = 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Channel Distribution
          </CardTitle>
          <CardDescription>
            Enquiries by communication channel
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8">
          {/* Pie Chart */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-muted/20" />
            {channelData.map((item, index) => {
              const slice = createPieSlice(item, index, cumulativeOffset);
              const percentage = (item.value / total) * 100;
              cumulativeOffset += (percentage / 100) * 360;
              return slice;
            })}
            <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Channels</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {channelData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-muted-foreground ml-auto">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Count */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Conversations</span>
            <span className="text-lg font-semibold text-foreground">
              {(Math.random() * 10000 + 5000).toFixed(0)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};