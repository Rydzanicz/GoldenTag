import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InvoiceMailerService} from '../services/invoice-mailer.service';
import {CartItem} from '../models/product.interface';

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
  cartItems: CartItem[] = [];
  isBrowser: boolean;
  note = '';
  cartItemCount: number = 0;

  orderData: any = null;
  subtotal: number = 0;
  shipping: number = 0;
  discount: number = 0;
  total: number = 0;

  buyerName: string = '';
  buyerAddressEmail: string = '';
  buyerAddress: string = '';
  buyerNip: string = '';
  buyerPhone: string = '';
  emailError: boolean = false;

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
      this.loadOrderData();
    }

    this.route.queryParams.subscribe((params) => {
      this.note = params['note'] || '';

      if (!this.orderData && this.isBrowser) {
        this.router.navigate(['/cart']);
      }
    });
  }

  loadOrderData(): void {
    if (this.isBrowser && localStorage) {
      const orderDataString = localStorage.getItem('currentOrder');
      if (orderDataString) {
        this.orderData = JSON.parse(orderDataString);
        this.cartItems = this.orderData.items || [];
        this.subtotal = this.orderData.subtotal || 0;
        this.shipping = this.orderData.shipping || 0;
        this.discount = this.orderData.discount || 0;
        this.total = this.orderData.total || 0;
        this.note = this.orderData.orderNote || this.note;
        this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      } else {
        this.loadCart();
      }
    }
  }

  loadCart(): void {
    if (this.isBrowser && localStorage) {
      const cart = localStorage.getItem('cart');
      this.cartItems = cart ? JSON.parse(cart) : [];
      this.cartItemCount = this.cartItems.reduce((total, item) => total + item.quantity, 0);
      this.subtotal = this.getTotalPrice();
      this.shipping = this.subtotal >= 200 ? 0 : 15;
      this.total = this.subtotal + this.shipping - this.discount;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(value);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  saveBuyerInfo(): void {
    if (!this.buyerName || !this.buyerAddressEmail || !this.buyerAddress || !this.buyerPhone) {
      alert('Proszę wypełnić wszystkie wymagane pola.');
      return;
    }

    if (!this.buyerAddressEmail.includes('@')) {
      this.emailError = true;
      alert('Proszę podać prawidłowy adres email.');
      return;
    }

    const request = {
      buyerName: this.buyerName,
      buyerAddressEmail: this.buyerAddressEmail,
      buyerAddress: this.buyerAddress,
      buyerNip: this.buyerNip,
      buyerPhone: this.buyerPhone,
      orderNote: this.note,
      subtotal: this.subtotal,
      shipping: this.shipping,
      discount: this.discount,
      total: this.total,
      orders: this.cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
        frontText: item.frontText,
        backText: item.backText,
        tagShape: item.tagShape
      }))
    };

    this.invoiceMailerService.sendBuyerData(request).subscribe({
      next: () => {
        alert('Zamówienie zostało złożone pomyślnie! Dziękujemy za zakup.');
        this.clearOrderData();
        this.navigateToShop();
      },
      error: (error) => {
        console.error('Error sending order:', error);
        alert('Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.');
      }
    });
  }

  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  clearOrderData(): void {
    if (this.isBrowser && localStorage) {
      localStorage.removeItem('cart');
      localStorage.removeItem('currentOrder');
      this.cartItems = [];
      this.cartItemCount = 0;
      this.note = '';

      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
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
