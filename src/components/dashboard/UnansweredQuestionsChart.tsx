import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface UnansweredQuestion {
  question: string;
  count: number;
  lastAsked: string;
}

interface UnansweredQuestionsChartProps {
  dateRange: string;
}

export const UnansweredQuestionsChart = ({ dateRange }: UnansweredQuestionsChartProps) => {
  const [showAll, setShowAll] = useState(false);

  // Sample unanswered questions data with realistic counts and timestamps
  const unansweredQuestions: UnansweredQuestion[] = [
    { question: "Do you allow pets in the rooms?", count: 23, lastAsked: "2024-12-15 14:30:00" },
    { question: "Is valet parking available at your hotel?", count: 18, lastAsked: "2024-12-15 11:45:00" },
    { question: "What's the Wi-Fi speed in conference halls?", count: 15, lastAsked: "2024-12-14 16:20:00" },
    { question: "Do you provide decorations for baby showers?", count: 12, lastAsked: "2024-12-14 09:15:00" },
    { question: "What time does the swimming pool open?", count: 11, lastAsked: "2024-12-13 18:30:00" },
    { question: "Can I bring outside catering for my event?", count: 9, lastAsked: "2024-12-13 13:45:00" },
    { question: "Do you offer vegan wedding menus?", count: 8, lastAsked: "2024-12-12 15:20:00" },
    { question: "Are you offering discounts for New Year's Eve packages?", count: 7, lastAsked: "2024-12-12 10:30:00" },
    { question: "What's the average taxi fare from airport to your hotel?", count: 5, lastAsked: "2024-12-11 14:15:00" },
    { question: "Can I extend my check-out time to 3 PM?", count: 4, lastAsked: "2024-12-11 08:45:00" },
    { question: "Do you have wheelchair accessible rooms?", count: 3, lastAsked: "2024-12-10 16:00:00" },
    { question: "Is there a business center available 24/7?", count: 2, lastAsked: "2024-12-10 12:30:00" },
    { question: "Can I get a late night room service menu?", count: 2, lastAsked: "2024-12-09 22:15:00" },
    { question: "Do you offer airport shuttle services?", count: 1, lastAsked: "2024-12-09 07:20:00" },
    { question: "Are there any nearby hiking trails?", count: 1, lastAsked: "2024-12-08 19:45:00" }
  ];

  // Sort by count (descending) and limit display
  const sortedQuestions = unansweredQuestions.sort((a, b) => b.count - a.count);
  const displayedQuestions = showAll ? sortedQuestions : sortedQuestions.slice(0, 10);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDateRangeText = () => {
    switch (dateRange) {
      case '1d': return 'Today';
      case '7d': return 'Last 7 days';
      case '30d': return 'This month';
      case '90d': return 'Last 90 days';
      default: return 'Selected period';
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <HelpCircle className="h-5 w-5 text-destructive" />
          Unanswered Questions
        </CardTitle>
        <CardDescription>
          Questions where AI responded with fallback - {getDateRangeText()}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <div className="h-full flex flex-col">
          {/* Table Header */}
          <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-t-md mb-2">
            <span className="text-sm font-medium text-muted-foreground">Question</span>
            <span className="text-sm font-medium text-muted-foreground">Count</span>
          </div>

          {/* Scrollable Table Content */}
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-custom pr-2">
            {displayedQuestions.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors cursor-default"
                title={`Last asked: ${formatTimestamp(item.lastAsked)}`}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm font-medium text-foreground leading-5">
                    {item.question}
                  </p>
                </div>
                <Badge 
                  variant="secondary" 
                  className="text-xs flex-shrink-0 group-hover:bg-destructive/20 group-hover:text-destructive border-destructive/20"
                >
                  {item.count}
                </Badge>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {sortedQuestions.length > 10 && (
            <div className="mt-3 pt-3 border-t border-muted/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full text-xs"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show Top 10
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Show All ({sortedQuestions.length})
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};