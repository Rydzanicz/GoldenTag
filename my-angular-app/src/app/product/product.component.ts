import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Product} from '../models/product.interface';
import {LocalStorageService} from '../services/LocalStorageService';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() productClick = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();
  @Output() toggleWishlist = new EventEmitter<void>();

  isInWishlist = false;
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkWishlistStatus();
    }
  }

  onProductClick() {
    this.productClick.emit(this.product);
  }


  onToggleWishlist(event: Event) {
    event.stopPropagation();
    this.product.isInWishlist = !this.product.isInWishlist;
    this.toggleWishlist.emit();
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-product.jpg';
  }

  getRatingStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({filled: i <= rating});
    }
    return stars;
  }

  private checkWishlistStatus() {
    if (!this.localStorageService.isAvailable) return;

    const wishlistData = this.localStorageService.getItem('wishlist');
    const wishlist = wishlistData ? JSON.parse(wishlistData) : [];
    this.isInWishlist = wishlist.some((item: any) => item.id === this.product.id);
  }

  private updateWishlist() {
    if (!this.localStorageService.isAvailable) return;

    const wishlistData = this.localStorageService.getItem('wishlist');
    let wishlist = wishlistData ? JSON.parse(wishlistData) : [];

    if (this.isInWishlist) {
      if (!wishlist.some((item: any) => item.id === this.product.id)) {
        wishlist.push(this.product);
      }
    } else {
      wishlist = wishlist.filter((item: any) => item.id !== this.product.id);
    }

    this.localStorageService.setItem('wishlist', JSON.stringify(wishlist));
  }
}
