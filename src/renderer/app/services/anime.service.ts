import { inject, Injectable } from '@angular/core';

import { Anime, AnimeCreateInput } from './anime.types';
import { ElectronApiService } from './electron-api.service';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private readonly electronApi = inject(ElectronApiService);

  async getAll(): Promise<Anime[]> {
    return await this.electronApi.api.anime.getAll<Anime[]>();
  }

  async getById(id: number): Promise<Anime | null> {
    return await this.electronApi.api.anime.getById<Anime | null>(id);
  }

  async create(data: AnimeCreateInput): Promise<Anime> {
    return await this.electronApi.api.anime.create<Anime>(data);
  }

  async update(id: number, data: Partial<AnimeCreateInput>): Promise<Anime> {
    return await this.electronApi.api.anime.update<Anime>(id, data);
  }

  async delete(id: number): Promise<Anime> {
    return await this.electronApi.api.anime.delete<Anime>(id);
  }
}
