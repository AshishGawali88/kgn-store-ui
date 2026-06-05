import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EnquiryPayload {
  name: string;
  mobile: string;
  email?: string;
  category?: string;
  message?: string;
}

const WHATSAPP_NUMBER = '918788379667';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private http = inject(HttpClient);
  private apiBase = (environment.apiBase || '').replace(/\/+$/, '');

  /** Returns true if sent to the API. Throws if the API call failed. */
  async send(payload: EnquiryPayload): Promise<boolean> {
    if (!this.apiBase) return false; // caller should fall back to WhatsApp
    await firstValueFrom(
      this.http.post(`${this.apiBase}/api/enquiries`, payload)
    );
    return true;
  }

  /** Fallback so nothing is lost when there is no API. Opens WhatsApp chat. */
  openWhatsApp(payload: EnquiryPayload): void {
    const text = encodeURIComponent(
      'New enquiry from website:\n' +
      `Name: ${payload.name}\n` +
      `Mobile: ${payload.mobile}\n` +
      (payload.email ? `Email: ${payload.email}\n` : '') +
      (payload.category ? `Category: ${payload.category}\n` : '') +
      (payload.message ? `Message: ${payload.message}` : '')
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  }

  openGeneralChat(): void {
    const text = encodeURIComponent(
      'Hi, I want to enquire about products at KGN Power Tools & Materials, Nanded'
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  }
}
