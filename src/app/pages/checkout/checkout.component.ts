import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink],
  template: `
<div class="container" style="padding:32px 16px">
  <h1 class="font-bebas" style="font-size:36px;margin-bottom:24px">CHECKOUT</h1>

  @if (cart.lines().length) {
    <div class="cart-layout">
      <div>
        <div class="section-card">
          <h3><i class="ti ti-map-pin" style="color:var(--g)"></i> Delivery Address</h3>
          <div class="form-row">
            <div class="form-group"><label>First Name *</label><input type="text" [(ngModel)]="firstName" placeholder="Ramesh"></div>
            <div class="form-group"><label>Last Name *</label><input type="text" [(ngModel)]="lastName" placeholder="Shinde"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>Mobile *</label><input type="tel" [(ngModel)]="mobile" placeholder="9876543210"></div>
            <div class="form-group"><label>Email</label><input type="email" [(ngModel)]="email" placeholder="email@gmail.com"></div>
          </div>
          <div class="form-group"><label>Full Address *</label><input type="text" [(ngModel)]="address" placeholder="Building, Street, Landmark"></div>
          <div class="form-row">
            <div class="form-group"><label>City *</label><input type="text" [(ngModel)]="city" placeholder="Nanded"></div>
            <div class="form-group"><label>Pincode *</label><input type="text" [(ngModel)]="pincode" placeholder="431601" maxlength="6"></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label>State *</label>
              <select [(ngModel)]="state"><option>Maharashtra</option><option>Karnataka</option><option>Telangana</option><option>Andhra Pradesh</option><option>Gujarat</option></select>
            </div>
            <div class="form-group"><label>GST Number (optional)</label><input type="text" [(ngModel)]="gst" placeholder="27AXXXXXX1Z5"></div>
          </div>
        </div>

        <div class="section-card">
          <h3><i class="ti ti-credit-card" style="color:var(--g)"></i> Payment Method</h3>
          <label class="pay-option"><input type="radio" name="pay" value="ONLINE" [(ngModel)]="payment"><div class="pay-option-text"><strong>UPI / Cards / Net Banking</strong><small>Instant payment · All UPI apps supported</small></div></label>
          <label class="pay-option"><input type="radio" name="pay" value="COD" [(ngModel)]="payment"><div class="pay-option-text"><strong>Cash on Delivery</strong><small>Pay when delivered (Nanded city only)</small></div></label>
          <label class="pay-option"><input type="radio" name="pay" value="CALL" [(ngModel)]="payment"><div class="pay-option-text"><strong>Bank Transfer (NEFT/RTGS)</strong><small>For bulk B2B orders above ₹5,000</small></div></label>
        </div>

        <button class="btn-block" style="padding:16px;font-size:16px" [disabled]="placing" (click)="placeOrder()">
          <i class="ti ti-lock"></i> {{ placing ? 'Placing…' : 'Place Order — ₹' + (cart.total() | number:'1.0-0') }}
        </button>
      </div>

      <div class="summary">
        <h3>YOUR ORDER</h3>
        @for (line of cart.lines(); track line.product.id) {
          <div style="display:flex;gap:10px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #f0f0f0">
            <div style="width:50px;height:50px;background:#f4f5f6;border-radius:8px;padding:4px"><img [src]="line.product.img" alt="" style="width:100%;height:100%;object-fit:contain"></div>
            <div style="flex:1;font-size:12px"><div style="font-weight:600">{{ line.product.name }} × {{ line.qty }}</div><div style="color:#888">₹{{ line.product.price * line.qty | number:'1.0-0' }}</div></div>
          </div>
        }
        <div class="sum-row"><span>Subtotal</span><span>₹{{ cart.subtotal() | number:'1.0-0' }}</span></div>
        <div class="sum-row"><span>Shipping</span><span style="color:var(--g);font-weight:600">FREE</span></div>
        <div class="sum-row"><span>GST 18%</span><span>₹{{ cart.gst() | number:'1.0-0' }}</span></div>
        <div class="sum-row total"><span>Total</span><span>₹{{ cart.total() | number:'1.0-0' }}</span></div>
      </div>
    </div>
  } @else {
    <div style="text-align:center;padding:60px 20px;color:#999">
      <div style="font-family:Rajdhani;font-weight:700;font-size:20px;margin-bottom:8px">Your cart is empty</div>
      <button class="btn-block" routerLink="/shop" style="max-width:220px;margin:18px auto 0">Browse Products</button>
    </div>
  }
</div>
`
})
export class CheckoutComponent {
  cart = inject(CartService);
  private orders = inject(OrderService);
  private router = inject(Router);

  firstName = '';
  lastName = '';
  mobile = '';
  email = '';
  address = '';
  city = '';
  pincode = '';
  state = 'Maharashtra';
  gst = '';
  payment = 'ONLINE';
  placing = false;

  async placeOrder(): Promise<void> {
    if (!this.firstName.trim() || !this.mobile.trim() || !this.address.trim()) {
      alert('Please fill in your name, mobile and address.');
      return;
    }
    const fullName = `${this.firstName} ${this.lastName}`.trim();
    const fullAddress = [this.address, this.city, this.state, this.pincode].filter(Boolean).join(', ');
    const lines = this.cart.lines();
    const total = this.cart.total();

    this.placing = true;
    try {
      const result = await this.orders.place(fullName, this.mobile, fullAddress, this.payment, lines);
      if (result) {
        alert(`✓ Order Placed Successfully!\n\nOrder ID: ${result.orderCode}\nAmount: ₹${result.total.toLocaleString('en-IN')}\n\nNoor Bhai will call you to confirm.\nNoor Bhai: 9766551976 · Zafar Khan: 9822642831`);
        this.cart.clear();
        this.router.navigate(['/']);
        return;
      }
      // No API configured → send the order to WhatsApp instead.
      this.orders.openWhatsApp(fullName, this.mobile, fullAddress, lines, total);
    } catch {
      // API failed → fall back to WhatsApp so the order is not lost.
      this.orders.openWhatsApp(fullName, this.mobile, fullAddress, lines, total);
    } finally {
      this.placing = false;
    }
  }
}
