import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { EnquiryService } from '../../services/enquiry.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductCardComponent],
  template: `
<section class="hero">
  <div class="container">
    <div class="hero-content">
      <div class="hero-tag">Nanded's Trusted Stone & Tile Material Supplier</div>
      <h1>STONE POLISH<br>&amp; <span>TILE</span><br>MATERIALS</h1>
      <p>Authorized dealer for Tenax stone restoration chemicals, MYK Laticrete tile solutions, Roff fixing materials, Araldite epoxy, and more. Premium quality at wholesale prices.</p>
      <div class="hero-contact">
        <div class="hero-contact-item"><i class="ti ti-phone-call"></i><strong>Noor Bhai:</strong> <a href="tel:9766551976" style="color:#fff">9766551976</a> / <a href="tel:9766413129" style="color:#fff">9766413129</a></div>
        <div class="hero-contact-item"><i class="ti ti-phone-call"></i><strong>Zafar Khan:</strong> <a href="tel:9822642831" style="color:#fff">9822642831</a></div>
        <div class="hero-contact-item"><i class="ti ti-map-pin"></i>Noori Chowk, Maheboob Nagar, Nanded</div>
      </div>
      <div class="hero-btns">
        <a class="btn-primary" routerLink="/shop"><i class="ti ti-shopping-bag"></i>Shop Now</a>
        <a class="btn-outline-w" (click)="enquiry.openGeneralChat()"><i class="ti ti-brand-whatsapp"></i>WhatsApp Enquiry</a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><div class="num">14+</div><div class="lbl">Products</div></div>
        <div class="hero-stat"><div class="num">5+</div><div class="lbl">Brands</div></div>
        <div class="hero-stat"><div class="num">10+</div><div class="lbl">Years</div></div>
        <div class="hero-stat"><div class="num">100%</div><div class="lbl">Genuine</div></div>
      </div>
    </div>
  </div>
</section>

<div class="marquee-bar">
  <div class="marquee">
    <span>TENAX</span><span>MYK LATICRETE</span><span>ROFF</span><span>ARALDITE</span><span>ASTRAL ADHESIVES</span><span>FEVICOL</span><span>GRIP STONE</span><span>PIDILITE</span>
    <span>TENAX</span><span>MYK LATICRETE</span><span>ROFF</span><span>ARALDITE</span><span>ASTRAL ADHESIVES</span><span>FEVICOL</span><span>GRIP STONE</span><span>PIDILITE</span>
  </div>
</div>

<section class="section">
  <div class="container">
    <h2 class="section-title">SHOP BY CATEGORY</h2>
    <p class="section-sub">Browse our complete range of stone polish, tile materials & construction chemicals</p>
    <div class="cat-grid">
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'sealers'}"><div class="cat-icon"><i class="ti ti-droplet"></i></div><div class="cat-name">Stone Sealers</div><div class="cat-count">Tenax Hydrex, Ager</div></a>
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'adhesives'}"><div class="cat-icon"><i class="ti ti-droplet-half-2"></i></div><div class="cat-name">Adhesives</div><div class="cat-count">Araldite, Latapoxy, Vetra</div></a>
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'cleaners'}"><div class="cat-icon"><i class="ti ti-spray"></i></div><div class="cat-name">Tile Cleaners</div><div class="cat-count">Clenza TC, TS, Cera Clean</div></a>
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'waterproof'}"><div class="cat-icon"><i class="ti ti-umbrella"></i></div><div class="cat-name">Waterproofing</div><div class="cat-count">MYK DWA, Sealer 190</div></a>
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'polish'}"><div class="cat-icon"><i class="ti ti-bucket"></i></div><div class="cat-name">Polish Materials</div><div class="cat-count">Grip Stone, Mastic</div></a>
      <a class="cat-card" [routerLink]="['/shop']" [queryParams]="{cat:'grout'}"><div class="cat-icon"><i class="ti ti-grid-dots"></i></div><div class="cat-name">Grout & Additives</div><div class="cat-count">Roff Rainbow</div></a>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title">PREMIUM PRODUCT SHOWCASE</h2>
    <p class="section-sub">Best-selling stone polish chemicals and tile materials at KGN Nanded</p>
    <div class="feat-grid">
      <div class="feat-card">
        <div class="feat-header" style="background:linear-gradient(135deg,#062a1f,#0B4F3A)">
          <div class="feat-badge">Bestseller</div>
          <div class="feat-name">Tenax Ager Colour Enhancer</div>
          <div class="feat-brand">Italian Stone Technology</div>
        </div>
        <div class="feat-img"><img src="assets/images/tenax-ager.jpg" alt="Tenax Ager"></div>
        <div class="feat-body">
          <p class="feat-desc">Italian colour-enhancing sealer with wet-look effect. Anti-graffiti protection for raw-smooth natural stones, marble & granite.</p>
          <div class="feat-foot">
            <div><div class="feat-price">₹2,850</div><div class="feat-price-mrp"><s>₹3,400</s>  16% OFF</div></div>
            <div class="feat-btns"><button class="btn-cart" (click)="quickAdd(1)">Add</button><button class="btn-buy" (click)="quickBuy(1)">Buy</button></div>
          </div>
        </div>
      </div>
      <div class="feat-card">
        <div class="feat-header" style="background:linear-gradient(135deg,#073a6b,#0A4D8C)">
          <div class="feat-badge">Top Rated</div>
          <div class="feat-name">Tenax Hydrex Stone Sealer</div>
          <div class="feat-brand">Italian Stone Technology</div>
        </div>
        <div class="feat-img"><img src="assets/images/tenax-hydrex.jpg" alt="Tenax Hydrex"></div>
        <div class="feat-body">
          <p class="feat-desc">Idro-oleorepellente — water & oil repellent for polished marble and granite. Provides invisible protection without altering appearance.</p>
          <div class="feat-foot">
            <div><div class="feat-price" style="color:var(--b)">₹2,450</div><div class="feat-price-mrp"><s>₹2,800</s>  12% OFF</div></div>
            <div class="feat-btns"><button class="btn-cart" (click)="quickAdd(2)">Add</button><button class="btn-buy" (click)="quickBuy(2)">Buy</button></div>
          </div>
        </div>
      </div>
      <div class="feat-card">
        <div class="feat-header" style="background:linear-gradient(135deg,#1a3a1a,#2d6a2d)">
          <div class="feat-badge">Pro Grade</div>
          <div class="feat-name">Araldite Standard Epoxy</div>
          <div class="feat-brand">Huntsman Advanced Materials</div>
        </div>
        <div class="feat-img"><img src="assets/images/araldite.webp" alt="Araldite Standard Epoxy"></div>
        <div class="feat-body">
          <p class="feat-desc">Two-part epoxy resin + hardener kit. Highest bond strength, multi-substrate, waterproof, heat & chemical resistant.</p>
          <div class="feat-foot">
            <div><div class="feat-price">₹285</div><div class="feat-price-mrp"><s>₹340</s>  16% OFF</div></div>
            <div class="feat-btns"><button class="btn-cart" (click)="quickAdd(11)">Add</button><button class="btn-buy" (click)="quickBuy(11)">Buy</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div><h2 class="section-title" style="margin-bottom:2px">ALL PRODUCTS IN STOCK</h2><p class="section-sub" style="margin-bottom:0">Available at our shop in Noori Chowk, Nanded — call for bulk pricing</p></div>
      <button class="btn-outline" routerLink="/shop">View Filter Page →</button>
    </div>
    <div class="prod-grid">
      @for (p of products.products(); track p.id) {
        <app-product-card [product]="p"></app-product-card>
      }
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    <h2 class="section-title" style="text-align:center">WHY CHOOSE KGN?</h2>
    <p class="section-sub" style="text-align:center;margin-bottom:48px">Trusted by contractors, marble workers, and builders across Marathwada</p>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon"><i class="ti ti-award"></i></div><div class="why-title">Authorized Dealer</div><div class="why-desc">Official dealer for Tenax, MYK Laticrete & Roff. 100% genuine products with warranty.</div></div>
      <div class="why-card"><div class="why-icon"><i class="ti ti-truck-delivery"></i></div><div class="why-title">Fast Delivery</div><div class="why-desc">Same-day delivery across Nanded city. Pan-Maharashtra shipping for bulk orders.</div></div>
      <div class="why-card"><div class="why-icon"><i class="ti ti-receipt"></i></div><div class="why-title">GST Invoice</div><div class="why-desc">Proper GST bills for all purchases. Credit terms available for regular contractors.</div></div>
      <div class="why-card"><div class="why-icon"><i class="ti ti-headset"></i></div><div class="why-title">Expert Guidance</div><div class="why-desc">Noor Bhai & Zafar Khan personally guide you on best product for your job.</div></div>
      <div class="why-card"><div class="why-icon"><i class="ti ti-coin"></i></div><div class="why-title">Wholesale Pricing</div><div class="why-desc">Special rates for marble polish contractors, tile workers & bulk buyers.</div></div>
      <div class="why-card"><div class="why-icon"><i class="ti ti-refresh"></i></div><div class="why-title">Easy Returns</div><div class="why-desc">Sealed products can be returned within 7 days. Replacement on damage.</div></div>
    </div>
  </div>
</section>

<section class="testi-section">
  <div class="container">
    <h2 class="section-title">WHAT OUR CUSTOMERS SAY</h2>
    <div class="testi-grid">
      <div class="testi-card"><p class="testi-text">"KGN is my go-to shop for Tenax Ager and Hydrex. Noor Bhai always has stock and gives proper guidance on application. Best prices in Nanded."</p><div class="testi-author"><div class="testi-avatar">RS</div><div><div class="testi-name">Ramesh Shinde</div><div class="testi-loc">Marble Contractor, Nanded</div></div></div></div>
      <div class="testi-card"><p class="testi-text">"Bought MYK Laticrete tile adhesive and Roff Cera Clean from KGN for my project. Zafar Bhai gave proper GST bill and arranged same-day delivery."</p><div class="testi-author"><div class="testi-avatar">VK</div><div><div class="testi-name">Vinod Kulkarni</div><div class="testi-loc">Civil Contractor, Latur</div></div></div></div>
      <div class="testi-card"><p class="testi-text">"Trusted KGN for 5+ years now. They stock genuine Tenax, MYK and Roff products. Wholesale prices for bulk orders. Highly recommended for tile contractors."</p><div class="testi-author"><div class="testi-avatar">PM</div><div><div class="testi-name">Prakash More</div><div class="testi-loc">Tile Worker, Parbhani</div></div></div></div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>NEED BULK ORDER OR CUSTOM QUOTE?</h2>
    <p>Call us directly for wholesale rates on Tenax, MYK Laticrete, Roff & all stone polish materials.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <a class="btn-primary" href="tel:9766551976"><i class="ti ti-phone"></i>Call Noor Bhai: 9766551976</a>
      <a class="btn-outline-w" (click)="enquiry.openGeneralChat()"><i class="ti ti-brand-whatsapp"></i>WhatsApp Enquiry</a>
    </div>
    <div class="cta-contacts">
      <div><i class="ti ti-phone"></i> <strong>Zafar Khan:</strong> <a href="tel:9822642831" style="color:#fff">9822642831</a></div>
      <div><i class="ti ti-map-pin"></i> Noori Chowk, Near Mohammadiya Masjid, Maheboob Nagar, Nanded</div>
    </div>
  </div>
</section>
`
})
export class HomeComponent {
  products = inject(ProductService);
  enquiry = inject(EnquiryService);
  private cart = inject(CartService);
  private router = inject(Router);

  quickAdd(id: number): void {
    const p = this.products.getById(id);
    if (p) this.cart.add(p);
  }

  quickBuy(id: number): void {
    const p = this.products.getById(id);
    if (p) { this.cart.add(p); this.router.navigate(['/cart']); }
  }
}
