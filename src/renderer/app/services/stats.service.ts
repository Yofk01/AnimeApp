import { inject, Injectable } from '@angular/core';

import { DashboardStats } from './anime.types';
import { ElectronApiService } from './electron-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private readonly electronApi = inject(ElectronApiService);

  async getDashboard(): Promise<DashboardStats> {
    return await this.electronApi.api.stats.getDashboard<DashboardStats>();
  }
}
