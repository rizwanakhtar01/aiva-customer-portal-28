import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EnquiryTrendsChartProps {
  dateRange: string;
}

export const EnquiryTrendsChart = ({ dateRange }: EnquiryTrendsChartProps) => {
  // Mock data for demonstration
  const getDataForRange = (range: string) => {
    const data = {
      "1d": [120, 145, 165, 135, 180, 155, 175, 190, 205, 185, 160, 140],
      "7d": [850, 920, 1100, 980, 1250, 1180, 1350],
      "30d": [25000, 28000, 32000, 29000, 35000, 33000, 38000, 36000, 42000, 39000, 45000, 43000],
      "90d": [78000, 82000, 88000, 85000, 92000, 89000, 95000, 98000, 102000, 99000, 105000, 108000],
      "custom": [25000, 28000, 32000, 29000, 35000, 33000, 38000, 36000, 42000, 39000, 45000, 43000]
    };
    return data[range as keyof typeof data] || data["30d"];
  };

  const chartData = getDataForRange(dateRange);
  const maxValue = Math.max(...chartData);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Enquiry Trends</CardTitle>
        <CardDescription>
          Enquiry volume over time - {dateRange === '1d' ? 'Hourly' : dateRange === '7d' ? 'Daily' : 'Weekly'} breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2">
          {chartData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
                style={{ height: `${(value / maxValue) * 200}px` }}
              />
              <span className="text-xs text-muted-foreground mt-2">
                {dateRange === '1d' ? `${index * 2}:00` : 
                 dateRange === '7d' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] :
                 `W${index + 1}`}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">
            Peak: {maxValue.toLocaleString()} enquiries
          </span>
        </div>
      </CardContent>
    </Card>
  );
};