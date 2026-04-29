export interface GameResponse {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  thumbnailUrl: string;
  coverUrl: string;
  playUrl: string;
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  avgDurationMin: number;
  difficulty: string;
  status: string;
  publishedAt: string;
}

export interface GameDetailResponse extends GameResponse {
  categories: CategoryResponse[];
  providers: ProviderResponse[];
}

export interface CategoryResponse {
  id: string;
  slug: string;
  name: string;
  iconUrl: string;
  type: string;
}

export interface ProviderResponse {
  id: string;
  slug: string;
  name: string;
  iconUrl: string;
}

/** Query params for GET /api/v1/games */
export interface GameSearchParams {
  categorySlug?: string;
  search?: string;
  slug?: string;
}
