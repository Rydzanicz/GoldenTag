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
  private isBrowser = false;

  products: Product[] = [
    {
      id: 1,
      name: 'Granaty rodolity',
      description: 'Ekskluzywna adresówka z rodolitamim',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości materiałów, tworzona ręcznie z niezwykłą precyzją' +
        ' i artystycznym wyczuciem. Każdy egzemplarz powstaje w procesie rzemieślniczym, co sprawia, że jest unikalny i' +
        ' jedyny w swoim rodzaju.',
      price: 120,
      originalPrice: 180,
      image: ['assets/zegar1.jpg'],
      badge: 'Bestseller',
      rating: 5,
      ratingCount: 45
    },
    {
      id: 2,
      name: 'Rodolit + tanzanit',
      description: 'Przepiękna adresówka z rodolitem w otoczeniu tanzanitami.',
      descriptionDetails: 'Adresówka wykonana z najwyższej jakości rodolitem, tworzona ręcznie z dbałością o każdy szczegół.' +
        ' Każda powstaje w procesie indywidualnego wykonania, co sprawia, że jest unikalna i pełna artystycznego wyrazu.',
      price: 130,
      image: ['assets/zegar2.jpg'],
      badge: 'Bestseller',
      rating: 4,
      ratingCount: 18
    },
    {
      id: 3,
      name: 'Rubinowe serce',
      description: 'Romantyczna obroża z rubinami w kształcie serca.',
      descriptionDetails: 'Romantyczna adresówka z rubinami w kształcie serca. Każdy kamień został ręcznie dopasowany przez naszych mistrzów jubilerów.',
      price: 99,
      image: ['assets/zegar3.jpg'],
      badge: 'Nowy',
      rating: 4.5,
      ratingCount: 9
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

  onProductClick(product: Product) {
    if (this.isBrowser) {
      this.router.navigate(['/product', product.id]);
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
