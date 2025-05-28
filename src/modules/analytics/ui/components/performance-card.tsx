import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { calculatePercentage, calculateEngagementRate } from "@/lib/utils";
import { BarChart3 } from "lucide-react";
import React from "react";
import { PerformanceBar } from "./performance-bar";
interface PerformanceCardProps {
  videoCount: number;
  subscriberCount: number;
  totalViews: number;
  totalLikes: number;
}

export const PerformanceCard = ({
  videoCount,
  subscriberCount,
  totalViews,
  totalLikes,
}: PerformanceCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Performance Overview
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>Channel growth and engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <PerformanceBar
            label="Subscriber Growth"
            value={calculatePercentage(subscriberCount, 10000)}
            color="bg-indigo-500"
          />
          <PerformanceBar
            label="View Rate"
            value={calculatePercentage(totalViews, 1000000)}
            color="bg-green-500"
          />
          <PerformanceBar
            label="Engagement Rate"
            value={calculateEngagementRate(totalLikes, totalViews)}
            color="bg-rose-500"
          />
          <PerformanceBar
            label="Content Output"
            value={calculatePercentage(videoCount, 100)}
            color="bg-primary"
          />
        </div>
      </CardContent>
    </Card>
  );
};
