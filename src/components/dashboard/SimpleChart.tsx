import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleChartProps {
  title: string;
  description: string;
  type: "line" | "pie" | "bar" | "area";
}

export const SimpleChart = ({ title, description, type }: SimpleChartProps) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <div className="h-64 flex bg-gradient-to-t from-primary/5 to-transparent rounded-lg relative">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between py-8 pr-2 text-xs text-muted-foreground">
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
              <span>0</span>
            </div>
            <div className="flex items-end justify-between flex-1 px-4 py-8">
              {[1200, 1100, 1350, 1250, 1450, 900, 800].map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t"
                    style={{ height: `${(value / 1500) * 150}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "pie":
        return (
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-success via-muted-foreground to-destructive"></div>
              <div className="absolute inset-4 rounded-full bg-card"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">65%</div>
                  <div className="text-xs text-muted-foreground">Positive</div>
                </div>
              </div>
            </div>
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm">Positive (65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                <span className="text-sm">Neutral (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-sm">Negative (10%)</span>
              </div>
            </div>
          </div>
        );
      
      case "bar":
        return (
          <div className="h-64 flex bg-gradient-to-t from-muted/20 to-transparent rounded-lg relative">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between py-8 pr-2 text-xs text-muted-foreground">
              <span>600</span>
              <span>400</span>
              <span>200</span>
              <span>0</span>
            </div>
            <div className="flex items-end justify-between flex-1 px-4 py-8">
              {[
                { resolved: 420, escalated: 30 },
                { resolved: 450, escalated: 25 },
                { resolved: 480, escalated: 20 },
                { resolved: 510, escalated: 18 }
              ].map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-1">
                    <div
                      className="w-6 bg-success rounded-t"
                      style={{ height: `${(data.resolved / 600) * 120}px` }}
                    />
                    <div
                      className="w-6 bg-destructive rounded-t"
                      style={{ height: `${(data.escalated / 600) * 120}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Week {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "area":
        return (
          <div className="h-64 flex bg-gradient-to-t from-accent/5 to-transparent rounded-lg relative">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between py-8 pr-2 text-xs text-muted-foreground">
              <span>2000</span>
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
              <span>0</span>
            </div>
            <div className="flex items-end justify-between flex-1 px-4 py-8">
              {[1800, 1650, 1750, 1900, 1600, 1450, 1200].map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className="w-8 bg-gradient-to-t from-accent to-accent/50 rounded-t"
                    style={{ height: `${(value / 2000) * 150}px` }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};