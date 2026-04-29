"use client";
import { useUIStore } from "@/stores/use-ui-store";
import { Banner } from "./components/banner";
import { BestIOGames } from "./components/best-io-games";
import { BrainCrackedStrategyGames } from "./components/brain-cracked-strategy-games";
import { CategoryBar } from "./components/category-bar";
import { CrazyMultiplayerGames } from "./components/crazy-multiplayer-games";
import { DareTestSkillset } from "./components/dare-test-skillet";
import { FamousBoardGames } from "./components/famous-board-games";
import { NextFavoriteGames } from "./components/next-favorite-games";
import { OurTopicked } from "./components/our-top-picked";
import { SocialChannel } from "./components/social-channel";
import { TopBar } from "./components/top-bar";
import { TopPlayers } from "./components/top-players";
import { useEffect } from "react";
import { useSectionStore } from "@/stores/use-section-store";
import { useCategoryStore } from "@/stores/use-category-store";

export default function Home() {
  const { fetchSections } = useSectionStore();
  const { fetchCategories } = useCategoryStore();
  const setDataReady = useUIStore((s) => s.setDataReady);

  const fetchResources = async () => {
    await Promise.allSettled([fetchCategories(), fetchSections()]);
    setDataReady();
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <>
      <TopBar />
      <Banner />
      <CategoryBar />
      <OurTopicked />
      <BestIOGames />
      <FamousBoardGames />
      <CrazyMultiplayerGames />
      <NextFavoriteGames />
      <BrainCrackedStrategyGames />
      <DareTestSkillset />
      <TopPlayers />
      <SocialChannel />
    </>
  );
}
