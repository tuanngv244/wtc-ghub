import { IBlog } from "@/types/blog";

export const ALL_GAMES = Array.from({ length: 12 }).map((_, index) => ({
  name: index % 2 == 0 ? "Goose Goose Duck" : "Bomb Busters",
  url: `/images/assets/mini-game-${index % 2 === 0 ? 1 : 2}.png`,
  minPlayers: 2,
  maxPlayers: 5,
  minTimes: 25,
  maxTimes: 40,
  years: 12,
  types: ["Boardgame", "Multipler"],
  description:
    'This is an adaptation of the board game called : "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden. This is an adaptation of the board game called : "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden. This is an adaptation of the board game called : "The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor, yet hidden',
  providers: [
    {
      id: Math.random(),
      name: "Disney",
      url: "/images/assets/mini-game-1.png",
      rank: index % 2 == 0 ? 1 : 2,
    },
  ],
}));

export const ALL_BLOGS: IBlog[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: Math.random() + "",
    title: "Codenames App vs Codenames Online: What’s the Difference?",
    imgUrl: `/images/assets/blog-thumb.jpg`,
    category: "news",
    slug: "/",
    url: "#",
    description:
      "The Codenames App (iOS/Android) is a premium, standalone, asynchronous experience designed for solo play or quick, non-real-time matches with new modes and word packs. Conversely, Codenames Online is a free, real-time, 1:1 virtual recreation of the board game, designed for live, synchronous play with friends via browsers.",
  }),
);
