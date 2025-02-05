import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop/shop.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';

export const routes: Routes = [
  {path: '', component: ShopComponent}, // Strona główna
  {path: 'about', component: AboutComponent},  // O nas
  {path: 'contact', component: ContactComponent}, // Kontakt
  {path: 'privacy', component: PrivacyComponent}, // Polityka prywatności
  {path: 'terms', component: TermsComponent}, // Regulamin
  {path: 'shop', component: TermsComponent}, // Regulamin
  {path: '**', redirectTo: '', pathMatch: 'full'} // Nieznane ścieżki
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
