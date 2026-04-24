import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  /** Whether the sidebar is expanded (true) or collapsed (false) */
  isExpanded: boolean;
  /** Whether the mobile drawer overlay is open */
  isMobileOpen: boolean;
  /** Toggle between expanded and collapsed */
  toggle: () => void;
  /** Expand the sidebar */
  expand: () => void;
  /** Collapse the sidebar */
  collapse: () => void;
  /** Open the mobile drawer */
  openMobile: () => void;
  /** Close the mobile drawer */
  closeMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isExpanded: false,
      isMobileOpen: false,
      toggle: () => set((state) => ({ isExpanded: !state.isExpanded })),
      expand: () => set({ isExpanded: true }),
      collapse: () => set({ isExpanded: false }),
      openMobile: () => set({ isMobileOpen: true }),
      closeMobile: () => set({ isMobileOpen: false }),
    }),
    {
      name: "sidebar-storage",
      partialize: (state) => ({ isExpanded: state.isExpanded }),
    },
  ),
);
