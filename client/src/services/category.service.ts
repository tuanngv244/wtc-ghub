import { api } from "@/lib/axios";
import { endpoints } from "@/lib/endpoints";
import type { ApiResponse } from "@/types/api";
import type { CategoryResponse } from "@/types/game";

export const categoryService = {
  getList: (params?: { type?: string; slug?: string }) =>
    api.get<ApiResponse<CategoryResponse[]>>(endpoints.categories.list, {
      params,
    }),
};
