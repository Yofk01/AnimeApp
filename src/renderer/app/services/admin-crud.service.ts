import { inject, Injectable } from '@angular/core';

import { CrudId, CrudTable } from './anime.types';
import { ElectronApiService } from './electron-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCrudService {
  private readonly electronApi = inject(ElectronApiService);

  async getAll(table: CrudTable): Promise<Record<string, unknown>[]> {
    return await this.electronApi.api.crud.getAll<Record<string, unknown>[]>(table);
  }

  async getById(table: CrudTable, id: CrudId): Promise<Record<string, unknown> | null> {
    return await this.electronApi.api.crud.getById<Record<string, unknown> | null>(table, id);
  }

  async create(table: CrudTable, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return await this.electronApi.api.crud.create<Record<string, unknown>>(table, data);
  }

  async update(table: CrudTable, id: CrudId, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return await this.electronApi.api.crud.update<Record<string, unknown>>(table, id, data);
  }

  async delete(table: CrudTable, id: CrudId): Promise<Record<string, unknown>> {
    return await this.electronApi.api.crud.delete<Record<string, unknown>>(table, id);
  }
}
