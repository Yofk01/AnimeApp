import { Prisma } from '@prisma/client';

import { prisma } from '../prismaClient';

export class StudioRepository {
  async getAll() {
    try {
      return await prisma.studio.findMany({
        include: {
          animes: true
        },
        orderBy: { name: 'asc' }
      });
    } catch (error) {
      console.error('StudioRepository.getAll failed', error);
      throw new Error('Impossible de récupérer les studios.');
    }
  }

  async getById(id: number) {
    try {
      return await prisma.studio.findUnique({
        where: { id },
        include: {
          animes: true
        }
      });
    } catch (error) {
      console.error('StudioRepository.getById failed', error);
      throw new Error(`Impossible de récupérer le studio ${id}.`);
    }
  }

  async create(data: Prisma.StudioCreateInput) {
    try {
      return await prisma.studio.create({ data });
    } catch (error) {
      console.error('StudioRepository.create failed', error);
      throw new Error('Impossible de créer le studio.');
    }
  }

  async update(id: number, data: Prisma.StudioUpdateInput) {
    try {
      return await prisma.studio.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('StudioRepository.update failed', error);
      throw new Error(`Impossible de modifier le studio ${id}.`);
    }
  }

  async delete(id: number) {
    try {
      return await prisma.studio.delete({
        where: { id }
      });
    } catch (error) {
      console.error('StudioRepository.delete failed', error);
      throw new Error(`Impossible de supprimer le studio ${id}.`);
    }
  }
}
