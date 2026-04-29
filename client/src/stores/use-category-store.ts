import type { CategoryResponse } from "@/types/game";
import { categoryService } from "@/services/category.service";
import { create } from "zustand";

interface CategoryState {
  categories: CategoryResponse[];
  loading: boolean;
  error: string | null;

  fetchCategories: (params?: { type?: string; slug?: string }) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data: res } = await categoryService.getList(params);
      set({ categories: res.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch categories",
        loading: false,
      });
    }
  },
}));
