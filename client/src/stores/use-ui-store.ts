import { create } from "zustand";

interface UIState {
  /** True only when BOTH animation and data fetching are complete */
  isLoadingDone: boolean;

  _animationDone: boolean;
  _dataReady: boolean;

  /** Mark loading animation as complete */
  setAnimationDone: () => void;

  /** Mark data fetching as complete */
  setDataReady: () => void;
}

export const useUIStore = create<UIState>()((set, get) => ({
  isLoadingDone: false,
  _animationDone: false,
  _dataReady: false,

  setAnimationDone: () => {
    set({ _animationDone: true });
    if (get()._dataReady) set({ isLoadingDone: true });
  },

  setDataReady: () => {
    set({ _dataReady: true });
    if (get()._animationDone) set({ isLoadingDone: true });
  },
}));
