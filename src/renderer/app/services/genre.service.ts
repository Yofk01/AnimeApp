import { inject, Injectable } from '@angular/core';

import { ElectronApiService } from './electron-api.service';
import { Genre } from './anime.types';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly electronApi = inject(ElectronApiService);

  async getAll(): Promise<Genre[]> {
    return await this.electronApi.api.genre.getAll<Genre[]>();
  }

  async create(data: Pick<Genre, 'name'>): Promise<Genre> {
    return await this.electronApi.api.genre.create<Genre>(data);
  }

  async update(id: number, data: Partial<Pick<Genre, 'name'>>): Promise<Genre> {
    return await this.electronApi.api.genre.update<Genre>(id, data);
  }

  async delete(id: number): Promise<Genre> {
    return await this.electronApi.api.genre.delete<Genre>(id);
  }
}
