import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product.model';
import { BUILTIN_PRODUCTS } from '../data/products.data';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiBase = (environment.apiBase || '').replace(/\/+$/, '');

  /** Reactive product list. Starts with the built-in list, upgraded by the API. */
  readonly products = signal<Product[]>([]);
  readonly loadedFromApi = signal<boolean>(false);

  /**
   * Try to load the live catalogue from the API. On any failure we silently
   * keep the built-in list, so the storefront always works.
   */
  async load(): Promise<void> {
    if (!this.apiBase) return; // no API configured → keep built-in list
    try {
      const data = await firstValueFrom(
        this.http.get<Product[]>(`${this.apiBase}/api/products`)
      );
      if (Array.isArray(data) && data.length) {
        this.products.set(data.map((p) => ({ ...p, img: this.normalizeImg(p.img) })));
        this.loadedFromApi.set(true);
      }
    } catch {
      // Network/API problem → built-in catalogue stays in place.
      console.warn('KGN API not reachable; using built-in catalogue.');
    }
  }

  getById(id: number): Product | undefined {
    return this.products().find((p) => p.id === id);
  }

  /** The API returns paths like "images/x.jpg"; map them to Angular assets. */
  private normalizeImg(img: string): string {
    if (!img) return img;
    if (img.startsWith('http') || img.startsWith('assets/')) return img;
    return 'assets/' + img.replace(/^\/?/, '');
  }
}
