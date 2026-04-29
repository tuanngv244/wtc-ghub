import { api } from "@/lib/axios";
import { endpoints } from "@/lib/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  GameResponse,
  GameDetailResponse,
  GameSearchParams,
} from "@/types/game";

export const gameService = {
  getList: (params?: GameSearchParams) =>
    api.get<ApiResponse<GameResponse[]>>(endpoints.games.list, { params }),

  getDetail: (id: string) =>
    api.get<ApiResponse<GameDetailResponse>>(endpoints.games.detail(id)),
};
