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
      <CardContent>
        <div className="space-y-2">
          {funnelData.map((stage, index) => (
            <div key={index} className="relative">
              {/* Funnel Stage */}
              <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{stage.stage}</div>
                    <div className="text-xs text-muted-foreground">{stage.description}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">
                    {stage.count.toLocaleString()}
                  </Badge>
                  <span className="text-sm font-medium w-12 text-right">
                    {stage.percentage}%
                  </span>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="h-8 rounded-lg overflow-hidden bg-muted/30 mx-11">
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

          {/* Summary */}
          <div className="mt-6 p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-success">Overall Conversion Rate</div>
                <div className="text-sm text-success/80">From initial enquiry to booking/lead</div>
              </div>
              <div className="text-2xl font-bold text-success">
                {funnelData[funnelData.length - 1].percentage}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};