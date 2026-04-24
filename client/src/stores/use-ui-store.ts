import { create } from "zustand";

interface UIState {
  /** Whether the initial loading screen has finished */
  isLoadingDone: boolean;

  /** Mark loading as complete — triggers home page animations */
  setLoadingDone: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isLoadingDone: false,
  setLoadingDone: () => set({ isLoadingDone: true }),
}));
