import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {ProductPreviewComponent} from '../product-preview/product-preview.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  imports: [
    CommonModule,
    ProductPreviewComponent,
    FormsModule
  ]
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  selectedSize = 'M';
  selectedColor = 'Srebrny';
  quantity = 1;

  availableSizes = ['S', 'M', 'L'];
  availableColors = ['Srebrny', 'Złoty', 'Różowe złoto'];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const productId = +this.route.snapshot.paramMap.get('id')!;

      this.product = {
        id: productId,
        name: params['name'] || 'Luksusowa adresówka z diamentami',
        description: params['description'] || 'Ekskluzywna adresówka z prawdziwymi diamentami',
        descriptionDetails: params['descriptionDetails'] || 'Adresówka wykonana z najwyższej jakości materiałów, ręcznie zdobiona prawdziwymi diamentami. Każdy egzemplarz jest unikalny i powstaje w procesie rzemieślniczym.',
        price: params['price'] ? +params['price'] : 299.99,
        originalPrice: params['originalPrice'] ? +params['originalPrice'] : null,
        image: params['image'] ? JSON.parse(params['image']) : ['assets/diamond-tag.jpg'],
        category: params['category'] || null,
        badge: params['badge'] || null,
        rating: params['rating'] ? +params['rating'] : null,
        ratingCount: params['ratingCount'] ? +params['ratingCount'] : null,
        weight: '12g',
        dimensions: '35mm x 20mm'
      };
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

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(product: any): void {
    if (!this.product) {
      console.error('Product not found. Unable to add to cart.');
      return;
    }

    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      size: this.selectedSize,
      color: this.selectedColor,
      image: this.product.image[0]
    };

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItemIndex = cart.findIndex((item: any) =>
      item.id === this.product.id &&
      item.size === this.selectedSize &&
      item.color === this.selectedColor
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += this.quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }

    alert(`Dodano ${this.quantity}x ${this.product.name} do koszyka!`);
    console.log('Product added to cart:', cartItem);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  calculateSavings(): number {
    if (this.product?.originalPrice) {
      return this.product.originalPrice - this.product.price;
    }
    return 0;
  }
}
