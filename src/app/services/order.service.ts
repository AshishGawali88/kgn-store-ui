import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CartLine } from '../models/product.model';
import { environment } from '../../environments/environment';

export interface OrderResult {
  orderCode: string;
  total: number;
  status: string;
}

const WHATSAPP_NUMBER = '918788379667';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private apiBase = (environment.apiBase || '').replace(/\/+$/, '');

  /** Places an order via the API. Returns null if no API is configured. */
  async place(customerName: string, mobile: string, address: string,
              paymentMethod: string, lines: CartLine[]): Promise<OrderResult | null> {
    if (!this.apiBase) return null;
    const body = {
      customerName,
      mobile,
      address,
      paymentMethod, // 'COD' | 'ONLINE' | 'CALL'
      items: lines.map((l) => ({ productId: l.product.id, qty: l.qty }))
    };
    return await firstValueFrom(
      this.http.post<OrderResult>(`${this.apiBase}/api/orders`, body)
    );
  }

  /** WhatsApp fallback — sends the order details to the shop. */
  openWhatsApp(customerName: string, mobile: string, address: string,
               lines: CartLine[], total: number): void {
    const items = lines
      .map((l) => `• ${l.product.name} × ${l.qty}`)
      .join('\n');
    const text = encodeURIComponent(
      'Hello KGN, I want to order:\n' +
      `${items}\n\n` +
      `Total: ₹${total.toLocaleString('en-IN')}\n\n` +
      `Name: ${customerName}\n` +
      `Mobile: ${mobile}\n` +
      `Address: ${address}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  }
}
