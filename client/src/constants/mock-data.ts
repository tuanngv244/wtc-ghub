import type { GameResponse } from "@/types/game";
import type { PostResponse } from "@/types/blog";

export const ALL_GAMES: GameResponse[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: `mock-${index}`,
    slug: index % 2 === 0 ? "goose-goose-duck" : "bomb-busters",
    name: index % 2 === 0 ? "Goose Goose Duck" : "Bomb Busters",
    shortDesc: "An exciting party game for friends",
    longDesc:
      'This is an adaptation of the board game called : "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden.',
    thumbnailUrl: `/images/assets/mini-game-${index % 2 === 0 ? 1 : 2}.png`,
    coverUrl: `/images/assets/mini-game-${index % 2 === 0 ? 1 : 2}.png`,
    playUrl: "#",
    minPlayers: 2,
    maxPlayers: 5,
    minAge: 12,
    avgDurationMin: 30,
    difficulty: "Medium",
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  }),
);

export const ALL_POSTS: PostResponse[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: `mock-post-${index}`,
    slug: "codenames-app-vs-online",
    title: "Codenames App vs Codenames Online: What's the Difference?",
    summary:
      "The Codenames App (iOS/Android) is a premium, standalone, asynchronous experience designed for solo play or quick, non-real-time matches with new modes and word packs.",
    content: "",
    thumbnailUrl: `/images/assets/blog-thumb.jpg`,
    authorName: "Admin",
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
  }),
);
