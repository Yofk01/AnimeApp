import { Routes } from '@angular/router';

import { AdminCrudComponent } from './components/admin-crud.component';
import { AnimeDetailComponent } from './components/anime-detail.component';
import { AnimeListComponent } from './components/anime-list.component';
import { StatsComponent } from './components/stats.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'animes'
  },
  {
    path: 'animes',
    component: AnimeListComponent
  },
  {
    path: 'animes/:id',
    component: AnimeDetailComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'admin',
    component: AdminCrudComponent
  }
];
