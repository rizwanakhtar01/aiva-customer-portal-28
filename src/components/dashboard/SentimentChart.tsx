import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SentimentChartProps {
  dateRange: string;
}

export const SentimentChart = ({ dateRange }: SentimentChartProps) => {
  // Mock data for demonstration
  const sentimentData = [
    { label: "Positive", value: 68, count: 6834, color: "hsl(142 76% 36%)" },
    { label: "Neutral", value: 23, count: 2301, color: "hsl(47 96% 53%)" },
    { label: "Negative", value: 9, count: 912, color: "hsl(0 84% 60%)" }
  ];

  const total = sentimentData.reduce((sum, item) => sum + item.count, 0);

  // Calculate angles for donut chart
  let cumulativePercentage = 0;
  const chartData = sentimentData.map((item) => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + item.value) * 3.6;
    cumulativePercentage += item.value;
    return { ...item, startAngle, endAngle };
  });

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sentiment Analysis</CardTitle>
        <CardDescription>
          Customer sentiment breakdown - {total.toLocaleString()} interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="flex flex-col items-center space-y-4 h-full">
          {/* Donut Chart */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="50"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="16"
              />
              {chartData.map((item, index) => {
                const circumference = 2 * Math.PI * 50;
                const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((cumulativePercentage - item.value - (index > 0 ? chartData.slice(0, index).reduce((sum, prev) => sum + prev.value, 0) : 0)) / 100) * circumference;
                
                return (
                  <circle
                    key={index}
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="16"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {sentimentData[0].value}%
                </div>
                <div className="text-xs text-muted-foreground">Positive</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full flex-1 overflow-hidden">
            <div className="space-y-2 h-full overflow-y-auto pr-2">
              {sentimentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.count.toLocaleString()}
                    </Badge>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};