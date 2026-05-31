import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';

import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet />',
  imports: [RouterOutlet]
})
class RootComponent {}

void bootstrapApplication(RootComponent, {
  providers: [provideRouter(routes)]
});
