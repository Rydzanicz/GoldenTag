import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    imports: [
        CommonModule
    ],
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
    product: any = null;
    currentImageIndex = 0; // Indeks aktualnie wyświetlanego zdjęcia
    isZoomed = false; // Czy zdjęcie jest powiększone

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.product = {
                id: +this.route.snapshot.paramMap.get('id')!,
                name: params['name'] || null,
                description: params['description'] || null,
                descriptionDetails: params['descriptionDetails'] || null,
                price: params['price'] || null,
                image: params['image'] ? JSON.parse(params['image']) : [] // Deserializacja tablicy zdjęć
            };
        });
    }

    prevImage(): void {
        if (this.product && this.product.image) {
            this.currentImageIndex =
                (this.currentImageIndex - 1 + this.product.image.length) %
                this.product.image.length;
        }
    }

    nextImage(): void {
        if (this.product && this.product.image) {
            this.currentImageIndex =
                (this.currentImageIndex + 1) % this.product.image.length;
        }
    }

    // Otwórz modal z powiększonym zdjęciem
    zoomImage(): void {
        this.isZoomed = true;
    }

    // Zamknij modal powiększenia
    closeZoom(): void {
        this.isZoomed = false;
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

    addToCart(product: any): void {
        if (!this.product) {
            console.error('Product not found. Unable to add to cart.');
            return;
        }

        const cartItem = {
            id: this.product.id,
            name: this.product.name,
            price: this.product.price,
            quantity: 1,
        };

        let cart = JSON.parse(localStorage.getItem('cart') || '[]');

        const existingItem = cart.find((item: any) => item.id === this.product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Product added to cart:', cartItem);
    }
}
