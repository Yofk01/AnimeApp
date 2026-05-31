import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Anime } from '../services/anime.types';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="page">
      <a routerLink="/animes">Retour</a>

      @if (loading()) {
        <p>Chargement...</p>
      } @else if (error()) {
        <p class="error">{{ error() }}</p>
      } @else if (anime()) {
        <article class="card">
          <h1>{{ anime()?.title }}</h1>
          <p>{{ anime()?.description || 'Aucune description.' }}</p>
          <p>Studio : {{ anime()?.studio?.name || 'Non renseigné' }}</p>
          <p>{{ ratingLabel() }}</p>

          <h2>Genres</h2>
          <ul>
            @for (genre of anime()?.genres ?? []; track genre.id) {
              <li>{{ genre.name }}</li>
            } @empty {
              <li>Aucun genre.</li>
            }
          </ul>

          <h2>Personnages</h2>
          <ul>
            @for (character of anime()?.characters ?? []; track character.id) {
              <li>{{ character.name }}</li>
            } @empty {
              <li>Aucun personnage.</li>
            }
          </ul>
        </article>
      }
    </main>
  `
})
export class AnimeDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly animeService = inject(AnimeService);

  readonly anime = signal<Anime | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly ratingLabel = computed(() => {
    const reviews = this.anime()?.reviews ?? [];
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = reviews.length > 0 ? total / reviews.length : null;

    return average === null ? 'Aucune note.' : `Note moyenne : ${average.toFixed(1)}/10`;
  });

  constructor() {
    void this.loadAnime();
  }

  async loadAnime(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id)) {
      this.error.set('Identifiant invalide.');
      this.loading.set(false);
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);
      this.anime.set(await this.animeService.getById(id));
    } catch {
      this.error.set("Impossible de charger l'anime.");
    } finally {
      this.loading.set(false);
    }
  }
}
