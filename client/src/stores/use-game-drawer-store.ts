import type { GameResponse } from "@/types/game";
import { create } from "zustand";

interface GameDrawerState {
  /** Whether the drawer is visible */
  isOpen: boolean;

  /** Currently selected game data */
  data?: GameResponse;

  /** Open drawer with specific game data */
  openWithGame: (data: GameResponse) => void;

  /** Close the drawer */
  close: () => void;

  /** Toggle drawer visibility */
  toggle: () => void;
}

export const useGameDrawerStore = create<GameDrawerState>()((set) => ({
  isOpen: false,
  data: undefined,
  openWithGame: (data) => set({ isOpen: true, data }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
