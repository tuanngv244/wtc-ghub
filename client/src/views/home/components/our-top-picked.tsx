"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BoxSlider } from "@/components/ui/box-slider";
import { CardGameBig } from "@/components/ui/card-game-big";
import { SVG } from "@/components/ui/svgs";
import { ALL_GAMES } from "@/constants/mock-data";
import { ETag } from "@/types/common";
import { IGame } from "@/types/game";

export function OurTopicked() {
  return (
    <SectionWrapper id="our-top-picked">
      <BoxSlider<IGame>
        data={ALL_GAMES}
        title="Our Top Picked!"
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
              imageUrl={data.url}
              description={data.description}
              tag={data.tag as ETag}
              gameData={{
                name: data.name,
                url: data.url,
                description: data.description,
                minPlayers: 2,
                maxPlayers: 6,
                minTimes: data.minTimes,
                maxTimes: data.maxTimes,
                years: data.years,
                types: data.types,
                providers: data.providers,
              }}
            />
          );
        }}
      />
    </SectionWrapper>
  );
}
