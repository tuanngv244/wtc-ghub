"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BoxSlider } from "@/components/ui/box-slider";
import { CardGameMini } from "@/components/ui/card-game-mini";
import { SVG } from "@/components/ui/svgs";
import { useSectionStore } from "@/stores/use-section-store";
import type { GameResponse } from "@/types/game";
import { ESection } from "@/types/section";

export function CrazyMultiplayerGames() {
  const { sections } = useSectionStore();

  const section = sections.find(
    (s) => s.slug === ESection.CRAZY_MULTIPLAYER_GAMES,
  );

  const games = (section?.items ?? []).map(
    (item) => item.itemData as GameResponse,
  );

  if (!section) return null;

  return (
    <SectionWrapper id="crazy-multiplayer-games" className="mt-3">
      <BoxSlider<GameResponse>
        data={games}
        title={section.title}
        onViewAll={() => {}}
        handBrush={
          <SVG.HandBrush.Crazy className="absolute bottom-5 left-18 z-0" />
        }
        renderItem={(data) => {
          return (
            <CardGameMini
              title={data.name}
              imageUrl={data.thumbnailUrl}
              gameData={data}
            />
          );
        }}
      />
    </SectionWrapper>
  );
}
