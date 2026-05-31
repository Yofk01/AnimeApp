import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { DashboardStats } from '../services/anime.types';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="page">
      <a routerLink="/animes">Retour aux animes</a>
      <h1>Statistiques</h1>

      @if (loading()) {
        <p>Chargement...</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else if (stats()) {
        <section class="card">
          <p>Animes : {{ stats()?.animeCount }}</p>
          <p>Studios : {{ stats()?.studioCount }}</p>
          <p>Genres : {{ stats()?.genreCount }}</p>
          <p>Utilisateurs : {{ stats()?.userCount }}</p>
          <p>{{ averageLabel() }}</p>
        </section>
      }
    </main>
  `
})
export class StatsComponent {
  private readonly statsService = inject(StatsService);

  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly averageLabel = computed(() => {
    const average = this.stats()?.averageRating;
    return average === null || average === undefined
      ? 'Note moyenne : aucune note'
      : `Note moyenne : ${average.toFixed(1)}/10`;
  });

  constructor() {
    void this.loadStats();
  }

  async loadStats(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);
      this.stats.set(await this.statsService.getDashboard());
    } catch {
      this.error.set('Impossible de charger les statistiques.');
    } finally {
      this.loading.set(false);
    }
  }
}
