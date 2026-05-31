import { Prisma } from '@prisma/client';

import { prisma } from '../prismaClient';

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

type CrudId = number | { animeId: number; genreId: number };

export class AdminCrudRepository {
  async getAll(table: CrudTable) {
    try {
      switch (table) {
        case 'anime':
          return await prisma.anime.findMany({ orderBy: { id: 'asc' } });
        case 'studio':
          return await prisma.studio.findMany({ orderBy: { id: 'asc' } });
        case 'genre':
          return await prisma.genre.findMany({ orderBy: { id: 'asc' } });
        case 'animeGenre':
          return await prisma.animeGenre.findMany({ orderBy: [{ animeId: 'asc' }, { genreId: 'asc' }] });
        case 'season':
          return await prisma.season.findMany({ orderBy: { id: 'asc' } });
        case 'episode':
          return await prisma.episode.findMany({ orderBy: { id: 'asc' } });
        case 'character':
          return await prisma.character.findMany({ orderBy: { id: 'asc' } });
        case 'user':
          return await prisma.user.findMany({ orderBy: { id: 'asc' } });
        case 'watchlistEntry':
          return await prisma.watchlistEntry.findMany({ orderBy: { id: 'asc' } });
        case 'review':
          return await prisma.review.findMany({ orderBy: { id: 'asc' } });
      }
    } catch (error) {
      console.error('AdminCrudRepository.getAll failed', error);
      throw new Error(`Impossible de récupérer la table ${table}.`);
    }
  }

  async getById(table: CrudTable, id: CrudId) {
    try {
      switch (table) {
        case 'anime':
          return await prisma.anime.findUnique({ where: { id: this.numericId(id) } });
        case 'studio':
          return await prisma.studio.findUnique({ where: { id: this.numericId(id) } });
        case 'genre':
          return await prisma.genre.findUnique({ where: { id: this.numericId(id) } });
        case 'animeGenre':
          return await prisma.animeGenre.findUnique({ where: { animeId_genreId: this.compositeId(id) } });
        case 'season':
          return await prisma.season.findUnique({ where: { id: this.numericId(id) } });
        case 'episode':
          return await prisma.episode.findUnique({ where: { id: this.numericId(id) } });
        case 'character':
          return await prisma.character.findUnique({ where: { id: this.numericId(id) } });
        case 'user':
          return await prisma.user.findUnique({ where: { id: this.numericId(id) } });
        case 'watchlistEntry':
          return await prisma.watchlistEntry.findUnique({ where: { id: this.numericId(id) } });
        case 'review':
          return await prisma.review.findUnique({ where: { id: this.numericId(id) } });
      }
    } catch (error) {
      console.error('AdminCrudRepository.getById failed', error);
      throw new Error(`Impossible de récupérer un enregistrement ${table}.`);
    }
  }

  async create(table: CrudTable, data: Record<string, unknown>) {
    try {
      switch (table) {
        case 'anime':
          return await prisma.anime.create({ data: data as Prisma.AnimeCreateInput });
        case 'studio':
          return await prisma.studio.create({ data: data as Prisma.StudioCreateInput });
        case 'genre':
          return await prisma.genre.create({ data: data as Prisma.GenreCreateInput });
        case 'animeGenre':
          return await prisma.animeGenre.create({ data: data as Prisma.AnimeGenreCreateInput });
        case 'season':
          return await prisma.season.create({ data: data as Prisma.SeasonCreateInput });
        case 'episode':
          return await prisma.episode.create({ data: data as Prisma.EpisodeCreateInput });
        case 'character':
          return await prisma.character.create({ data: data as Prisma.CharacterCreateInput });
        case 'user':
          return await prisma.user.create({ data: data as Prisma.UserCreateInput });
        case 'watchlistEntry':
          return await prisma.watchlistEntry.create({ data: data as Prisma.WatchlistEntryCreateInput });
        case 'review':
          return await prisma.review.create({ data: data as Prisma.ReviewCreateInput });
      }
    } catch (error) {
      console.error('AdminCrudRepository.create failed', error);
      throw new Error(`Impossible de créer un enregistrement ${table}.`);
    }
  }

  async update(table: CrudTable, id: CrudId, data: Record<string, unknown>) {
    try {
      switch (table) {
        case 'anime':
          return await prisma.anime.update({ where: { id: this.numericId(id) }, data: data as Prisma.AnimeUpdateInput });
        case 'studio':
          return await prisma.studio.update({ where: { id: this.numericId(id) }, data: data as Prisma.StudioUpdateInput });
        case 'genre':
          return await prisma.genre.update({ where: { id: this.numericId(id) }, data: data as Prisma.GenreUpdateInput });
        case 'animeGenre':
          return await prisma.animeGenre.update({ where: { animeId_genreId: this.compositeId(id) }, data: data as Prisma.AnimeGenreUpdateInput });
        case 'season':
          return await prisma.season.update({ where: { id: this.numericId(id) }, data: data as Prisma.SeasonUpdateInput });
        case 'episode':
          return await prisma.episode.update({ where: { id: this.numericId(id) }, data: data as Prisma.EpisodeUpdateInput });
        case 'character':
          return await prisma.character.update({ where: { id: this.numericId(id) }, data: data as Prisma.CharacterUpdateInput });
        case 'user':
          return await prisma.user.update({ where: { id: this.numericId(id) }, data: data as Prisma.UserUpdateInput });
        case 'watchlistEntry':
          return await prisma.watchlistEntry.update({ where: { id: this.numericId(id) }, data: data as Prisma.WatchlistEntryUpdateInput });
        case 'review':
          return await prisma.review.update({ where: { id: this.numericId(id) }, data: data as Prisma.ReviewUpdateInput });
      }
    } catch (error) {
      console.error('AdminCrudRepository.update failed', error);
      throw new Error(`Impossible de modifier un enregistrement ${table}.`);
    }
  }

  async delete(table: CrudTable, id: CrudId) {
    try {
      switch (table) {
        case 'anime':
          return await prisma.anime.delete({ where: { id: this.numericId(id) } });
        case 'studio':
          return await prisma.studio.delete({ where: { id: this.numericId(id) } });
        case 'genre':
          return await prisma.genre.delete({ where: { id: this.numericId(id) } });
        case 'animeGenre':
          return await prisma.animeGenre.delete({ where: { animeId_genreId: this.compositeId(id) } });
        case 'season':
          return await prisma.season.delete({ where: { id: this.numericId(id) } });
        case 'episode':
          return await prisma.episode.delete({ where: { id: this.numericId(id) } });
        case 'character':
          return await prisma.character.delete({ where: { id: this.numericId(id) } });
        case 'user':
          return await prisma.user.delete({ where: { id: this.numericId(id) } });
        case 'watchlistEntry':
          return await prisma.watchlistEntry.delete({ where: { id: this.numericId(id) } });
        case 'review':
          return await prisma.review.delete({ where: { id: this.numericId(id) } });
      }
    } catch (error) {
      console.error('AdminCrudRepository.delete failed', error);
      throw new Error(`Impossible de supprimer un enregistrement ${table}.`);
    }
  }

  private numericId(id: CrudId): number {
    if (typeof id !== 'number') {
      throw new Error('Identifiant numérique requis.');
    }

    return id;
  }

  private compositeId(id: CrudId): { animeId: number; genreId: number } {
    if (typeof id === 'number') {
      throw new Error('Identifiant composite requis.');
    }

    return id;
  }
}
