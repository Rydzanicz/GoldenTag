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
      descriptionDetails: 'Zegar wykonany z najwyższej jakości żywicy epoksydowej, tworzony ręcznie z niezwykłą precyzją' +
        ' i artystycznym wyczuciem. Każdy egzemplarz powstaje w procesie rzemieślniczym, co sprawia, że jest unikalny i' +
        ' jedyny w swoim rodzaju. Dzięki indywidualnemu podejściu do każdego projektu, zegar staje się nie tylko funkcjonalnym czasomierzem,' +
        ' lecz także wyjątkową ozdobą każdego wnętrza.\n' +
        '\n' +
        'Idealnie sprawdzi się jako niebanalny dodatek do Twojego domu lub biura oraz jako wyjątkowy prezent,' +
        ' który zachwyci swoją oryginalnością. Wybierz zegar, który łączy piękno natury z rękodzielniczym kunsztem!',
      price: 49.99,
      image: ['assets/zegar1.jpg', 'assets/zegar2.jpg', 'assets/zegar3.jpg']
    },
    {
      id: 2,
      name: 'Zakładka do książek',
      description: 'Zakładka do książek z żywica epoksydowej',
      descriptionDetails: 'Zakładka do książek wykonana z najwyższej jakości żywicy epoksydowej, tworzona ręcznie z dbałością o każdy szczegół.' +
        ' Każda zakładka powstaje w procesie indywidualnego wykonania, co sprawia, że jest unikalna i pełna artystycznego wyrazu.' +
        ' Dzięki rzemieślniczej precyzji oraz użyciu starannie dobranych materiałów, zakładka nie tylko spełnia swoją funkcję praktyczną,' +
        ' ale również stanowi wyjątkowy element dekoracyjny.\n' +
        '\n' +
        'To idealny dodatek dla pasjonatów literatury, który świetnie sprawdzi się także jako elegancki upominek dla bliskich.' +
        ' Połącz piękno z funkcjonalnością i odkryj magię zakładek tworzonych z pasją!',
      price: 79.99,
      image: ['assets/zywica1.jpg', 'assets/zywica2.jpg', 'assets/zywica3.jpg']
    }
  ];
}
