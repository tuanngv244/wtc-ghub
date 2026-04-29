import type { PostResponse, PostSearchParams } from "@/types/blog";
import { postService } from "@/services/post.service";
import { create } from "zustand";

interface PostState {
  posts: PostResponse[];
  loading: boolean;
  error: string | null;

  fetchPosts: (params?: PostSearchParams) => Promise<void>;
}

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async (params) => {
    set({ loading: true, error: null });
    try {
      const { data: res } = await postService.getList(params);
      set({ posts: res.data, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch posts",
        loading: false,
      });
    }
  },
}));
