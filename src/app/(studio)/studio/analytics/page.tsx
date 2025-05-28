//first we will show total videos and and subscriber count
//then we will show graph of views and watch time
//then we will show graph of subscribers
//then we will show video card for each video and it will show single video analytics
import { DEFAULT_LIMIT } from "@/constant";
import { AnalyticsView } from "@/modules/analytics/ui/views/analytics-view";
import { HydrateClient, trpc } from "@/trpc/server";

const AnalyticsPage = async () => {
  void trpc.analytics.getUserVideos.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  void trpc.analytics.getUserDetails.prefetch();
  return (
    <HydrateClient>
      <AnalyticsView />
    </HydrateClient>
  );
};

export default AnalyticsPage;
