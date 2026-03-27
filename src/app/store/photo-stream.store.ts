import { Injectable, computed, inject, signal } from '@angular/core';
import { Photo } from '../core/models/photo.model';
import { PhotoApiService } from '../core/services/photo-api.service';

@Injectable({ providedIn: 'root' })
export class PhotoStreamStore {
  readonly #api = inject(PhotoApiService);

  readonly #photos = signal<Photo[]>([]);
  readonly #loading = signal(false);
  readonly #page = signal(1);
  readonly #hasMore = signal(true);

  readonly photos = this.#photos.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly hasMore = this.#hasMore.asReadonly();
  readonly isEmpty = computed(() => !this.#loading() && this.#photos().length === 0);

  loadMore(): void {
    if (this.#loading() || !this.#hasMore()) return;

    this.#loading.set(true);

    this.#api.getPhotos(this.#page()).subscribe({
      next: (incoming) => {
        if (incoming.length === 0) {
          this.#hasMore.set(false);
        } else {
          this.#photos.update((current) => [...current, ...incoming]);
          this.#page.update((p) => p + 1);
        }
        this.#loading.set(false);
      },
      error: () => {
        // don't get stuck in loading state on network error
        this.#loading.set(false);
      },
    });
  }

  reset(): void {
    this.#photos.set([]);
    this.#page.set(1);
    this.#hasMore.set(true);
    this.#loading.set(false);
  }
}
