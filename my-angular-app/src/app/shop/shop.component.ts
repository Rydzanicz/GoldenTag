import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {Product} from '../models/product.interface';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/LocalStorageService';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [ProductComponent, CommonModule, FormsModule],
  standalone: true
})
export class ShopComponent implements OnInit {

  showFilters = true;
  selectedCategory = '';
  priceRange = '';
  private isBrowser = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Royal Crown Diamond Collar',
      description: 'Ekskluzywna obroża z 24 diamentami o łącznej wadze 2 karatów.',
      descriptionDetails: 'Obroża wykonana z najwyższej jakości materiałów, tworzona ręcznie z niezwykłą precyzją' +
        ' i artystycznym wyczuciem. Każdy egzemplarz powstaje w procesie rzemieślniczym, co sprawia, że jest unikalny i' +
        ' jedyny w swoim rodzaju.',
      price: 2500,
      originalPrice: 2800,
      image: ['assets/diamond-collar-1.jpg', 'assets/diamond-collar-2.jpg'],
      category: 'Diamentowe Obroże',
      badge: 'Premium',
      materials: '18k złoto białe, skóra naturalna, diamenty VVS1',
      rating: 5,
      ratingCount: 12
    },
    {
      id: 2,
      name: 'Sapphire Ocean Blue',
      description: 'Przepiękna obroża z szafirami Ceylon w otoczeniu diamentów.',
      descriptionDetails: 'Obroża wykonana z najwyższej jakości szafirów Ceylon, tworzona ręcznie z dbałością o każdy szczegół.' +
        ' Każda obroża powstaje w procesie indywidualnego wykonania, co sprawia, że jest unikalna i pełna artystycznego wyrazu.',
      price: 1800,
      image: ['assets/sapphire-collar-1.jpg', 'assets/sapphire-collar-2.jpg'],
      category: 'Szafirowe Kolekcje',
      badge: 'Bestseller',
      materials: '14k złoto, szafiry Ceylon, diamenty',
      rating: 4,
      ratingCount: 8
    },
    {
      id: 3,
      name: 'Ruby Heart Luxury',
      description: 'Romantyczna obroża z rubinami w kształcie serca.',
      descriptionDetails: 'Romantyczna obroża z rubinami w kształcie serca. Każdy kamień został ręcznie dopasowany przez naszych mistrzów jubilerów.',
      price: 2200,
      image: ['assets/ruby-collar-1.jpg', 'assets/ruby-collar-2.jpg'],
      category: 'Rubinowe Kolekcje',
      badge: 'Nowy',
      materials: '14k złoto różowe, rubiny birmasyjskie, diamenty',
      rating: 5,
      ratingCount: 15
    },
    {
      id: 4,
      name: 'Platinum Eternity',
      description: 'Najdroższa obroża w naszej kolekcji z 48 diamentami.',
      descriptionDetails: 'Najdroższa obroża w naszej kolekcji. 48 diamentów ułożonych w nieskończony wzór symbolizujący wieczną miłość.',
      price: 3200,
      image: ['assets/platinum-collar-1.jpg', 'assets/platinum-collar-2.jpg'],
      category: 'Diamentowe Obroże',
      badge: 'Exclusive',
      materials: 'Platyna, diamenty VVS1, skóra premium',
      rating: 5,
      ratingCount: 6
    }
  ];

  filteredProducts: Product[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private localStorageService: LocalStorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      let categoryMatch = true;
      let priceMatch = true;

      if (this.selectedCategory) {
        categoryMatch = product.category?.toLowerCase().includes(this.selectedCategory.toLowerCase()) || false;
      }

      if (this.priceRange) {
        const price = product.price;
        switch (this.priceRange) {
          case '0-50':
            priceMatch = price >= 0 && price <= 50;
            break;
          case '50-100':
            priceMatch = price > 50 && price <= 100;
            break;
          case '100+':
            priceMatch = price > 100;
            break;
          default:
            priceMatch = true;
        }
      }

      return categoryMatch && priceMatch;
    });
  }

  clearFilters() {
    this.selectedCategory = '';
    this.priceRange = '';
    this.filteredProducts = [...this.products];
  }

  onProductClick(product: Product) {
    if (this.isBrowser) {
      this.router.navigate(['/product', product.id]);
    }
  }

  onAddToCart(product: Product) {
    this.addToCartService(product);
    if (this.isBrowser) {
      this.showToast('Produkt dodany do koszyka', 'success');
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  private addToCartService(product: Product) {
    if (!this.localStorageService.isAvailable) return;

    const cartData = this.localStorageService.getItem('cart');
    const cart = cartData ? JSON.parse(cartData) : [];

    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({...product, quantity: 1});
    }

    this.localStorageService.setItem('cart', JSON.stringify(cart));

    if (this.isBrowser) {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }

  private showToast(message: string, type: 'success' | 'error' | 'info') {
    if (this.isBrowser) {
      const event = new CustomEvent('showToast', {
        detail: {message, type}
      });
      window.dispatchEvent(event);
    }
  }
}
