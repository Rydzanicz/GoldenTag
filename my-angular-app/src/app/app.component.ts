import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ShopComponent} from './shop/shop.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent, ShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';
}
