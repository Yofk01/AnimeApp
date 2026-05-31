import { prisma } from '../prismaClient';

export class StatsRepository {
  async getAll() {
    try {
      const [animeCount, studioCount, genreCount, userCount, reviewAverage] = await Promise.all([
        prisma.anime.count(),
        prisma.studio.count(),
        prisma.genre.count(),
        prisma.user.count(),
        prisma.review.aggregate({
          _avg: {
            rating: true
          }
        })
      ]);

      return {
        animeCount,
        studioCount,
        genreCount,
        userCount,
        averageRating: reviewAverage._avg.rating
      };
    } catch (error) {
      console.error('StatsRepository.getAll failed', error);
      throw new Error('Impossible de récupérer les statistiques.');
    }
  }

  async getById(animeId: number) {
    try {
      const [anime, episodeCount, reviewCount, reviewAverage] = await Promise.all([
        prisma.anime.findUnique({
          where: { id: animeId },
          select: {
            id: true,
            title: true
          }
        }),
        prisma.episode.count({
          where: { animeId }
        }),
        prisma.review.count({
          where: { animeId }
        }),
        prisma.review.aggregate({
          where: { animeId },
          _avg: {
            rating: true
          }
        })
      ]);

      return {
        anime,
        episodeCount,
        reviewCount,
        averageRating: reviewAverage._avg.rating
      };
    } catch (error) {
      console.error('StatsRepository.getById failed', error);
      throw new Error(`Impossible de récupérer les statistiques de l'anime ${animeId}.`);
    }
  }

  async create() {
    try {
      throw new Error('Les statistiques sont calculées et ne peuvent pas être créées.');
    } catch (error) {
      console.error('StatsRepository.create failed', error);
      throw error;
    }
  }

  async update() {
    try {
      throw new Error('Les statistiques sont calculées et ne peuvent pas être modifiées.');
    } catch (error) {
      console.error('StatsRepository.update failed', error);
      throw error;
    }
  }

  async delete() {
    try {
      throw new Error('Les statistiques sont calculées et ne peuvent pas être supprimées.');
    } catch (error) {
      console.error('StatsRepository.delete failed', error);
      throw error;
    }
  }
}
