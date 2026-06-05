import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `
<div class="prod-card">
  <div class="prod-img-wrap">
    @if (product().badge) {
      <div class="prod-badges"><span class="badge" [class]="badgeClass()">{{ product().badge }}</span></div>
    }
    <button class="wishlist-btn"><i class="ti ti-heart"></i></button>
    <img [src]="product().img" [alt]="product().name" loading="lazy">
  </div>
  <div class="prod-body">
    <div class="prod-brand">{{ product().brand }}</div>
    <div class="prod-name">{{ product().name }}</div>
    <div class="prod-spec">{{ product().spec }}</div>
    <div class="prod-rating"><span class="stars">{{ stars() }}</span><span class="rating-ct">({{ product().reviews }})</span></div>
    <div class="prod-price">
      <span class="price-main">₹{{ product().price | number:'1.0-0' }}</span>
      <span class="price-old">₹{{ product().mrp | number:'1.0-0' }}</span>
      <span class="price-off">{{ discount() }}% OFF</span>
    </div>
    @if (product().stock === 0) {
      <div class="stock-info stock-out">✗ Out of Stock</div>
    } @else if (product().stock < 10) {
      <div class="stock-info stock-low">⚠ Only {{ product().stock }} left!</div>
    } @else {
      <div class="stock-info stock-in">✓ In Stock</div>
    }
    <div class="prod-actions">
      <button class="btn-cart" (click)="addToCart()">Add to Cart</button>
      <button class="btn-buy" (click)="buyNow()">Buy Now</button>
    </div>
  </div>
</div>
`,
  imports: [DecimalPipe]
})
export class ProductCardComponent {
  product = input.required<Product>();

  private cart = inject(CartService);
  private router = inject(Router);

  discount = computed(() => {
    const p = this.product();
    return Math.round(((p.mrp - p.price) / p.mrp) * 100);
  });

  stars = computed(() => {
    const r = Math.round(this.product().rating);
    return '★'.repeat(r) + '☆'.repeat(5 - r);
  });

  badgeClass = computed(() => {
    const map: Record<string, string> = {
      HOT: 'badge-hot', SALE: 'badge-sale', NEW: 'badge-new', B2B: 'badge-b2b'
    };
    return map[this.product().badge] || 'badge-hot';
  });

  addToCart(): void {
    this.cart.add(this.product());
  }

  buyNow(): void {
    this.cart.add(this.product());
    this.router.navigate(['/cart']);
  }
}
