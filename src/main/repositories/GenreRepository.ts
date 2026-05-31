import { Prisma } from '@prisma/client';

import { prisma } from '../prismaClient';

export class GenreRepository {
  async getAll() {
    try {
      return await prisma.genre.findMany({
        include: {
          animeGenres: {
            include: {
              anime: true
            }
          }
        },
        orderBy: { name: 'asc' }
      });
    } catch (error) {
      console.error('GenreRepository.getAll failed', error);
      throw new Error('Impossible de récupérer les genres.');
    }
  }

  async getById(id: number) {
    try {
      return await prisma.genre.findUnique({
        where: { id },
        include: {
          animeGenres: {
            include: {
              anime: true
            }
          }
        }
      });
    } catch (error) {
      console.error('GenreRepository.getById failed', error);
      throw new Error(`Impossible de récupérer le genre ${id}.`);
    }
  }

  async create(data: Prisma.GenreCreateInput) {
    try {
      return await prisma.genre.create({ data });
    } catch (error) {
      console.error('GenreRepository.create failed', error);
      throw new Error('Impossible de créer le genre.');
    }
  }

  async update(id: number, data: Prisma.GenreUpdateInput) {
    try {
      return await prisma.genre.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('GenreRepository.update failed', error);
      throw new Error(`Impossible de modifier le genre ${id}.`);
    }
  }

  async delete(id: number) {
    try {
      return await prisma.genre.delete({
        where: { id }
      });
    } catch (error) {
      console.error('GenreRepository.delete failed', error);
      throw new Error(`Impossible de supprimer le genre ${id}.`);
    }
  }
}
