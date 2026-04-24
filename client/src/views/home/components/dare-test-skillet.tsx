"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BoxSlider } from "@/components/ui/box-slider";
import { CardGameMini } from "@/components/ui/card-game-mini";
import { SVG } from "@/components/ui/svgs";
import { ALL_GAMES } from "@/constants/mock-data";
import { IGame } from "@/types/game";

export function DareTestSkillset() {
  return (
    <SectionWrapper id="dare-test-skillset" className="mt-3">
      <BoxSlider<IGame>
        data={ALL_GAMES}
        title="Dare to test your skillset?"
        onViewAll={() => {}}
        handBrush={
          <SVG.HandBrush.Skillset className="absolute bottom-5 left-50 z-0" />
        }
        renderItem={(data) => {
          return (
            <CardGameMini
              title={data.name}
              imageUrl={data.url}
              gameData={{
                name: data.name,
                url: data.url,
                description: data.description,
                minPlayers: data.minPlayers,
                maxPlayers: data.maxPlayers,
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
