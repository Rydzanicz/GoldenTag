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
  selectedShape: string = 'bone';
  maxFrontChars: number = 10;
  maxBackChars: number = 20;

  availableShapes = [
    {id: 'bone', name: 'Kość', image: 'assets/kosci.webp'},
    {id: 'circle', name: 'Okrągła', image: 'assets/okrogle.webp'},
    {id: 'hearts', name: 'Serce', image: 'assets/serce.webp'}
  ];

  ngOnInit() {
    if (this.product) {
      this.frontText = 'Milka';
      this.backText = '123 456 780';
    }
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

  get currentTagImage(): string {
    const shape = this.availableShapes.find(s => s.id === this.selectedShape);
    return shape ? shape.image : this.availableShapes[0].image;
  }

  get currentShapeName(): string {
    const shape = this.availableShapes.find(s => s.id === this.selectedShape);
    return shape ? shape.name : this.availableShapes[0].name;
  }
}
