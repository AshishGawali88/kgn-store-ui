import { Injectable, signal, computed } from '@angular/core';
import { CartLine, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly lines = signal<CartLine[]>([]);

  readonly count = computed(() => this.lines().reduce((n, l) => n + l.qty, 0));
  readonly subtotal = computed(() => this.lines().reduce((s, l) => s + l.product.price * l.qty, 0));
  readonly gst = computed(() => Math.round(this.subtotal() * 0.18));
  readonly total = computed(() => this.subtotal() + this.gst());

  add(product: Product, qty = 1): void {
    this.lines.update((lines) => {
      const existing = lines.find((l) => l.product.id === product.id);
      if (existing) {
        return lines.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...lines, { product, qty }];
    });
  }

  setQty(productId: number, qty: number): void {
    const q = Math.max(1, qty);
    this.lines.update((lines) =>
      lines.map((l) => (l.product.id === productId ? { ...l, qty: q } : l))
    );
  }

  remove(productId: number): void {
    this.lines.update((lines) => lines.filter((l) => l.product.id !== productId));
  }

  clear(): void {
    this.lines.set([]);
  }
}
