import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OfficeHoursChartProps {
  dateRange: string;
}

export const OfficeHoursChart = ({ dateRange }: OfficeHoursChartProps) => {
  // Mock data for demonstration
  const officeHoursData = {
    officeHours: { enquiries: 6534, percentage: 65 },
    nonOfficeHours: { enquiries: 3521, percentage: 35 }
  };

  // Heatmap data for 24 hours (0-23)
  const hourlyData = [
    5, 3, 2, 1, 1, 2, 8, 15, 25, 35, 42, 38, 45, 48, 52, 46, 41, 35, 28, 22, 18, 12, 8, 6
  ];

  const maxHourly = Math.max(...hourlyData);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Office Hours Analysis</CardTitle>
        <CardDescription>
          Enquiry distribution throughout the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary bars */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary rounded-sm" />
                <span className="text-sm font-medium">Office Hours (9AM-5PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{officeHoursData.officeHours.enquiries.toLocaleString()}</span>
                <span className="text-sm font-medium">{officeHoursData.officeHours.percentage}%</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${officeHoursData.officeHours.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary/40 rounded-sm" />
                <span className="text-sm font-medium">Non-Office Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{officeHoursData.nonOfficeHours.enquiries.toLocaleString()}</span>
                <span className="text-sm font-medium">{officeHoursData.nonOfficeHours.percentage}%</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary/40 h-2 rounded-full transition-all duration-500"
                style={{ width: `${officeHoursData.nonOfficeHours.percentage}%` }}
              />
            </div>
          </div>

          {/* Hourly heatmap */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">24-Hour Heatmap</h4>
            <div className="grid grid-cols-12 gap-1">
              {hourlyData.map((value, hour) => (
                <div
                  key={hour}
                  className="aspect-square rounded-sm flex items-center justify-center text-xs font-medium transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${0.2 + (value / maxHourly) * 0.8})`,
                    color: value > maxHourly * 0.6 ? 'white' : 'hsl(var(--foreground))'
                  }}
                  title={`${hour}:00 - ${value} enquiries`}
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};