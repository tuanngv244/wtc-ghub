import type { GameResponse, GameSearchParams } from "@/types/game";
import { gameService } from "@/services/game.service";
import { create } from "zustand";

interface GameState {
  games: GameResponse[];
  loading: boolean;
  error: string | null;

  fetchGames: (params?: GameSearchParams) => Promise<void>;
}

export const useGameStore = create<GameState>()((set) => ({
  games: [],
  loading: false,
  error: null,

  fetchGames: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data: res } = await gameService.getList(params);
      set({ games: res.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch games",
        loading: false,
      });
    }
  },
}));
