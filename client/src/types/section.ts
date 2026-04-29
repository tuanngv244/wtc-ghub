export enum ESection {
  HERO = "hero",
  OUR_TOP_PICKED = "our-top-picked",
  BEST_IO_GAMES = "best-10-games",
  FAMOUS_BOARD_GAMES = "famous-board-games",
  CRAZY_MULTIPLAYER_GAMES = "crazy-multiplayer-games",
  YOUR_NEXT_FAVORITE_GAMES = "your-next-favorite-games",
  BRAIN_CRACKED_STRATEGY_GAMES = "brain-cracked-strategy-games",
  DARE_TO_TEST_YOUR_SKILLSET = "dare-to-test-your-skillset",
  TOP_PLAYERS = "learn-from-top-players",
}

export interface SectionItemResponse {
  id: string;
  itemType: string;
  itemId: string;
  displayOrder: number;
  pinned: boolean;
  score: number;
  itemData: unknown;
}

export interface SectionResponse {
  id: string;
  slug: string;
  title: string;
  sectionType: string;
  layout: string;
  displayOrder: number;
  items: SectionItemResponse[];
}
