import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
<div class="auth-wrap">
  <div class="auth-card">
    <div class="auth-logo">
      <img src="assets/images/kgn-logo.jpg" alt="KGN">
      <div class="font-bebas" style="font-size:20px;color:var(--g)">KGN POWER TOOLS</div>
      <div style="font-size:11px;color:#888;letter-spacing:1px">& MATERIALS · NANDED</div>
    </div>
    <div class="tabs">
      <button class="tab" [class.active]="tab() === 'login'" (click)="tab.set('login')">Login</button>
      <button class="tab" [class.active]="tab() === 'signup'" (click)="tab.set('signup')">Sign Up</button>
    </div>

    @if (tab() === 'login') {
      <div>
        <div class="form-group"><label>Mobile / Email</label><input type="text" placeholder="9876543210 or email@domain.com"></div>
        <div class="form-group"><label>Password</label><input type="password" placeholder="Enter your password"></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:18px;font-size:12px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" style="accent-color:var(--g)"> Remember me</label>
          <a style="color:var(--b);cursor:pointer">Forgot Password?</a>
        </div>
        <button class="btn-block" routerLink="/">Login to Account</button>
        <div style="text-align:center;margin:18px 0;font-size:12px;color:#888;position:relative"><span style="background:#fff;padding:0 12px;position:relative;z-index:1">or continue with</span><div style="position:absolute;top:50%;left:0;right:0;height:1px;background:#e8e8e8"></div></div>
        <button style="width:100%;padding:11px;border:1px solid #e0e0e0;border-radius:8px;background:#fff;font-size:13px;cursor:pointer;font-weight:500"><i class="ti ti-brand-google" style="color:#4285f4"></i> Continue with Google</button>
      </div>
    } @else {
      <div>
        <div class="form-row">
          <div class="form-group"><label>First Name</label><input type="text" placeholder="Ramesh"></div>
          <div class="form-group"><label>Last Name</label><input type="text" placeholder="Shinde"></div>
        </div>
        <div class="form-group"><label>Mobile</label><input type="tel" placeholder="9876543210"></div>
        <div class="form-group"><label>Email</label><input type="email"></div>
        <div class="form-group"><label>Password</label><input type="password" placeholder="Minimum 8 characters"></div>
        <div class="form-group"><label>GST Number (optional)</label><input type="text" placeholder="27AXXXXXX1Z5"></div>
        <button class="btn-block" routerLink="/">Create Account</button>
      </div>
    }
  </div>
</div>
`
})
export class LoginComponent {
  tab = signal<'login' | 'signup'>('login');
}
