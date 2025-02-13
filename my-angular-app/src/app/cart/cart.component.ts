import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  isBrowser: boolean;
  note = '';

  constructor(@Inject(PLATFORM_ID) private platformId: object, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadCart();
    }
  }

  loadCart(): void {
    if (this.isBrowser && localStorage) {
      const cart = localStorage.getItem('cart');
      this.cartItems = cart ? JSON.parse(cart) : [];
      this.updateCartItemCount();
    }
  }

  updateCartItemCount(): void {
    this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart(): void {
    if (this.isBrowser && localStorage) {
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.cartItemCount = 0;
      this.saveCart();
      this.note = '';
    }
  }

  removeItem(index: number): void {
    if (this.isBrowser && localStorage) {
      this.cartItems.splice(index, 1);
      this.saveCart();
      this.updateCartItemCount();
    }
  }

  addOne(item: any): void {
    if (this.isBrowser && localStorage) {
      const found = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (found) {
        found.quantity += 1;
        this.saveCart();
        this.updateCartItemCount();
      }
    }
  }

  decreaseOne(item: any): void {
    if (this.isBrowser && localStorage) {
      const found = this.cartItems.find(cartItem => cartItem.id === item.id);
      if (found) {
        found.quantity -= 1;

        if (found.quantity <= 0) {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
        }

        this.saveCart();
        this.updateCartItemCount();
      }
    }
  }

  saveCart(): void {
    if (this.isBrowser && localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      const storageEvent = new StorageEvent('storage', {key: 'cart'});
      window.dispatchEvent(storageEvent);
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(value);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  navigateToSummary(): void {
    if (this.note.trim().length === 0) {
      return;
    }

    if (this.note.length > 255) {
      return;
    }

    this.router.navigate(['/summary'], {
      queryParams: {
        note: this.note
      }
    });
  }
}
