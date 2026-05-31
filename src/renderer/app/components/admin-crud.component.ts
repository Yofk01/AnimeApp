import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AdminCrudService } from '../services/admin-crud.service';
import { Anime, Character, Genre, Studio } from '../services/anime.types';
import { AnimeService } from '../services/anime.service';
import { GenreService } from '../services/genre.service';
import { StudioService } from '../services/studio.service';

type EpisodeRecord = {
  id: number;
  episodeNumber: number;
  title: string;
  durationMin?: number | null;
  animeId: number;
};

@Component({
  selector: 'app-admin-crud',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <main class="page admin-page">
      <header class="hero">
        <div>
          <a routerLink="/animes">← Retour aux animes</a>
          <h1>Infos anime</h1>
          <p>Ajoute les genres, studios, personnages, épisodes et liens entre animes et genres.</p>
        </div>
      </header>

      @if (message()) {
        <p class="success">{{ message() }}</p>
      }

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }

      <section class="admin-grid">
        <article class="card accent-card">
          <h2>Genres</h2>
          <form [formGroup]="genreForm" (ngSubmit)="saveGenre()">
            <input type="hidden" formControlName="id" />
            <label>
              Nom
              <input type="text" formControlName="name" placeholder="Action" />
            </label>
            <button type="submit">{{ genreForm.controls.id.value ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" class="secondary" (click)="genreForm.reset()">Nouveau</button>
          </form>

          <ul class="compact-list">
            @for (genre of genres(); track genre.id) {
              <li>
                <span>{{ genre.name }}</span>
                <span>
                  <button type="button" class="secondary" (click)="editGenre(genre)">Éditer</button>
                  <button type="button" class="danger" (click)="deleteGenre(genre.id)">Supprimer</button>
                </span>
              </li>
            } @empty {
              <li>Aucun genre.</li>
            }
          </ul>
        </article>

        <article class="card accent-card">
          <h2>Studios</h2>
          <form [formGroup]="studioForm" (ngSubmit)="saveStudio()">
            <input type="hidden" formControlName="id" />
            <label>
              Nom
              <input type="text" formControlName="name" placeholder="Madhouse" />
            </label>
            <label>
              Pays
              <input type="text" formControlName="country" placeholder="Japan" />
            </label>
            <button type="submit">{{ studioForm.controls.id.value ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" class="secondary" (click)="studioForm.reset()">Nouveau</button>
          </form>

          <ul class="compact-list">
            @for (studio of studios(); track studio.id) {
              <li>
                <span>{{ studio.name }} @if (studio.country) { <small>({{ studio.country }})</small> }</span>
                <span>
                  <button type="button" class="secondary" (click)="editStudio(studio)">Éditer</button>
                  <button type="button" class="danger" (click)="deleteStudio(studio.id)">Supprimer</button>
                </span>
              </li>
            } @empty {
              <li>Aucun studio.</li>
            }
          </ul>
        </article>

        <article class="card accent-card">
          <h2>Personnages</h2>
          <form [formGroup]="characterForm" (ngSubmit)="saveCharacter()">
            <input type="hidden" formControlName="id" />
            <label>
              Anime
              <select formControlName="animeId">
                @for (anime of animes(); track anime.id) {
                  <option [value]="anime.id">{{ anime.title }}</option>
                }
              </select>
            </label>
            <label>
              Nom
              <input type="text" formControlName="name" placeholder="Eren Yeager" />
            </label>
            <label>
              Rôle
              <input type="text" formControlName="role" placeholder="Main character" />
            </label>
            <label>
              Doubleur
              <input type="text" formControlName="voiceActor" placeholder="Yuki Kaji" />
            </label>
            <button type="submit">{{ characterForm.controls.id.value ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" class="secondary" (click)="characterForm.reset()">Nouveau</button>
          </form>
        </article>

        <article class="card accent-card">
          <h2>Épisodes</h2>
          <form [formGroup]="episodeForm" (ngSubmit)="saveEpisode()">
            <input type="hidden" formControlName="id" />
            <label>
              Anime
              <select formControlName="animeId">
                @for (anime of animes(); track anime.id) {
                  <option [value]="anime.id">{{ anime.title }}</option>
                }
              </select>
            </label>
            <label>
              Numéro
              <input type="number" formControlName="episodeNumber" />
            </label>
            <label>
              Titre
              <input type="text" formControlName="title" />
            </label>
            <label>
              Durée en minutes
              <input type="number" formControlName="durationMin" />
            </label>
            <button type="submit">{{ episodeForm.controls.id.value ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" class="secondary" (click)="episodeForm.reset()">Nouveau</button>
          </form>
        </article>

        <article class="card accent-card">
          <h2>Lier un genre à un anime</h2>
          <form [formGroup]="animeGenreForm" (ngSubmit)="saveAnimeGenre()">
            <label>
              Anime
              <select formControlName="animeId">
                @for (anime of animes(); track anime.id) {
                  <option [value]="anime.id">{{ anime.title }}</option>
                }
              </select>
            </label>
            <label>
              Genre
              <select formControlName="genreId">
                @for (genre of genres(); track genre.id) {
                  <option [value]="genre.id">{{ genre.name }}</option>
                }
              </select>
            </label>
            <button type="submit">Ajouter le lien</button>
          </form>
        </article>

        <article class="card accent-card">
          <h2>Résumé</h2>
          <p>{{ summary() }}</p>
          <button type="button" class="secondary" (click)="loadData()">Rafraîchir</button>
        </article>
      </section>

      <section class="card">
        <h2>Personnages enregistrés</h2>
        <ul class="compact-list">
          @for (character of characters(); track character.id) {
            <li>
              <span>{{ character.name }} <small>{{ character.role }}</small></span>
              <span>
                <button type="button" class="secondary" (click)="editCharacter(character)">Éditer</button>
                <button type="button" class="danger" (click)="deleteCharacter(character.id)">Supprimer</button>
              </span>
            </li>
          } @empty {
            <li>Aucun personnage.</li>
          }
        </ul>
      </section>

      <section class="card">
        <h2>Épisodes enregistrés</h2>
        <ul class="compact-list">
          @for (episode of episodes(); track episode.id) {
            <li>
              <span>#{{ episode.episodeNumber }} — {{ episode.title }}</span>
              <span>
                <button type="button" class="secondary" (click)="editEpisode(episode)">Éditer</button>
                <button type="button" class="danger" (click)="deleteEpisode(episode.id)">Supprimer</button>
              </span>
            </li>
          } @empty {
            <li>Aucun épisode.</li>
          }
        </ul>
      </section>
    </main>
  `
})
export class AdminCrudComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly animeService = inject(AnimeService);
  private readonly genreService = inject(GenreService);
  private readonly studioService = inject(StudioService);
  private readonly adminCrudService = inject(AdminCrudService);

  readonly animes = signal<Anime[]>([]);
  readonly genres = signal<Genre[]>([]);
  readonly studios = signal<Studio[]>([]);
  readonly characters = signal<Character[]>([]);
  readonly episodes = signal<EpisodeRecord[]>([]);
  readonly message = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly summary = computed(
    () =>
      `${this.animes().length} animes, ${this.genres().length} genres, ${this.studios().length} studios, ${this.characters().length} personnages, ${this.episodes().length} épisodes`
  );

  readonly genreForm = this.formBuilder.nonNullable.group({
    id: this.formBuilder.control<number | null>(null),
    name: ['', Validators.required]
  });

  readonly studioForm = this.formBuilder.nonNullable.group({
    id: this.formBuilder.control<number | null>(null),
    name: ['', Validators.required],
    country: ['']
  });

  readonly characterForm = this.formBuilder.nonNullable.group({
    id: this.formBuilder.control<number | null>(null),
    animeId: this.formBuilder.control<number | null>(null, Validators.required),
    name: ['', Validators.required],
    role: [''],
    voiceActor: ['']
  });

  readonly episodeForm = this.formBuilder.nonNullable.group({
    id: this.formBuilder.control<number | null>(null),
    animeId: this.formBuilder.control<number | null>(null, Validators.required),
    episodeNumber: [1, Validators.required],
    title: ['', Validators.required],
    durationMin: this.formBuilder.control<number | null>(null)
  });

  readonly animeGenreForm = this.formBuilder.nonNullable.group({
    animeId: this.formBuilder.control<number | null>(null, Validators.required),
    genreId: this.formBuilder.control<number | null>(null, Validators.required)
  });

  constructor() {
    void this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.error.set(null);
      const [animes, genres, studios, characters, episodes] = await Promise.all([
        this.animeService.getAll(),
        this.genreService.getAll(),
        this.studioService.getAll(),
        this.adminCrudService.getAll('character'),
        this.adminCrudService.getAll('episode')
      ]);

      this.animes.set(animes);
      this.genres.set(genres);
      this.studios.set(studios);
      this.characters.set(characters as Character[]);
      this.episodes.set(episodes as EpisodeRecord[]);
      this.setDefaultSelects();
    } catch {
      this.error.set('Impossible de charger les données.');
    }
  }

  async saveGenre(): Promise<void> {
    try {
      const value = this.genreForm.getRawValue();

      if (value.id) {
        await this.genreService.update(value.id, { name: value.name });
      } else {
        await this.genreService.create({ name: value.name });
      }

      this.genreForm.reset();
      await this.afterSave('Genre enregistré.');
    } catch {
      this.error.set('Impossible de sauvegarder le genre.');
    }
  }

  editGenre(genre: Genre): void {
    this.genreForm.setValue({ id: genre.id, name: genre.name });
  }

  async deleteGenre(id: number): Promise<void> {
    try {
      await this.genreService.delete(id);
      await this.afterSave('Genre supprimé.');
    } catch {
      this.error.set('Impossible de supprimer le genre.');
    }
  }

  async saveStudio(): Promise<void> {
    try {
      const value = this.studioForm.getRawValue();
      const payload = { name: value.name, country: value.country || null };

      if (value.id) {
        await this.studioService.update(value.id, payload);
      } else {
        await this.studioService.create(payload);
      }

      this.studioForm.reset();
      await this.afterSave('Studio enregistré.');
    } catch {
      this.error.set('Impossible de sauvegarder le studio.');
    }
  }

  editStudio(studio: Studio): void {
    this.studioForm.setValue({
      id: studio.id,
      name: studio.name,
      country: studio.country ?? ''
    });
  }

  async deleteStudio(id: number): Promise<void> {
    try {
      await this.studioService.delete(id);
      await this.afterSave('Studio supprimé.');
    } catch {
      this.error.set('Impossible de supprimer le studio.');
    }
  }

  async saveCharacter(): Promise<void> {
    try {
      const value = this.characterForm.getRawValue();
      const payload = {
        name: value.name,
        role: value.role || null,
        voiceActor: value.voiceActor || null,
        anime: { connect: { id: Number(value.animeId) } }
      };

      if (value.id) {
        await this.adminCrudService.update('character', value.id, payload);
      } else {
        await this.adminCrudService.create('character', payload);
      }

      this.characterForm.reset();
      await this.afterSave('Personnage enregistré.');
    } catch {
      this.error.set('Impossible de sauvegarder le personnage.');
    }
  }

  editCharacter(character: Character): void {
    const rawCharacter = character as Character & { animeId?: number };

    this.characterForm.setValue({
      id: character.id,
      animeId: rawCharacter.animeId ?? this.animes()[0]?.id ?? null,
      name: character.name,
      role: character.role ?? '',
      voiceActor: character.voiceActor ?? ''
    });
  }

  async deleteCharacter(id: number): Promise<void> {
    try {
      await this.adminCrudService.delete('character', id);
      await this.afterSave('Personnage supprimé.');
    } catch {
      this.error.set('Impossible de supprimer le personnage.');
    }
  }

  async saveEpisode(): Promise<void> {
    try {
      const value = this.episodeForm.getRawValue();
      const payload = {
        episodeNumber: Number(value.episodeNumber),
        title: value.title,
        durationMin: value.durationMin ?? null,
        anime: { connect: { id: Number(value.animeId) } }
      };

      if (value.id) {
        await this.adminCrudService.update('episode', value.id, payload);
      } else {
        await this.adminCrudService.create('episode', payload);
      }

      this.episodeForm.reset();
      await this.afterSave('Épisode enregistré.');
    } catch {
      this.error.set("Impossible de sauvegarder l'épisode.");
    }
  }

  editEpisode(episode: EpisodeRecord): void {
    this.episodeForm.setValue({
      id: episode.id,
      animeId: episode.animeId,
      episodeNumber: episode.episodeNumber,
      title: episode.title,
      durationMin: episode.durationMin ?? null
    });
  }

  async deleteEpisode(id: number): Promise<void> {
    try {
      await this.adminCrudService.delete('episode', id);
      await this.afterSave('Épisode supprimé.');
    } catch {
      this.error.set("Impossible de supprimer l'épisode.");
    }
  }

  async saveAnimeGenre(): Promise<void> {
    try {
      const value = this.animeGenreForm.getRawValue();

      await this.adminCrudService.create('animeGenre', {
        anime: { connect: { id: Number(value.animeId) } },
        genre: { connect: { id: Number(value.genreId) } }
      });

      await this.afterSave('Genre lié à l’anime.');
    } catch {
      this.error.set('Impossible de lier ce genre. Le lien existe peut-être déjà.');
    }
  }

  private async afterSave(message: string): Promise<void> {
    this.message.set(message);
    this.error.set(null);
    await this.loadData();
  }

  private setDefaultSelects(): void {
    const firstAnimeId = this.animes()[0]?.id ?? null;
    const firstGenreId = this.genres()[0]?.id ?? null;

    if (!this.characterForm.controls.animeId.value) {
      this.characterForm.patchValue({ animeId: firstAnimeId });
    }

    if (!this.episodeForm.controls.animeId.value) {
      this.episodeForm.patchValue({ animeId: firstAnimeId });
    }

    if (!this.animeGenreForm.controls.animeId.value || !this.animeGenreForm.controls.genreId.value) {
      this.animeGenreForm.patchValue({
        animeId: firstAnimeId,
        genreId: firstGenreId
      });
    }
  }
}
