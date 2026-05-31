import { inject, Injectable } from '@angular/core';

import { ElectronApiService } from './electron-api.service';
import { Studio } from './anime.types';

@Injectable({
  providedIn: 'root'
})
export class StudioService {
  private readonly electronApi = inject(ElectronApiService);

  async getAll(): Promise<Studio[]> {
    return await this.electronApi.api.studio.getAll<Studio[]>();
  }

  async create(data: Omit<Studio, 'id'>): Promise<Studio> {
    return await this.electronApi.api.studio.create<Studio>(data);
  }

  async update(id: number, data: Partial<Omit<Studio, 'id'>>): Promise<Studio> {
    return await this.electronApi.api.studio.update<Studio>(id, data);
  }

  async delete(id: number): Promise<Studio> {
    return await this.electronApi.api.studio.delete<Studio>(id);
  }
}
