import { ipcMain } from 'electron';
import { Prisma } from '@prisma/client';

import {
  AdminCrudRepository,
  AnimeRepository,
  CrudTable,
  GenreRepository,
  StatsRepository,
  StudioRepository
} from '../repositories';

const adminCrudRepository = new AdminCrudRepository();
const animeRepository = new AnimeRepository();
const genreRepository = new GenreRepository();
const studioRepository = new StudioRepository();
const statsRepository = new StatsRepository();

type IdPayload = {
  id: number;
};

type CrudIdPayload = {
  table: CrudTable;
  id: number | { animeId: number; genreId: number };
};

type CrudDataPayload = {
  table: CrudTable;
  data: Record<string, unknown>;
};

type CrudUpdatePayload = CrudIdPayload & {
  data: Record<string, unknown>;
};

type UpdatePayload<TData> = {
  id: number;
  data: TData;
};

const crudTables: readonly CrudTable[] = [
  'anime',
  'studio',
  'genre',
  'animeGenre',
  'season',
  'episode',
  'character',
  'user',
  'watchlistEntry',
  'review'
];

function assertIdPayload(payload: unknown): asserts payload is IdPayload {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('id' in payload) ||
    typeof payload.id !== 'number'
  ) {
    throw new Error('Payload invalide: id numérique requis.');
  }
}

function assertCreatePayload<TData>(payload: unknown): asserts payload is TData {
  if (typeof payload !== 'object' || payload === null) {
    throw new Error('Payload invalide: objet requis.');
  }
}

function assertUpdatePayload<TData>(payload: unknown): asserts payload is UpdatePayload<TData> {
  if (
    typeof payload !== 'object' ||
    payload === null ||
    !('id' in payload) ||
    typeof payload.id !== 'number' ||
    !('data' in payload) ||
    typeof payload.data !== 'object' ||
    payload.data === null
  ) {
    throw new Error('Payload invalide: id numérique et data objet requis.');
  }
}

function assertCrudTable(value: unknown): asserts value is CrudTable {
  if (typeof value !== 'string' || !crudTables.includes(value as CrudTable)) {
    throw new Error('Table CRUD invalide.');
  }
}

function assertRecord(value: unknown): asserts value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error('Objet requis.');
  }
}

function assertCrudIdPayload(payload: unknown): asserts payload is CrudIdPayload {
  if (typeof payload !== 'object' || payload === null || !('table' in payload) || !('id' in payload)) {
    throw new Error('Payload CRUD invalide.');
  }

  assertCrudTable(payload.table);

  if (typeof payload.id === 'number') {
    return;
  }

  if (
    typeof payload.id === 'object' &&
    payload.id !== null &&
    'animeId' in payload.id &&
    'genreId' in payload.id &&
    typeof payload.id.animeId === 'number' &&
    typeof payload.id.genreId === 'number'
  ) {
    return;
  }

  throw new Error('Identifiant CRUD invalide.');
}

function assertCrudDataPayload(payload: unknown): asserts payload is CrudDataPayload {
  if (typeof payload !== 'object' || payload === null || !('table' in payload) || !('data' in payload)) {
    throw new Error('Payload CRUD invalide.');
  }

  assertCrudTable(payload.table);
  assertRecord(payload.data);
}

function assertCrudUpdatePayload(payload: unknown): asserts payload is CrudUpdatePayload {
  assertCrudIdPayload(payload);

  if (!('data' in payload)) {
    throw new Error('Payload CRUD invalide.');
  }

  assertRecord(payload.data);
}

