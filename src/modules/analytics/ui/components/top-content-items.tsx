import { formatNumber } from "@/lib/utils";
import { Play, Heart } from "lucide-react";
import Image from "next/image";

interface TopContentItemProps {
  title: string;
  name: string;
  thumbnail?: string;
  views: number;
  likes: number;
}

export const TopContentItem = ({
  title,
  views,
  likes,
  thumbnail,
  name,
}: TopContentItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="font-medium text-sm">{title}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Play className="h-3 w-3 mr-1" />
            {formatNumber(views)} views
          </div>
          <div className="flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            {formatNumber(likes)} likes
          </div>
        </div>
      </div>
      <div className="h-10 w-16 rounded bg-muted/50">
        <Image
          src={thumbnail ? thumbnail : "/placeholder.svg"}
          alt={name}
          height={40}
          width={64}
        />
      </div>
    </div>
  );
};
