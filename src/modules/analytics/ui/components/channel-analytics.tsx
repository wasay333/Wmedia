"use client";

import type React from "react";
import { DEFAULT_LIMIT } from "@/constant";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heart, Play, Users, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MetricCard } from "./metric-card";
import { ChartCard } from "./chart-card";
import { PerformanceCard } from "./performance-card";
import { TopContentItem } from "./top-content-items";
import { InfiniteScroll } from "@/components/infinite-scroll";

export const ChannelAnalytics = () => {
  return (
    <Suspense fallback={<ChannelAnalyticsSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading analytics data...</p>}>
        <ChannelAnalyticsSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const ChannelAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-64 bg-muted rounded"></div>
      <div className="h-4 w-96 bg-muted rounded"></div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded"></div>
        ))}
      </div>

      <div className="h-64 bg-muted rounded"></div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 bg-muted rounded"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    </div>
  );
};
const ChannelAnalyticsSuspense = () => {
  const [user] = trpc.analytics.getUserDetails.useSuspenseQuery();
  const [videos, query] = trpc.analytics.getUserVideos.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <div className="space-y-6 ">
      <div className="flex flex-col">
        <h2 className="text-3xl dark:text-gray-700 font-bold tracking-tight">
          {user.name}&apos;s Channel
        </h2>
        <p className="dark:text-gray-700  text-foreground">
          Your channel performance and analytics at a glance
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Videos"
          value={user.videoCount}
          description="Total videos published"
          icon={<Video className="h-5 w-5 text-primary" />}
          trend={5}
        />
        <MetricCard
          title="Subscribers"
          value={user.subscriberCount}
          description="Channel subscribers"
          icon={<Users className="h-5 w-5 text-indigo-500" />}
          trend={12}
          trendUp={true}
        />
        <MetricCard
          title="Views"
          value={user.totalViews}
          description="Total video views"
          icon={<Play className="h-5 w-5 text-green-500" />}
          trend={8}
          trendUp={true}
        />
        <MetricCard
          title="Likes"
          value={user.totalLikes}
          description="Total video likes"
          icon={<Heart className="h-5 w-5 text-rose-500" />}
          trend={3}
          trendUp={true}
        />
      </div>

      <PerformanceCard
        videoCount={user.videoCount}
        subscriberCount={user.subscriberCount}
        totalViews={user.totalViews}
        totalLikes={user.totalLikes}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Top Performing Content
            </CardTitle>
            <CardDescription>Your most viewed and liked videos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.pages
                .flatMap((page) => page.items)
                .map((video) => (
                  <TopContentItem
                    name={video.title}
                    thumbnail={video.thumbnailUrl || "/placeholder.svg"}
                    key={video.videoId}
                    title={video.title}
                    views={video.viewCount}
                    likes={video.likeCount}
                  />
                ))}

              <Separator />
              <InfiniteScroll
                hasNextPage={query.hasNextPage}
                isFetchingNextPage={query.isFetchingNextPage}
                fetchNextPage={query.fetchNextPage}
                isManual
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
