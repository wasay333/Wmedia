"use client";

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

interface FilterCarousalProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}
export const FilterCarousal = ({
  value,
  onSelect,
  data,
  isLoading,
}: FilterCarousalProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    //this is for the initail
    setCurrent(api.selectedScrollSnap() + 1);
    //this is for contineuosly setting afterward
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative w-full">
      {/* left fade */}
      <div
        className={cn(
          "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r  from-background to-transparent pointer-events-none",
          current === 1 && "hidden"
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-3">
          {!isLoading && (
            <CarouselItem
              className="pl-3 basis-auto"
              onClick={() => onSelect(null)}
            >
              <Badge
                variant={!value ? "default" : "secondary"}
                className={cn(
                  "rounded-lg cursor-pointer whitespace-nowrap text-sm transition-all duration-200",
                  !value
                    ? "bg-primary px-2 py-1 text-white font-semibold shadow-md" // Selected state
                    : "bg-secondary text-gray-600 hover:bg-gray-300" // Default state
                )}
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => (
              <CarouselItem key={index} className="pl-3 basis-auto">
                <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))}
          {!isLoading &&
            data.map((item) => (
              <CarouselItem
                key={item.value}
                className="pl-3 basis-auto"
                onClick={() => onSelect(item.value)}
              >
                <Badge
                  className={cn(
                    "rounded-lg cursor-pointer whitespace-nowrap text-sm transition-all duration-200",
                    value === item.value
                      ? "bg-primary  px-2 py-1  text-white font-semibold shadow-md" // Styles when selected
                      : "bg-secondary text-gray-600 hover:bg-gray-300"
                  )}
                  variant={value === item.value ? "default" : "secondary"}
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>
      {/* right fade */}
      <div
        className={cn(
          "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none",
          current === count && "hidden"
        )}
      />
    </div>
  );
};
