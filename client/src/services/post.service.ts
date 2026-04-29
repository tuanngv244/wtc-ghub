import { api } from "@/lib/axios";
import { endpoints } from "@/lib/endpoints";
import type { ApiResponse } from "@/types/api";
import type { PostResponse, PostSearchParams } from "@/types/blog";

export const postService = {
  getList: (params?: PostSearchParams) =>
    api.get<ApiResponse<PostResponse[]>>(endpoints.posts.list, { params }),
};
