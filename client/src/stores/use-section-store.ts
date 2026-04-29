import type { SectionResponse } from "@/types/section";
import { sectionService } from "@/services/section.service";
import { create } from "zustand";

interface SectionState {
  sections: SectionResponse[];
  loading: boolean;
  error: string | null;

  fetchSections: () => Promise<void>;
}

export const useSectionStore = create<SectionState>()((set) => ({
  sections: [],
  loading: false,
  error: null,

  fetchSections: async () => {
    set({ loading: true, error: null });
    try {
      const { data: res } = await sectionService.getList();
      set({ sections: res.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch sections",
        loading: false,
      });
    }
  },
}));
