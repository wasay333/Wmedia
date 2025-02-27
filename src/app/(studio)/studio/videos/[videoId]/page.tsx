import { VideoView } from "@/modules/studio/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

interface PageProps {
  params: Promise<{ videoId: string }>;
}
export const dynamic = "force-dynamic";

const Page = async ({ params }: PageProps) => {
  const { videoId } = await params;
  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default Page;
