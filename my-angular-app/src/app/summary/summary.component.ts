import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-summary',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  cartItems: any[] = [];
  isBrowser: boolean;
  note = '';
  cartItemCount: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private route: ActivatedRoute, private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadCart();
      console.log(this.note);
    }
    this.route.queryParams.subscribe((params) => {
      this.note = params['note'] || null
    });
    console.log(this.note);
  }

  loadCart(): void {
    if (this.isBrowser && localStorage) {
      const cart = localStorage.getItem('cart');
      this.cartItems = cart ? JSON.parse(cart) : [];
      this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pl-PL', {style: 'currency', currency: 'PLN'}).format(value);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  navigateToSummary(): void {
    this.router.navigate(['/summary'], {
      queryParams: {
        note: this.note
      }
    });
  }
}
