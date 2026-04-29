"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BoxSlider } from "@/components/ui/box-slider";
import { CardGameBig } from "@/components/ui/card-game-big";
import { SVG } from "@/components/ui/svgs";
import { useSectionStore } from "@/stores/use-section-store";
import type { GameResponse } from "@/types/game";
import { ESection } from "@/types/section";

export function OurTopicked() {
  const { sections } = useSectionStore();

  const section = sections.find(
    (s) => s.slug === ESection.OUR_TOP_PICKED,
  );

  const games = (section?.items ?? []).map(
    (item) => item.itemData as GameResponse,
  );

  if (!section) return null;

  return (
    <SectionWrapper id="our-top-picked">
      <BoxSlider<GameResponse>
        data={games}
        title={section.title}
        waitForLoading
        options={{
          perPage: 1,
          fixedWidth: "18%", // ~ 100 / 5.5 = 18.18%
          trimSpace: false,
          breakpoints: {
            640: {
              fixedWidth: "72%",
              perPage: 1,
              padding: { top: "12px" },
            },
          },
        }}
        handBrush={
          <SVG.HandBrush.OurTopPicked className="absolute bottom-5 left-0 z-0" />
        }
        onViewAll={() => {}}
        renderItem={(data) => {
          return (
            <CardGameBig
              title={data.name}
              imageUrl={data.thumbnailUrl}
              description={data.shortDesc}
              gameData={data}
            />
          );
        }}
      />
    </SectionWrapper>
  );
}
