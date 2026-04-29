export interface PostResponse {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  thumbnailUrl: string;
  authorName: string;
  status: string;
  publishedAt: string;
}

/** Query params for GET /api/v1/posts */
export interface PostSearchParams {
  categorySlug?: string;
  slug?: string;
}
