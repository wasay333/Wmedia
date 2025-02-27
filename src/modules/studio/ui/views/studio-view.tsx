import React from "react";
import { VideosSection } from "../sections/videos-section";
// interface StudioViewProps {
//   categoryId?: string;
// }
export const StudioView = () => {
  return (
    <div className="pt-2.5 flex flex-col gap-y-6">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Channel content</h1>
        <p className="text-xs text-muted-foreground">
          Manage your channel content and videos
        </p>
      </div>
      <VideosSection />
    </div>
  );
};
