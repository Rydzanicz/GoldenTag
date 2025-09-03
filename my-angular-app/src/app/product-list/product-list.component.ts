import {Component, Input, OnInit} from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {NgForOf} from '@angular/common';
import {Product} from '../models/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [
    ProductComponent,
    NgForOf
  ],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: any[] = [];

  ngOnInit() {
    this.sortProducts();
  }

  onToggleWishlist(product: Product) {
    product.isInWishlist = !product.isInWishlist;
    this.sortProducts();
  }

  sortProducts() {
    this.products.sort((a, b) => {
      if (a.isInWishlist && !b.isInWishlist) return -1;
      if (!a.isInWishlist && b.isInWishlist) return 1;
      return 0;
    });
  }
}
