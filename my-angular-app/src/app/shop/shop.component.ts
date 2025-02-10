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
      description: 'Zegar z żywica epoksydowej',
      descriptionDetails: 'Zegar z żywica epoksydowej',
      price: 49.99,
      image: 'assets/zegar.jpg'
    },
    {
      id: 2,
      name: 'Zakładka do książek',
      description: 'Zakładka do książek z żywica epoksydowej',
      descriptionDetails: 'Zakładka do książek z żywica epoksydowej',
      price: 79.99,
      image: 'assets/zywica.jpg'
    }
  ];
}
