import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [
    CurrencyPipe
  ],
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
