import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {LocalStorageService} from '../services/LocalStorageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class HeaderComponent implements OnInit {

  cartItemsCount = 0;
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
      this.updateCartCount();

      window.addEventListener('cartUpdated', () => {
        this.updateCartCount();
      });
      window.addEventListener('storage', (event) => {
        if (event.key === 'cart') {
          this.updateCartCount();
        }
      });
    }
  }

  openCart() {
    if (this.isBrowser) {
      this.router.navigate(['/cart']);
    }
  }

  getCartItemsCount(): number {
    return this.cartItemsCount;
  }

  private updateCartCount() {
    if (!this.localStorageService.isAvailable) {
      this.cartItemsCount = 0;
      return;
    }

    const cartData = this.localStorageService.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : [];
    this.cartItemsCount = cart.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
  }
}
