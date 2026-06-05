import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

type SortKey = 'default' | 'priceasc' | 'pricedesc' | 'rating' | 'newest';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule, ProductCardComponent],
  template: `
<div class="container">
  <div class="shop-layout">
    <aside class="filter-sidebar">
      <div class="filter-head"><h3>FILTERS</h3><button class="filter-clear" (click)="reset()">Clear All</button></div>

      <div class="filter-group">
        <h4>Category</h4>
        @for (c of categories; track c.key) {
          <label class="filter-opt">
            <input type="radio" name="cat" [value]="c.key" [checked]="category === c.key" (change)="onCategory(c.key)">
            {{ c.label }} <span class="filter-count">({{ countFor(c.key) }})</span>
          </label>
        }
      </div>

      <div class="filter-group">
        <h4>Price Range (₹)</h4>
        <div style="display:flex;gap:8px">
          <input type="number" [(ngModel)]="minPrice" placeholder="Min" style="width:100%;padding:7px 10px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px">
          <input type="number" [(ngModel)]="maxPrice" placeholder="Max" style="width:100%;padding:7px 10px;border:1px solid #e0e0e0;border-radius:6px;font-size:12px">
        </div>
      </div>

      <div class="filter-group">
        <h4>Brand</h4>
        @for (b of brands; track b) {
          <label class="filter-opt">
            <input type="checkbox" [checked]="selectedBrands.has(b)" (change)="toggleBrand(b)">
            {{ b }} <span class="filter-count">({{ countForBrand(b) }})</span>
          </label>
        }
      </div>
    </aside>

    <div>
      <div class="shop-toolbar">
        <div class="shop-count">Showing <strong>{{ filtered().length }}</strong> products</div>
        <select class="shop-sort" [(ngModel)]="sort">
          <option value="default">Sort: Featured</option>
          <option value="priceasc">Price: Low to High</option>
          <option value="pricedesc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      @if (filtered().length) {
        <div class="prod-grid">
          @for (p of filtered(); track p.id) {
            <app-product-card [product]="p"></app-product-card>
          }
        </div>
      } @else {
        <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#999">
          <i class="ti ti-search-off" style="font-size:48px;display:block;margin-bottom:14px"></i>
          <div style="font-family:Rajdhani;font-weight:700;font-size:18px;margin-bottom:6px">No products found</div>
          <div style="font-size:13px">Try adjusting your filters</div>
        </div>
      }
    </div>
  </div>
</div>
`
})
export class ShopComponent {
  private products = inject(ProductService);
  private route = inject(ActivatedRoute);

  categories = [
    { key: 'all', label: 'All Products' },
    { key: 'sealers', label: 'Stone Sealers' },
    { key: 'adhesives', label: 'Adhesives' },
    { key: 'cleaners', label: 'Tile Cleaners' },
    { key: 'waterproof', label: 'Waterproofing' },
    { key: 'polish', label: 'Polish Materials' },
    { key: 'grout', label: 'Grout & Additives' }
  ];
  brands = ['Tenax', 'MYK Laticrete', 'Roff', 'Araldite', 'Astral'];

  category = 'all';
  search = '';
  minPrice = 0;
  maxPrice = 10000;
  sort: SortKey = 'default';
  selectedBrands = new Set<string>();

  constructor() {
    // React to ?cat= and ?q= from nav links and the header search box.
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const cat = params.get('cat');
        const q = params.get('q');
        this.search = q ? q.trim() : '';
        if (cat) { this.category = cat; }
        else if (!q) { this.category = 'all'; }
      });
  }

  onCategory(key: string): void {
    this.category = key;
    this.search = ''; // selecting a category clears an active search
  }

  /** Visible product list. A method so it stays in sync with ngModel inputs. */
  filtered(): Product[] {
    let list = [...this.products.products()];
    const q = this.search.toLowerCase().trim();

    if (q) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q)
      );
    } else if (this.category !== 'all') {
      list = list.filter((p) => p.cat === this.category);
    }

    const min = Number(this.minPrice) || 0;
    const max = Number(this.maxPrice) || Number.MAX_SAFE_INTEGER;
    list = list.filter((p) => p.price >= min && p.price <= max);

    if (this.selectedBrands.size) {
      list = list.filter((p) =>
        [...this.selectedBrands].some((b) => p.brand.toLowerCase().includes(b.toLowerCase()))
      );
    }

    switch (this.sort) {
      case 'priceasc': list.sort((a, b) => a.price - b.price); break;
      case 'pricedesc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => b.id - a.id); break;
    }
    return list;
  }

  countFor(catKey: string): number {
    const all = this.products.products();
    return catKey === 'all' ? all.length : all.filter((p) => p.cat === catKey).length;
  }

  countForBrand(brand: string): number {
    return this.products.products().filter((p) => p.brand.toLowerCase().includes(brand.toLowerCase())).length;
  }

  toggleBrand(brand: string): void {
    const next = new Set(this.selectedBrands);
    if (next.has(brand)) { next.delete(brand); } else { next.add(brand); }
    this.selectedBrands = next;
  }

  reset(): void {
    this.category = 'all';
    this.search = '';
    this.minPrice = 0;
    this.maxPrice = 10000;
    this.sort = 'default';
    this.selectedBrands = new Set();
  }
}
