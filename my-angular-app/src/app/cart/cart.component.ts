import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {CartItem} from '../models/product.interface';
import {LocalStorageService} from '../services/LocalStorageService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  orderNote = '';
  promoCode = '';
  isProcessing = false;
  shipping = 0;
  discount = 0;
  private isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.loadCartItems();
      this.calculateShipping();
    }
  }

  loadCartItems() {
    if (!this.localStorageService.isAvailable) {
      this.cartItems = [];
      return;
    }

    const cartData = this.localStorageService.getItem('cart');
    this.cartItems = cartData ? JSON.parse(cartData) : [];
  }

  clearCart() {
    if (!this.isBrowser) return;

    if (confirm('Czy na pewno chcesz wyczyścić koszyk?')) {
      this.cartItems = [];
      this.localStorageService.removeItem('cart');
      this.updateCartInStorage();
    }
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.updateCartInStorage();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartInStorage();
    }
  }

  removeItem(item: CartItem) {
    if (!this.isBrowser) return;

    if (confirm(`Czy na pewno chcesz usunąć ${item.name} z koszyka?`)) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        this.updateCartInStorage();
      }
    }
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0);
  }

  getTotalPrice(): number {
    return this.getSubtotal() + this.shipping - this.discount;
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      if (this.isBrowser) {
        this.showToast('Koszyk jest pusty', 'error');
      }
      return;
    }

    this.isProcessing = true;
    if (this.isBrowser) {
      const orderData = {
        items: this.cartItems,
        subtotal: this.getSubtotal(),
        shipping: this.shipping,
        discount: this.discount,
        total: this.getTotalPrice(),
        orderNote: this.orderNote,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem('currentOrder', JSON.stringify(orderData));
    }

    setTimeout(() => {
      if (this.isBrowser) {
        this.router.navigate(['/summary'], {
          queryParams: {
            note: this.orderNote,
            fromCart: 'true'
          }
        });
      }
      this.isProcessing = false;
    }, 1000);
  }

  trackByCartItem(index: number, item: CartItem): number {
    return item.id;
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-product.jpg';
  }

  private updateCartInStorage() {
    if (!this.localStorageService.isAvailable) return;

    this.localStorageService.setItem('cart', JSON.stringify(this.cartItems));

    if (this.isBrowser) {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    this.calculateShipping();
  }

  private calculateShipping() {
    const subtotal = this.getSubtotal();
    this.shipping = subtotal >= 150 ? 0 : 15;
  }

  private showToast(message: string, type: 'success' | 'error' | 'info') {
    if (this.isBrowser) {
      const event = new CustomEvent('showToast', {
        detail: {message, type}
      });
      window.dispatchEvent(event);
    }
  }
}
