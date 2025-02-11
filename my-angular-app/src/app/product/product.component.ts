import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();

  constructor(private router: Router) {
  }


  navigateToDetails(): void {
    this.router.navigate(['/product', this.product.id], {
      queryParams: {
        name: this.product.name,
        description: this.product.description,
        descriptionDetails: this.product.descriptionDetails,
        price: this.product.price,
        image: JSON.stringify(this.product.image)
      }
    });
  }


  formatCurrency(price: number): string {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      currencyDisplay: 'symbol',
    })
      .format(price)
      .replace(' zł', '');
  }
}
