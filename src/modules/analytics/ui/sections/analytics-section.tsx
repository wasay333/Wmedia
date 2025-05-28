"use client";
import React from "react";
import { ChannelAnalytics } from "../components/channel-analytics";

export const AnalyticsSection = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Analytics Section */}
      <div className="bg-gray-300 text-card-foreground p-6 rounded-xl shadow-lg">
        <ChannelAnalytics />
      </div>
    </div>
  );
};
