export const endpoints = {
  games: {
    list: "/portal/games",
    detail: (id: string) => `/games/${id}`,
  },
  categories: {
    list: "/portal/categories",
  },
  posts: {
    list: "/portal/posts",
  },
  sections: {
    list: "/portal/sections",
  },
} as const;
