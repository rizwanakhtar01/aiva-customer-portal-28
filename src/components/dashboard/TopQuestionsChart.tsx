import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopQuestionsChartProps {
  dateRange: string;
}

export const TopQuestionsChart = ({ dateRange }: TopQuestionsChartProps) => {
  // Mock data for demonstration
  const topQuestions = [
    { question: "What are your opening hours?", count: 2845, percentage: 28 },
    { question: "How do I book an appointment?", count: 2134, percentage: 21 },
    { question: "What services do you offer?", count: 1876, percentage: 19 },
    { question: "Can I cancel my booking?", count: 1234, percentage: 12 },
    { question: "Where are you located?", count: 987, percentage: 10 },
    { question: "How much does it cost?", count: 654, percentage: 7 },
    { question: "Do you accept insurance?", count: 321, percentage: 3 }
  ];

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Questions</CardTitle>
        <CardDescription>
          Most frequently asked questions - {dateRange === '1d' ? 'Today' : dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'This month' : dateRange === '90d' ? 'Last 90 days' : 'Selected period'}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="h-full overflow-y-auto space-y-3 scrollbar-custom pr-2">
          {topQuestions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1 truncate">
                  {item.question}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/60 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.percentage}%
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="ml-2 text-xs flex-shrink-0">
                {item.count.toLocaleString()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};