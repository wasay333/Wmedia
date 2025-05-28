import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  trend?: number;
  trendUp?: boolean;
}

export const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp = false,
}: MetricCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatNumber(value)}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trendUp ? "text-green-500" : "text-red-500"
              )}
            >
              {trendUp ? "↑" : "↓"} {trend}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
