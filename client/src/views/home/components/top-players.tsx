"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BoxSlider } from "@/components/ui/box-slider";
import { Chip } from "@/components/ui/chip";
import { TopPlayerCard } from "@/components/ui/top-player-card";
import { useSectionStore } from "@/stores/use-section-store";
import { cn } from "@/lib/utils";
import type { PostResponse } from "@/types/blog";
import { ESection } from "@/types/section";
import { useState } from "react";

export function TopPlayers() {
  const [actTab, setActTab] = useState<string>("");
  const { sections } = useSectionStore();

  const section = sections.find((s) => s.slug === ESection.TOP_PLAYERS);

  const posts = (section?.items ?? []).map(
    (item) => item.itemData as PostResponse,
  );

  const tags = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Guide",
      value: "guide",
    },
    {
      label: "News",
      value: "news",
    },
    {
      label: "Community",
      value: "community",
    },
  ];

  if (!section) return null;

  return (
    <SectionWrapper id="top-players" className="mt-8 mx-auto ">
      <div className="bg-white rounded-3xl border-solid border-2 border-camelia-500 shadow-[6px_6px_0_0_#FBD8DF] p-4 sm:p-7.5 pt-2 ">
        <BoxSlider<PostResponse>
          data={posts}
          title={
            <div className="flex flex-col relative z-1">
              <h3 className="fav-title relative mb-1.5 text-black [text-shadow:2px_0_#fff,-2px_0_#fff,0_2px_#fff,0_-2px_#fff,1px_1px_#fff,-1px_-1px_#fff,1px_-1px_#fff,-1px_1px_#fff,4px_4px_0_#ADCBFF] text-2xl sm:text-4xl md:text-5xl leading-tight md:leading-14.5 font-black">
                Learn from{" "}
                <span className="text-(--color-camelia-500)">Top</span> players
              </h3>
              <p className="text-grey-500 leading-5 font-medium font-pangram">
                We pick the game base on your interest
              </p>
            </div>
          }
          className="top-players-slider"
          hasViewAll={false}
          options={{
            perPage: 5.5,
            breakpoints: {
              1560: {
                perPage: 5.5,
              },
              1024: {
                perPage: 4.5,
              },
              768: {
                perPage: 3,
              },
              640: {
                perPage: 1,
              },
            },
          }}
          handBrush={
            <img
              src="/images/assets/star-hand-brush.png"
              alt="star"
              className="absolute -bottom-2 left-60 z-0"
            />
          }
          rightAction={
            <div className="hidden sm:flex items-center gap-1.5">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  onClick={() => setActTab(tag.value)}
                  className={cn(
                    "h-6 min-w-20",
                    actTab === tag.value ? "bg-[#FBD8DF]" : "bg-[#F7FBFC]",
                  )}
                  variant={actTab === tag.value ? "pink" : undefined}
                >
                  {tag.label}
                </Chip>
              ))}
            </div>
          }
          renderItem={(data) => {
            return <TopPlayerCard {...data} />;
          }}
        />
      </div>
    </SectionWrapper>
  );
}
