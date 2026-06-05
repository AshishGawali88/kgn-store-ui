import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { EnquiryService } from './services/enquiry.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  template: `
<!-- TOP BAR -->
<div class="topbar">
  <div class="container topbar-inner">
    <div style="display:flex;gap:18px;flex-wrap:wrap">
      <a href="tel:9766551976"><i class="ti ti-phone"></i>Noor Bhai: 9766551976</a>
      <a href="tel:9822642831"><i class="ti ti-phone"></i>Zafar Khan: 9822642831</a>
      <span><i class="ti ti-map-pin"></i>Noori Chowk, Nanded</span>
    </div>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <span>Authorized: Tenax · MYK Laticrete · Roff</span>
    </div>
  </div>
</div>

<!-- HEADER -->
<header class="header">
  <div class="container">
    <div class="header-inner">
      <a class="logo" routerLink="/">
        <img src="assets/images/kgn-logo.jpg" alt="KGN Power Tools & Materials" class="logo-img">
        <div class="logo-text">
          <div class="brand">KGN POWER TOOLS</div>
          <div class="sub">& MATERIALS · NANDED</div>
        </div>
      </a>
      <div class="search">
        <input type="text" [(ngModel)]="searchTerm" placeholder="Search Tenax Ager, Fevicol, Hydrex, MYK Laticrete..." (keydown.enter)="doSearch()">
        <button (click)="doSearch()"><i class="ti ti-search"></i></button>
      </div>
      <div class="header-actions">
        <button class="icon-btn" routerLink="/login"><i class="ti ti-user"></i><span>Account</span></button>
        <button class="icon-btn" routerLink="/cart"><i class="ti ti-shopping-cart"></i><span>Cart</span><span class="cart-badge">{{ cart.count() }}</span></button>
        <button class="wa-btn" (click)="enquiry.openGeneralChat()"><i class="ti ti-brand-whatsapp"></i>WhatsApp</button>
      </div>
    </div>
  </div>
</header>

<!-- NAV -->
<nav class="nav">
  <div class="container">
    <div class="nav-inner">
      <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><i class="ti ti-home"></i> Home</a>
      <a class="nav-link" routerLink="/shop" routerLinkActive="active"><i class="ti ti-package"></i> All Products</a>
      <a class="nav-link" [routerLink]="['/shop']" [queryParams]="{cat:'sealers'}"><i class="ti ti-droplet"></i> Stone Sealers</a>
      <a class="nav-link" [routerLink]="['/shop']" [queryParams]="{cat:'adhesives'}"><i class="ti ti-droplet-half-2"></i> Adhesives</a>
      <a class="nav-link" [routerLink]="['/shop']" [queryParams]="{cat:'cleaners'}"><i class="ti ti-spray"></i> Tile Cleaners</a>
      <a class="nav-link" [routerLink]="['/shop']" [queryParams]="{cat:'waterproof'}"><i class="ti ti-umbrella"></i> Waterproofing</a>
      <a class="nav-link" [routerLink]="['/shop']" [queryParams]="{cat:'polish'}"><i class="ti ti-bucket"></i> Polish Materials</a>
      <a class="nav-link" routerLink="/about" routerLinkActive="active"><i class="ti ti-info-circle"></i> About</a>
      <a class="nav-link" routerLink="/contact" routerLinkActive="active"><i class="ti ti-phone"></i> Contact</a>
    </div>
  </div>
</nav>

<!-- ROUTED PAGE -->
<router-outlet></router-outlet>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><img src="assets/images/kgn-logo.jpg" alt="KGN" style="width:48px;height:48px;object-fit:contain;background:#fff;padding:4px;border-radius:8px"><span class="font-bebas" style="font-size:18px;color:#fff;letter-spacing:1px">KGN POWER TOOLS</span></div>
        <p>Nanded's trusted supplier of stone polish chemicals, tile materials, adhesives & construction supplies. Authorized dealer for Tenax, MYK Laticrete, Roff.</p>
        <div class="footer-socials"><span><i class="ti ti-brand-facebook"></i></span><span><i class="ti ti-brand-instagram"></i></span><span (click)="enquiry.openGeneralChat()"><i class="ti ti-brand-whatsapp"></i></span></div>
      </div>
      <div>
        <h4>QUICK LINKS</h4>
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/shop">Shop</a></li>
          <li><a routerLink="/about">About Us</a></li>
          <li><a routerLink="/contact">Contact</a></li>
          <li><a routerLink="/cart">Cart</a></li>
        </ul>
      </div>
      <div>
        <h4>CATEGORIES</h4>
        <ul>
          <li><a [routerLink]="['/shop']" [queryParams]="{cat:'sealers'}">Stone Sealers</a></li>
          <li><a [routerLink]="['/shop']" [queryParams]="{cat:'adhesives'}">Adhesives</a></li>
          <li><a [routerLink]="['/shop']" [queryParams]="{cat:'cleaners'}">Tile Cleaners</a></li>
          <li><a [routerLink]="['/shop']" [queryParams]="{cat:'waterproof'}">Waterproofing</a></li>
          <li><a [routerLink]="['/shop']" [queryParams]="{cat:'polish'}">Polish Materials</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>CONTACT</h4>
        <div><i class="ti ti-map-pin"></i><span>Noori Chowk, Near Mohammadiya Masjid, Maheboob Nagar, Nanded — 431601</span></div>
        <div><i class="ti ti-phone"></i><span><strong style="color:#ccc">Noor Bhai:</strong> 9766551976 / 9766413129</span></div>
        <div><i class="ti ti-phone"></i><span><strong style="color:#ccc">Zafar Khan:</strong> 9822642831</span></div>
        <div><i class="ti ti-clock"></i><span>Mon–Sat: 9AM – 8PM</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2024 KGN Power Tools & Materials, Nanded. All rights reserved.</span>
      <div style="display:flex;gap:14px"><a style="color:#666;cursor:pointer">Privacy Policy</a><a style="color:#666;cursor:pointer">Terms</a><a style="color:#666;cursor:pointer">Shipping</a></div>
    </div>
  </div>
</footer>

<button class="wa-float" (click)="enquiry.openGeneralChat()" title="Chat on WhatsApp"><i class="ti ti-brand-whatsapp"></i></button>
`
})
export class AppComponent implements OnInit {
  cart = inject(CartService);
  enquiry = inject(EnquiryService);
  private products = inject(ProductService);
  private router = inject(Router);

  searchTerm = '';

  ngOnInit(): void {
    // Try to upgrade the built-in catalogue with live data from the API.
    void this.products.load();
  }

  doSearch(): void {
    const q = this.searchTerm.trim();
    if (!q) return;
    this.router.navigate(['/shop'], { queryParams: { q } });
  }
}
