import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class PrivacyComponent implements OnInit {
  currentYear = new Date().getFullYear();

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0); // Auto scroll do góry
    }
  }
}
