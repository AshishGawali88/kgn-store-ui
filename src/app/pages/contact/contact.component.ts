import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
<section class="section">
  <div class="container">
    <h2 class="section-title" style="text-align:center">CONTACT US</h2>
    <p class="section-sub" style="text-align:center;margin-bottom:36px">Call, WhatsApp, or visit our shop in Noori Chowk, Nanded</p>
    <div class="contact-grid">
      <div class="contact-info">
        <h2>GET IN TOUCH</h2>
        <p class="contact-info-sub">Noor Bhai and Zafar Khan are available 9 AM – 8 PM, Monday to Saturday.</p>
        <div class="contact-item"><div class="contact-icon"><i class="ti ti-map-pin"></i></div><div><div class="contact-lbl">Shop Address</div><div class="contact-val">Noori Chowk, Near Mohammadiya Masjid,<br>Maheboob Nagar, Nanded — 431601<br>Maharashtra, India</div></div></div>
        <div class="contact-item"><div class="contact-icon"><i class="ti ti-phone"></i></div><div><div class="contact-lbl">Noor Bhai</div><div class="contact-val"><a href="tel:9766551976">9766551976</a><br><a href="tel:9766413129">9766413129</a></div></div></div>
        <div class="contact-item"><div class="contact-icon"><i class="ti ti-phone"></i></div><div><div class="contact-lbl">Zafar Khan</div><div class="contact-val"><a href="tel:9822642831">9822642831</a></div></div></div>
        <div class="contact-item"><div class="contact-icon"><i class="ti ti-clock"></i></div><div><div class="contact-lbl">Working Hours</div><div class="contact-val">Mon – Sat: 9:00 AM – 8:00 PM<br>Sunday: Closed</div></div></div>
        <button (click)="enquiry.openGeneralChat()" style="width:100%;margin-top:14px;background:#25D366;color:#fff;border:none;border-radius:10px;padding:14px;font-family:'Rajdhani';font-weight:600;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px"><i class="ti ti-brand-whatsapp" style="font-size:18px"></i>WhatsApp Us Now</button>
      </div>

      <div class="contact-form">
        <h2>SEND ENQUIRY</h2>
        <div class="form-row">
          <div class="form-group"><label>Full Name *</label><input type="text" [(ngModel)]="name" placeholder="Ramesh Shinde"></div>
          <div class="form-group"><label>Company (optional)</label><input type="text" [(ngModel)]="company" placeholder="ABC Construction"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Mobile *</label><input type="tel" [(ngModel)]="mobile" placeholder="9876543210"></div>
          <div class="form-group"><label>Email</label><input type="email" [(ngModel)]="email" placeholder="email@gmail.com"></div>
        </div>
        <div class="form-group"><label>Product / Category of Interest</label>
          <select [(ngModel)]="category">
            <option value="">Select Category</option>
            <option>Tenax Stone Sealers (Ager, Hydrex, Proseal)</option>
            <option>MYK Laticrete (Clenza, Latapoxy, Sealer 190)</option>
            <option>Roff (Cera Clean, Rainbow Additive)</option>
            <option>Araldite Epoxy</option>
            <option>Astral Adhesives (Vetra)</option>
            <option>Tile Adhesives & Waterproofing</option>
            <option>Stone Polish Materials (Grip Stone)</option>
            <option>Bulk / Contractor Enquiry</option>
          </select>
        </div>
        <div class="form-group"><label>Message / Requirement</label><textarea rows="5" [(ngModel)]="message" placeholder="Tell us what you need — product name, quantity, delivery location..."></textarea></div>
        <button class="btn-block" [disabled]="sending" (click)="submit()"><i class="ti ti-send"></i> {{ sending ? 'Sending…' : 'Send Enquiry' }}</button>
        <p style="font-size:11px;color:#888;text-align:center;margin-top:12px">We respond within 2 hours during shop hours · GST invoice available</p>
      </div>
    </div>
  </div>
</section>
`
})
export class ContactComponent {
  enquiry = inject(EnquiryService);

  name = '';
  company = '';
  mobile = '';
  email = '';
  category = '';
  message = '';
  sending = false;

  async submit(): Promise<void> {
    if (!this.name.trim() || !this.mobile.trim()) {
      alert('Please enter at least your Name and Mobile number.');
      return;
    }
    const payload = {
      name: this.name.trim(),
      mobile: this.mobile.trim(),
      email: this.email.trim() || undefined,
      category: this.category || undefined,
      message: [this.company ? 'Company: ' + this.company : '', this.message].filter(Boolean).join('\n') || undefined
    };

    this.sending = true;
    try {
      const sent = await this.enquiry.send(payload);
      if (sent) {
        alert('✓ Enquiry sent successfully!\n\nNoor Bhai or Zafar Khan will contact you within 2 business hours.\n\nUrgent? Call:\n• Noor Bhai: 9766551976\n• Zafar Khan: 9822642831');
        this.name = this.company = this.mobile = this.email = this.message = '';
        this.category = '';
        return;
      }
      // No API configured → send via WhatsApp.
      this.enquiry.openWhatsApp(payload);
    } catch {
      // API failed → WhatsApp fallback so the enquiry is not lost.
      this.enquiry.openWhatsApp(payload);
    } finally {
      this.sending = false;
    }
  }
}
