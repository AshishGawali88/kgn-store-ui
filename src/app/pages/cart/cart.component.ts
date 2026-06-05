import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  template: `
<div class="container" style="padding:32px 16px">
  <h1 class="font-bebas" style="font-size:36px;margin-bottom:24px">SHOPPING CART <span style="font-size:18px;color:#888">({{ cart.count() }} items)</span></h1>

  @if (cart.lines().length) {
    <div class="cart-layout">
      <div>
        @for (line of cart.lines(); track line.product.id) {
          <div class="cart-item">
            <div class="cart-img"><img [src]="line.product.img" [alt]="line.product.name"></div>
            <div style="flex:1">
              <div class="cart-item-name">{{ line.product.name }}</div>
              <div class="cart-item-brand">{{ line.product.brand }} · In Stock</div>
              <div class="cart-controls">
                <div class="qty">
                  <button (click)="cart.setQty(line.product.id, line.qty - 1)">−</button>
                  <span class="qty-val">{{ line.qty }}</span>
                  <button (click)="cart.setQty(line.product.id, line.qty + 1)">+</button>
                </div>
                <span style="font-family:'Rajdhani';font-weight:700;font-size:18px;color:var(--g)">₹{{ line.product.price * line.qty | number:'1.0-0' }}</span>
                <button class="remove-btn" (click)="cart.remove(line.product.id)"><i class="ti ti-trash"></i> Remove</button>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="summary">
        <h3>ORDER SUMMARY</h3>
        <div class="sum-row"><span>Subtotal ({{ cart.count() }} items)</span><span>₹{{ cart.subtotal() | number:'1.0-0' }}</span></div>
        <div class="sum-row"><span>Shipping</span><span style="color:var(--g);font-weight:600">FREE</span></div>
        <div class="sum-row"><span>GST (18%)</span><span>₹{{ cart.gst() | number:'1.0-0' }}</span></div>
        <div class="sum-row total"><span>Total</span><span>₹{{ cart.total() | number:'1.0-0' }}</span></div>
        <div class="coupon"><input type="text" placeholder="Coupon code"><button>Apply</button></div>
        <button class="btn-block" routerLink="/checkout">Proceed to Checkout →</button>
        <div style="text-align:center;font-size:11px;color:#888;margin-top:12px"><i class="ti ti-lock"></i> Secure Checkout · GST Invoice Included</div>
        <div style="margin-top:14px;padding-top:14px;border-top:1px solid #f0f0f0;text-align:center;font-size:12px;color:#666">
          <strong>Or call to order:</strong><br>
          <a href="tel:9766551976" style="color:var(--g)">9766551976</a> · <a href="tel:9822642831" style="color:var(--g)">9822642831</a>
        </div>
      </div>
    </div>
  } @else {
    <div style="text-align:center;padding:60px 20px;color:#999">
      <i class="ti ti-shopping-cart-off" style="font-size:56px;display:block;margin-bottom:16px"></i>
      <div style="font-family:Rajdhani;font-weight:700;font-size:20px;margin-bottom:8px">Your cart is empty</div>
      <button class="btn-block" routerLink="/shop" style="max-width:220px;margin:18px auto 0">Browse Products</button>
    </div>
  }
</div>
`
})
export class CartComponent {
  cart = inject(CartService);
}
