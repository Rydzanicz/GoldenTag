import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InvoiceMailerService} from '../services/invoice-mailer.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class SummaryComponent implements OnInit {
  cartItems: any[] = [];
  isBrowser: boolean;
  note = '';
  cartItemCount: number = 0;

  buyerName: string = '';
  buyerAddressEmail: string = '';
  buyerAddress: string = '';
  buyerNip: string = '';
  emailError: boolean = false;
  buyerPhone: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceMailerService: InvoiceMailerService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadCart();
    }
    this.route.queryParams.subscribe((params) => {
      this.note = params['note'] || null;
    });
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

  saveBuyerInfo(): void {
    const request = {
      buyerName: this.buyerName,
      buyerAddressEmail: this.buyerAddressEmail,
      buyerAddress: this.buyerAddress,
      buyerNip: this.buyerNip,
      buyerPhone: this.buyerPhone,
      orders: this.cartItems.map(item => ({
        name: item.name,
        description: this.note,
        quantity: item.quantity,
        price: item.price
      }))
    };

    this.invoiceMailerService.sendBuyerData(request).subscribe({
      next: () => {
        alert('Dane kupującego zostały wysłane pomyślnie!');
      },
      error: () => {
        alert('Wystąpił błąd podczas wysyłania danych kupującego.');
      }
    });
  }

  goBackToCart(): void {
    this.router.navigate(['/cart'], {
      queryParams: {
        note: this.note
      }
    });
  }

  checkEmailValidation(emailValue: string): void {
    this.emailError = !emailValue.includes('@');
  }
}
