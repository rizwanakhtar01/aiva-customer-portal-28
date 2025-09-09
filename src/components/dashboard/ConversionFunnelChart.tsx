import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConversionFunnelChartProps {
  dateRange: string;
}

export const ConversionFunnelChart = ({ dateRange }: ConversionFunnelChartProps) => {
  // Mock data for demonstration
  const funnelData = [
    { 
      stage: "Initial Enquiry", 
      count: 10000, 
      percentage: 100, 
      color: "hsl(var(--primary))",
      description: "All interactions"
    },
    { 
      stage: "Engaged", 
      count: 7500, 
      percentage: 75, 
      color: "hsl(var(--primary) / 0.8)",
      description: "Asked follow-up questions"
    },
    { 
      stage: "Interested", 
      count: 4500, 
      percentage: 45, 
      color: "hsl(var(--primary) / 0.6)",
      description: "Requested specific info"
    },
    { 
      stage: "Qualified", 
      count: 2250, 
      percentage: 22.5, 
      color: "hsl(var(--primary) / 0.4)",
      description: "Met qualification criteria"
    },
    { 
      stage: "Converted", 
      count: 1620, 
      percentage: 16.2, 
      color: "hsl(142 76% 36%)",
      description: "Booking/Lead generated"
    }
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Conversion Funnel</CardTitle>
        <CardDescription>
          Customer journey from enquiry to conversion
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="h-full flex flex-col">
          {/* Funnel Stages - Scrollable */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
            {funnelData.map((stage, index) => (
              <div key={index} className="relative">
                {/* Funnel Stage */}
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{stage.stage}</div>
                      <div className="text-xs text-muted-foreground">{stage.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {stage.count.toLocaleString()}
                    </Badge>
                    <span className="text-xs font-medium w-10 text-right">
                      {stage.percentage}%
                    </span>
                  </div>
                </div>

                {/* Visual Bar */}
                <div className="h-6 rounded-lg overflow-hidden bg-muted/30 mx-8">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: `${stage.percentage}%`,
                      backgroundColor: stage.color
                    }}
                  />
                </div>

                {/* Drop-off indicator */}
                {index < funnelData.length - 1 && (
                  <div className="flex items-center justify-center my-1">
                    <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      -{((funnelData[index].count - funnelData[index + 1].count) / funnelData[index].count * 100).toFixed(1)}% drop-off
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Summary - Fixed at bottom */}
          <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-success text-sm">Overall Conversion</div>
                <div className="text-xs text-success/80">Enquiry to booking/lead</div>
              </div>
              <div className="text-xl font-bold text-success">
                {funnelData[funnelData.length - 1].percentage}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};