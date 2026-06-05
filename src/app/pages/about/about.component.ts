import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
<div class="about-hero">
  <div class="container">
    <img src="assets/images/kgn-logo.jpg" alt="KGN Power Tools & Materials">
    <h1>ABOUT KGN POWER TOOLS</h1>
    <p style="color:rgba(255,255,255,.85);font-size:15px;max-width:600px;margin:0 auto">Nanded's trusted stone polish & tile material supplier — authorized dealer for Tenax, MYK Laticrete, Roff</p>
  </div>
</div>
<section class="about-content">
  <div class="container">
    <div class="about-grid">
      <div class="about-img-box"><img src="assets/images/kgn-logo.jpg" alt="KGN"></div>
      <div class="about-text">
        <div class="about-text-tag">Our Story</div>
        <h2>SERVING NANDED'S CONTRACTORS</h2>
        <p>KGN Power Tools & Materials is located at Noori Chowk, near Mohammadiya Masjid in Maheboob Nagar, Nanded. We supply premium stone polish chemicals, tile adhesives, sealers and construction materials to marble contractors, tile workers, and builders across Marathwada region.</p>
        <p>We are authorized dealers for <strong>Tenax</strong> (Italian stone restoration chemicals), <strong>MYK Laticrete</strong> (tile adhesives, sealers, cleaners), <strong>Roff</strong> (tile fixing solutions), <strong>Araldite</strong> (epoxy systems), and <strong>Astral Adhesives</strong>.</p>
        <p>Run by <strong>Noor Bhai</strong> and <strong>Zafar Khan</strong>, our team gives personal attention to every customer — from a single bottle of Hydrex to bulk Tenax orders for marble polishing projects.</p>
        <div class="about-stats">
          <div class="about-stat"><div class="num">5+</div><div class="lbl">Authorized Brands</div></div>
          <div class="about-stat"><div class="num">14+</div><div class="lbl">Products in Stock</div></div>
          <div class="about-stat"><div class="num">1000+</div><div class="lbl">Contractors Served</div></div>
          <div class="about-stat"><div class="num">10+</div><div class="lbl">Years in Nanded</div></div>
        </div>
      </div>
    </div>
    <div style="margin-top:60px">
      <h2 class="section-title" style="text-align:center">OUR TEAM</h2>
      <p class="section-sub" style="text-align:center">Meet the people behind KGN</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:30px">
        <div style="background:#fff;border:1px solid #e8e8e8;border-radius:12px;padding:28px;text-align:center">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--g),var(--b));display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Bebas Neue';font-size:28px;margin:0 auto 14px">NB</div>
          <div style="font-family:'Rajdhani';font-weight:700;font-size:18px">Noor Bhai</div>
          <div style="font-size:12px;color:#888;margin-bottom:12px">Owner & Sales</div>
          <a href="tel:9766551976" style="display:inline-block;color:var(--g);font-weight:600;font-size:13px;text-decoration:none"><i class="ti ti-phone"></i> 9766551976</a><br>
          <a href="tel:9766413129" style="display:inline-block;color:var(--g);font-weight:600;font-size:13px;text-decoration:none;margin-top:4px"><i class="ti ti-phone"></i> 9766413129</a>
        </div>
        <div style="background:#fff;border:1px solid #e8e8e8;border-radius:12px;padding:28px;text-align:center">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--b),var(--g));display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Bebas Neue';font-size:28px;margin:0 auto 14px">ZK</div>
          <div style="font-family:'Rajdhani';font-weight:700;font-size:18px">Zafar Khan</div>
          <div style="font-size:12px;color:#888;margin-bottom:12px">Partner & Technical</div>
          <a href="tel:9822642831" style="display:inline-block;color:var(--g);font-weight:600;font-size:13px;text-decoration:none"><i class="ti ti-phone"></i> 9822642831</a>
        </div>
      </div>
    </div>
  </div>
</section>
`
})
export class AboutComponent {}
