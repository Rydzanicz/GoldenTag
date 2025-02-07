import {Component} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  imports: [
    ProductComponent,
    CommonModule
  ],
  styleUrls: ['./shop.component.css']
})


export class ShopComponent {
  isExchangeVisible: boolean = true;
  products = [
    {
      id: 1,
      name: 'Zegarn na ścianę',
      description: 'Opis produktu 1',
      price: 49.99,
      image: 'assets/zegar.jpg'
    },
    {
      id: 2,
      name: 'Produkt 2',
      description: 'Opis produktu 2',
      price: 79.99,
      image: 'assets/zywica.jpg'
    }
  ];

  onAddToCart(product: any): void {
    console.log(`Dodano do koszyka: ${product.name}`);
  }
}
