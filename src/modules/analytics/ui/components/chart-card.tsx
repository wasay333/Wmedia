"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", subscribers: 186, views: 80 },
  { month: "February", subscribers: 305, views: 200 },
  { month: "March", subscribers: 237, views: 120 },
  { month: "April", subscribers: 73, views: 190 },
  { month: "May", subscribers: 209, views: 130 },
  { month: "June", subscribers: 214, views: 140 },
];

const chartConfig = {
  views: {
    label: "views",
    color: "hsl(var(--chart-1))",
  },
  subscribers: {
    label: "subscribers",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Views and Subscribers analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="subscribers"
              type="monotone"
              stroke="var(--color-subscribers)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="views"
              type="monotone"
              stroke="var(--color-views)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
