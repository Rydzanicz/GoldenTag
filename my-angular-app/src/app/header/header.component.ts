import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [
    CommonModule
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  isBrowser: boolean;
  private routerSubscription: Subscription | null = null;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadCartItemCount();

      window.addEventListener('storage', this.handleStorageEvent);

      this.routerSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.loadCartItemCount();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('storage', this.handleStorageEvent);
      this.routerSubscription?.unsubscribe();
    }
  }

  loadCartItemCount(): void {
    if (this.isBrowser) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      this.cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
    }
  }

  private handleStorageEvent = (event: StorageEvent): void => {
    if (event.key === 'cart') {
      this.loadCartItemCount();
    }
  };

  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}
