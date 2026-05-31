export type Studio = {
  id: number;
  name: string;
  country?: string | null;
};

export type Genre = {
  id: number;
  name: string;
};

export type Character = {
  id: number;
  name: string;
  role?: string | null;
  voiceActor?: string | null;
};

export type Review = {
  id: number;
  rating: number;
  comment?: string | null;
};

export type Anime = {
  id: number;
  title: string;
  description?: string | null;
  releaseYear?: number | null;
  status: string;
  studio?: Studio | null;
  genres: Genre[];
  characters: Character[];
  reviews: Review[];
};

export type AnimeCreateInput = {
  title: string;
  description?: string;
  releaseYear?: number;
  studio?: {
    connect: {
      id: number;
    };
  };
};

export type DashboardStats = {
  animeCount: number;
  studioCount: number;
  genreCount: number;
  userCount: number;
  averageRating: number | null;
};

export type CrudTable =
  | 'anime'
  | 'studio'
  | 'genre'
  | 'animeGenre'
  | 'season'
  | 'episode'
  | 'character'
  | 'user'
  | 'watchlistEntry'
  | 'review';

export type CrudId = number | { animeId: number; genreId: number };
