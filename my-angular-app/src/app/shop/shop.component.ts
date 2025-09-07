import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {Product} from '../models/product.interface';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/LocalStorageService';
import {WishlistService} from '../services/WishlistService';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [ProductComponent, CommonModule, FormsModule],
  standalone: true
})
export class ShopComponent implements OnInit {
  private isBrowser = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Granaty rodolity',
      description: 'Ekskluzywna adresówka z rodolitamim',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości materiałów, tworzona ręcznie z niezwykłą precyzją' +
        ' i artystycznym wyczuciem. Każdy egzemplarz powstaje w procesie rzemieślniczym, co sprawia, że jest unikalny i' +
        ' jedyny w swoim rodzaju.',
      price: 220,
      originalPrice: 380,
      image: ['assets/grant.jpg'],
      badge: 'Bestseller',
      rating: 5,
      ratingCount: 45,
      isInWishlist: false
    },
    {
      id: 2,
      name: 'Rodolit + tanzanit',
      description: 'Przepiękna adresówka z rodolitem w otoczeniu tanzanitami.',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości rodolitem, tworzona ręcznie z dbałością o każdy szczegół.' +
        ' Każda powstaje w procesie indywidualnego wykonania, co sprawia, że jest unikalna i pełna artystycznego wyrazu.',
      price: 230,
      image: ['assets/kosc.jpg'],
      badge: 'Bestseller',
      rating: 4,
      ratingCount: 18,
      isInWishlist: false
    },
    {
      id: 3,
      name: 'Rubinowe serce',
      description: 'Romantyczna obroża z rubinami w kształcie serca.',
      descriptionDetails: 'Romantyczna adresówka z rubinami w kształcie serca. Każdy kamień został ręcznie dopasowany przez naszych mistrzów jubilerów.',
      price: 199,
      image: ['assets/Rubinowesserce.jpg'],
      badge: 'Nowy',
      rating: 4.5,
      ratingCount: 9,
      isInWishlist: false
    }
  ];

  filteredProducts: Product[] = [];
  originalProductOrder: Product[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService,
    private wishlistService: WishlistService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.originalProductOrder = [...this.products];

    this.updateProductWishlistStatus();

    this.sortProducts();
  }

  onProductClick(product: Product) {
    if (this.isBrowser) {
      this.router.navigate(['/product', product.id], {
        queryParams: {
          name: product.name,
          description: product.description,
          descriptionDetails: product.descriptionDetails,
          price: product.price,
          originalPrice: product.originalPrice,
          image: JSON.stringify(product.image),
          category: product.category,
          badge: product.badge,
          rating: product.rating,
          ratingCount: product.ratingCount
        }
      });
    }
  }

  onWishlistChanged() {
    this.updateProductWishlistStatus();
    this.sortProducts();
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private updateProductWishlistStatus() {
    this.products.forEach(product => {
      product.isInWishlist = this.wishlistService.isInWishlist(product.id);
    });
  }

  private sortProducts() {
    const wishlistIds = this.wishlistService.getWishlistIds();

    this.filteredProducts = [...this.products].sort((a, b) => {
      const aInWishlist = wishlistIds.includes(a.id);
      const bInWishlist = wishlistIds.includes(b.id);

      if (aInWishlist && !bInWishlist) return -1;
      if (!aInWishlist && bInWishlist) return 1;

      if (aInWishlist && bInWishlist) {
        return wishlistIds.indexOf(a.id) - wishlistIds.indexOf(b.id);
      }

      return this.originalProductOrder.indexOf(a) - this.originalProductOrder.indexOf(b);
    });
  }
}
