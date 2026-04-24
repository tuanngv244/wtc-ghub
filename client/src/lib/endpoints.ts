export const endpoints = {
  games: {
    list: "/api/games",
    detail: (slug: string) => `/api/games/${slug}`,
    featured: "/api/games/featured",
    topPicked: "/api/games/top-picked",
    recent: "/api/games/recent",
  },
  categories: {
    list: "/api/categories",
    games: (cat: string) => `/api/categories/${cat}/games`,
  },
  blog: {
    list: "/api/blog",
    detail: (slug: string) => `/api/blog/${slug}`,
  },
} as const;
