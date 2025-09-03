import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class ProductPreviewComponent implements OnInit {
  @Input() product: any;

  frontText: string = '';
  backText: string = '';

  showFront: boolean = true;
  maxFrontChars: number = 12;
  maxBackChars: number = 40;

  ngOnInit() {

    if (this.product) {
      this.frontText = 'Milka';
      this.backText = '123-456-790';
    }
  }

  toggleSide() {
    this.showFront = !this.showFront;
  }

  get isFrontTextValid(): boolean {
    return this.frontText.length <= this.maxFrontChars;
  }

  get isBackTextValid(): boolean {
    return this.backText.length <= this.maxBackChars;
  }

  get displayFrontText(): string {
    return this.frontText.substring(0, this.maxFrontChars);
  }

  get displayBackText(): string {
    return this.backText.substring(0, this.maxBackChars);
  }
}
