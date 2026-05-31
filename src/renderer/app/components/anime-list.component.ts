import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Anime } from '../services/anime.types';
import { AnimeService } from '../services/anime.service';
import { AnimeFormComponent } from './anime-form.component';

@Component({
  selector: 'app-anime-list',
  standalone: true,
  imports: [AnimeFormComponent, RouterLink],
  template: `
    <main class="page">
      <header>
        <h1>Animes</h1>
        <nav class="header-actions">
          <a class="nav-button" routerLink="/stats">Statistiques</a>
          <a class="nav-button secondary-link" routerLink="/admin">Infos anime</a>
        </nav>
      </header>

      <app-anime-form [anime]="selectedAnime()" (saved)="saveAnime($event)" />

      @if (loading()) {
        <p>Chargement...</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else {
        <p>{{ totalLabel() }}</p>

        <ul>
          @for (anime of animes(); track anime.id) {
            <li>
              <a [routerLink]="['/animes', anime.id]">{{ anime.title }}</a>
              @if (anime.releaseYear) {
                <span>({{ anime.releaseYear }})</span>
              }
              <button type="button" (click)="editAnime(anime)">Modifier</button>
              <button type="button" (click)="deleteAnime(anime.id)">Supprimer</button>
            </li>
          } @empty {
            <li>Aucun anime enregistré.</li>
          }
        </ul>
      }
    </main>
  `
})
export class AnimeListComponent {
  private readonly animeService = inject(AnimeService);

  readonly animes = signal<Anime[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly selectedAnime = signal<Anime | null>(null);
  readonly totalLabel = computed(() => `${this.animes().length} anime(s)`);

  constructor() {
    void this.loadAnimes();
  }

  async loadAnimes(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);
      this.animes.set(await this.animeService.getAll());
    } catch {
      this.error.set('Impossible de charger les animes.');
    } finally {
      this.loading.set(false);
    }
  }

  saveAnime(savedAnime: Anime): void {
    this.animes.update((animes) => {
      const exists = animes.some((anime) => anime.id === savedAnime.id);
      return exists
        ? animes.map((anime) => (anime.id === savedAnime.id ? savedAnime : anime))
        : [...animes, savedAnime];
    });
    this.selectedAnime.set(null);
  }

  editAnime(anime: Anime): void {
    this.selectedAnime.set(anime);
  }

  async deleteAnime(id: number): Promise<void> {
    try {
      await this.animeService.delete(id);
      this.animes.update((animes) => animes.filter((anime) => anime.id !== id));
    } catch {
      this.error.set("Impossible de supprimer l'anime.");
    }
  }
}
