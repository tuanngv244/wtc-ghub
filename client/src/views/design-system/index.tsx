"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Logo } from "@/components/ui/logo";
import { BranchName } from "@/components/ui/branch-name";
import { ControlSlider } from "@/components/ui/control-slider";
import { Tabs } from "@/components/ui/tabs";
import { SectionTitle } from "@/components/ui/section-title";
import { CardGameBig } from "@/components/ui/card-game-big";
import { CardGameMini } from "@/components/ui/card-game-mini";
import { TopPlayerCard } from "@/components/ui/top-player-card";
import { Search01FreeIcons } from "@hugeicons/core-free-icons";
import { TopBar } from "../home/components/top-bar";

/* =================================================================
   Design System — Showcase Page
   Route: /design-system
   Renders all UI components from the Figma design system.
   ================================================================= */

/** Reusable section wrapper for grouping components */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-display font-bold text-text-primary border-b border-border-card pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Reusable sub-section with label */
function SubSection({
  label,
  children,
  dark = false,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 p-5">
      <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <div
        className={`flex flex-wrap items-center gap-4 rounded-2xl p-6 ${
          dark ? "bg-grey-900" : "bg-bg-card border border-border-card"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col gap-16 py-8 px-5">
      <TopBar />
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[length:var(--font-size-display-lg)] leading-[var(--line-height-display-lg)] font-display font-bold tracking-[var(--letter-spacing-display)] text-text-primary">
          Design System
        </h1>
        <p className="text-text-secondary text-lg">
          Snick — Board Game Hub UI Components
        </p>
      </div>

      {/* ─── 1. Logo ─── */}
      <Section title="1. Logo">
        <SubSection label="Sizes — Dark variant">
          <Logo size="sm" />
          <Logo size="md" />
          <Logo size="lg" />
        </SubSection>
        <SubSection label="Sizes — Light variant (dark background)" dark>
          <Logo size="sm" variant="light" />
          <Logo size="md" variant="light" />
          <Logo size="lg" variant="light" />
        </SubSection>
      </Section>

      {/* ─── 2. BranchName ─── */}
      <Section title="2. BranchName">
        <SubSection label="Category Labels">
          <BranchName>Card Game</BranchName>
          <BranchName>Strategy</BranchName>
          <BranchName>Multiplayer</BranchName>
          <BranchName>Board Game</BranchName>
        </SubSection>
      </Section>

      {/* ─── 3. Button ─── */}
      <Section title="3. Button">
        <SubSection label="Variants">
          <Button variant="primary">Dive In</Button>
          <Button variant="secondary">Game On!</Button>
          <Button variant="tertiary">Learn More</Button>
          <Button variant="ghost">Cancel</Button>
        </SubSection>
        <SubSection label="Sizes">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </SubSection>
        <SubSection label="With Icons">
          <Button variant="primary">Dive In</Button>
          <Button variant="secondary">Game On!</Button>
          <Button variant="tertiary" icon={Search01FreeIcons} />
        </SubSection>
        <SubSection label="States">
          <Button disabled>Disabled</Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </SubSection>
      </Section>

      {/* ─── 4. Chip ─── */}
      <Section title="4. Chip">
        <SubSection label="Variants">
          <Chip variant="active" icon="hugeicons:fire">
            Action
          </Chip>
          <Chip>Strategy</Chip>
          <Chip>Puzzle</Chip>
          <Chip>Family</Chip>
          <Chip>Party</Chip>
          <Chip>Solo</Chip>
          <Chip>Boardgame</Chip>
        </SubSection>
      </Section>

      {/* ─── 5. Control Slider ─── */}
      <Section title="5. Control Slider / Carousel">
        <SubSection label="Default">
          <ControlSlider />
        </SubSection>
        <SubSection label="Disabled states">
          <ControlSlider disabledPrev />
          <ControlSlider disabledNext />
          <ControlSlider disabledPrev disabledNext />
        </SubSection>
      </Section>

      {/* ─── 6. Tabs ─── */}
      <Section title="6. Tabs">
        <SubSection label="Interactive tabs">
          <Tabs
            tabs={[
              { id: "all", label: "All Games" },
              { id: "hot", label: "Hot" },
              { id: "new", label: "New" },
              { id: "top", label: "Top Rated" },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </SubSection>
        <div className="rounded-2xl bg-bg-card border border-border-card p-6">
          <p className="text-sm text-text-secondary">
            Active tab:{" "}
            <span className="font-bold text-text-primary">{activeTab}</span>
          </p>
        </div>
      </Section>

      {/* ─── 7. SectionTitle ─── */}
      <Section title="7. SectionTitle">
        <SubSection label="With badge + action">
          <div className="w-full">
            <SectionTitle badge="Top Picked" action={<ControlSlider />}>
              Our Top Picked
            </SectionTitle>
          </div>
        </SubSection>
        <SubSection label="With badge + description">
          <div className="w-full">
            <SectionTitle
              badge="Strategy"
              description="Brain-cracking strategy games for the bold"
            >
              Famous Board Games
            </SectionTitle>
          </div>
        </SubSection>
        <SubSection label="Plain">
          <div className="w-full">
            <SectionTitle>Crazy Multiplayer Games</SectionTitle>
          </div>
        </SubSection>
      </Section>

      {/* ─── 8. OurTopicCard (Blog/Guide Card) ─── */}
      <Section title="8. OurTopicCard (Blog / Guide)">
        <SubSection label="Default (hover to see interaction)">
          <CardGameBig
            tag="hot"
            title="Codenames App vs Codenames Online: What's the Difference?"
            imageUrl="https://images.unsplash.com/photo-1611891487122-2075bc9d07c4?w=600&h=450&fit=crop"
          />
          <CardGameBig
            tag="new"
            title="Top 10 Board Games for Family Night"
            imageUrl="https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=450&fit=crop"
          />
        </SubSection>
      </Section>

      {/* ─── 9. CardGameMini ─── */}
      <Section title="9. CardGameMini">
        <SubSection label="Default + Hover (shows GAME ON! overlay)">
          <CardGameMini
            title="Bomb Busters"
            imageUrl="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=440&h=280&fit=crop"
            badge="hot"
          />
          <CardGameMini
            title="Chess Masters"
            imageUrl="https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=440&h=280&fit=crop"
            badge="new"
          />
          <CardGameMini
            title="UNO Party"
            imageUrl="https://images.unsplash.com/photo-1606503153255-59d5e417c4ed?w=440&h=280&fit=crop"
          />
        </SubSection>
      </Section>

      {/* ─── 10. TopPlayerCard ─── */}
      <Section title="10. TopPlayerCard">
        <SubSection label="Leaderboard (rank-colored)">
          <div className="flex w-full flex-col gap-3">
            <TopPlayerCard
              rank={1}
              name="AlexHunter"
              score="14,250"
              avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            />
            <TopPlayerCard
              rank={2}
              name="SarahGamer"
              score="12,100"
              avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />
            <TopPlayerCard
              rank={3}
              name="MikePlay"
              score="11,850"
              avatarUrl="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
            />
            <TopPlayerCard
              rank={4}
              name="JaneDoe"
              score="10,200"
              avatarUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            />
            <TopPlayerCard
              rank={5}
              name="BoardKing42"
              score="9,800"
              avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            />
          </div>
        </SubSection>
      </Section>
    </div>
  );
}
