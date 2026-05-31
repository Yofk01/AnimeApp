import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Anime } from '../services/anime.types';
import { AnimeService } from '../services/anime.service';

@Component({
  selector: 'app-anime-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="card">
      <h2>Ajouter un anime</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <label>
          Titre
          <input type="text" formControlName="title" />
        </label>

        <label>
          Année
          <input type="number" formControlName="releaseYear" />
        </label>

        <label>
          Description
          <textarea formControlName="description"></textarea>
        </label>

        <button type="submit" [disabled]="form.invalid || saving()">
          {{ anime() ? 'Modifier' : 'Créer' }}
        </button>
      </form>

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
    </section>
  `
})
export class AnimeFormComponent {
  readonly anime = input<Anime | null>(null);
  readonly saved = output<Anime>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly animeService = inject(AnimeService);

  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.formBuilder.nonNullable.group({
    title: ['', Validators.required],
    releaseYear: this.formBuilder.control<number | null>(null),
    description: ['']
  });

  constructor() {
    effect(() => {
      const anime = this.anime();

      if (!anime) {
        this.form.reset();
        return;
      }

      this.form.patchValue({
        title: anime.title,
        releaseYear: anime.releaseYear ?? null,
        description: anime.description ?? ''
      });
    });
  }

  async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    try {
      this.saving.set(true);
      this.error.set(null);

      const value = this.form.getRawValue();
      const payload = {
        title: value.title,
        description: value.description,
        releaseYear: value.releaseYear ?? undefined
      };
      const editedAnime = this.anime();
      const anime = editedAnime
        ? await this.animeService.update(editedAnime.id, payload)
        : await this.animeService.create(payload);

      this.form.reset();
      this.saved.emit(anime);
    } catch {
      this.error.set("Impossible d'enregistrer l'anime.");
    } finally {
      this.saving.set(false);
    }
  }
}
