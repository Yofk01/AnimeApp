import { Prisma } from '@prisma/client';

import { prisma } from '../prismaClient';

const animeInclude = {
  studio: true,
  animeGenres: {
    include: {
      genre: true
    }
  },
  characters: true,
  reviews: true
} satisfies Prisma.AnimeInclude;

type AnimeWithRelations = Prisma.AnimeGetPayload<{
  include: typeof animeInclude;
}>;

function formatAnime(anime: AnimeWithRelations) {
  const { animeGenres, ...animeData } = anime;

  return {
    ...animeData,
    genres: animeGenres.map((animeGenre) => animeGenre.genre)
  };
}

export class AnimeRepository {
  async getAll() {
    try {
      const animes = await prisma.anime.findMany({
        include: animeInclude,
        orderBy: { title: 'asc' }
      });

      return animes.map(formatAnime);
    } catch (error) {
      console.error('AnimeRepository.getAll failed', error);
      throw new Error('Impossible de récupérer les animes.');
    }
  }

  async getById(id: number) {
    try {
      const anime = await prisma.anime.findUnique({
        where: { id },
        include: animeInclude
      });

      return anime ? formatAnime(anime) : null;
    } catch (error) {
      console.error('AnimeRepository.getById failed', error);
      throw new Error(`Impossible de récupérer l'anime ${id}.`);
    }
  }

  async create(data: Prisma.AnimeCreateInput) {
    try {
      const anime = await prisma.anime.create({
        data,
        include: animeInclude
      });

      return formatAnime(anime);
    } catch (error) {
      console.error('AnimeRepository.create failed', error);
      throw new Error("Impossible de créer l'anime.");
    }
  }

  async update(id: number, data: Prisma.AnimeUpdateInput) {
    try {
      const anime = await prisma.anime.update({
        where: { id },
        data,
        include: animeInclude
      });

      return formatAnime(anime);
    } catch (error) {
      console.error('AnimeRepository.update failed', error);
      throw new Error(`Impossible de modifier l'anime ${id}.`);
    }
  }

  async delete(id: number) {
    try {
      const anime = await prisma.anime.delete({
        where: { id },
        include: animeInclude
      });

      return formatAnime(anime);
    } catch (error) {
      console.error('AnimeRepository.delete failed', error);
      throw new Error(`Impossible de supprimer l'anime ${id}.`);
    }
  }
}
