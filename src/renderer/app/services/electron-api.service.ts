import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronApiService {
  private readonly document = inject(DOCUMENT);

  get api(): Window['electronApi'] {
    const api = this.document.defaultView?.electronApi;

    if (!api) {
      throw new Error("L'API Electron n'est pas disponible.");
    }

    return api;
  }
}
