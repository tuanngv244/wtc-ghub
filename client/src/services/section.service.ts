import { api } from "@/lib/axios";
import { endpoints } from "@/lib/endpoints";
import type { ApiResponse } from "@/types/api";
import type { SectionResponse } from "@/types/section";

export const sectionService = {
  getList: () =>
    api.get<ApiResponse<SectionResponse[]>>(endpoints.sections.list),
};