export function registerIpcHandlers(): void {
  ipcMain.handle('anime:getAll', async () => {
    try {
      return await animeRepository.getAll();
    } catch (error) {
      console.error('IPC anime:getAll failed', error);
      throw error;
    }
  });

  ipcMain.handle('anime:getById', async (_event, payload: unknown) => {
    try {
      assertIdPayload(payload);
      return await animeRepository.getById(payload.id);
    } catch (error) {
      console.error('IPC anime:getById failed', error);
      throw error;
    }
  });

  ipcMain.handle('anime:create', async (_event, payload: unknown) => {
    try {
      assertCreatePayload<Prisma.AnimeCreateInput>(payload);
      return await animeRepository.create(payload);
    } catch (error) {
      console.error('IPC anime:create failed', error);
      throw error;
    }
  });

  ipcMain.handle('anime:update', async (_event, payload: unknown) => {
    try {
      assertUpdatePayload<Prisma.AnimeUpdateInput>(payload);
      return await animeRepository.update(payload.id, payload.data);
    } catch (error) {
      console.error('IPC anime:update failed', error);
      throw error;
    }
  });

  ipcMain.handle('anime:delete', async (_event, payload: unknown) => {
    try {
      assertIdPayload(payload);
      return await animeRepository.delete(payload.id);
    } catch (error) {
      console.error('IPC anime:delete failed', error);
      throw error;
    }
  });

  ipcMain.handle('genre:getAll', async () => {
    try {
      return await genreRepository.getAll();
    } catch (error) {
      console.error('IPC genre:getAll failed', error);
      throw error;
    }
  });

  ipcMain.handle('genre:create', async (_event, payload: unknown) => {
    try {
      assertCreatePayload<Prisma.GenreCreateInput>(payload);
      return await genreRepository.create(payload);
    } catch (error) {
      console.error('IPC genre:create failed', error);
      throw error;
    }
  });

  ipcMain.handle('genre:update', async (_event, payload: unknown) => {
    try {
      assertUpdatePayload<Prisma.GenreUpdateInput>(payload);
      return await genreRepository.update(payload.id, payload.data);
    } catch (error) {
      console.error('IPC genre:update failed', error);
      throw error;
    }
  });

  ipcMain.handle('genre:delete', async (_event, payload: unknown) => {
    try {
      assertIdPayload(payload);
      return await genreRepository.delete(payload.id);
    } catch (error) {
      console.error('IPC genre:delete failed', error);
      throw error;
    }
  });

  ipcMain.handle('studio:getAll', async () => {
    try {
      return await studioRepository.getAll();
    } catch (error) {
      console.error('IPC studio:getAll failed', error);
      throw error;
    }
  });

  ipcMain.handle('studio:create', async (_event, payload: unknown) => {
    try {
      assertCreatePayload<Prisma.StudioCreateInput>(payload);
      return await studioRepository.create(payload);
    } catch (error) {
      console.error('IPC studio:create failed', error);
      throw error;
    }
  });

  ipcMain.handle('studio:update', async (_event, payload: unknown) => {
    try {
      assertUpdatePayload<Prisma.StudioUpdateInput>(payload);
      return await studioRepository.update(payload.id, payload.data);
    } catch (error) {
      console.error('IPC studio:update failed', error);
      throw error;
    }
  });

  ipcMain.handle('studio:delete', async (_event, payload: unknown) => {
    try {
      assertIdPayload(payload);
      return await studioRepository.delete(payload.id);
    } catch (error) {
      console.error('IPC studio:delete failed', error);
      throw error;
    }
  });

  ipcMain.handle('stats:getDashboard', async () => {
    try {
      return await statsRepository.getAll();
    } catch (error) {
      console.error('IPC stats:getDashboard failed', error);
      throw error;
    }
  });

  ipcMain.handle('crud:getAll', async (_event, payload: unknown) => {
    try {
      assertCrudTable(payload);
      return await adminCrudRepository.getAll(payload);
    } catch (error) {
      console.error('IPC crud:getAll failed', error);
      throw error;
    }
  });

  ipcMain.handle('crud:getById', async (_event, payload: unknown) => {
    try {
      assertCrudIdPayload(payload);
      return await adminCrudRepository.getById(payload.table, payload.id);
    } catch (error) {
      console.error('IPC crud:getById failed', error);
      throw error;
    }
  });

  ipcMain.handle('crud:create', async (_event, payload: unknown) => {
    try {
      assertCrudDataPayload(payload);
      return await adminCrudRepository.create(payload.table, payload.data);
    } catch (error) {
      console.error('IPC crud:create failed', error);
      throw error;
    }
  });

  ipcMain.handle('crud:update', async (_event, payload: unknown) => {
    try {
      assertCrudUpdatePayload(payload);
      return await adminCrudRepository.update(payload.table, payload.id, payload.data);
    } catch (error) {
      console.error('IPC crud:update failed', error);
      throw error;
    }
  });

  ipcMain.handle('crud:delete', async (_event, payload: unknown) => {
    try {
      assertCrudIdPayload(payload);
      return await adminCrudRepository.delete(payload.table, payload.id);
    } catch (error) {
      console.error('IPC crud:delete failed', error);
      throw error;
    }
  });
}
