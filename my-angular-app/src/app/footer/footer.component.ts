import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();

  recentPurchases = [
    {customerInitials: 'M.K.', city: 'Warszawa', productName: 'Granaty rodolity', timeAgo: '2 min temu'},
    {customerInitials: 'A.S.', city: 'Kraków', productName: 'Rubinowe serce', timeAgo: '5 min temu'},
    {customerInitials: 'P.W.', city: 'Łódź', productName: 'Rodolit + tanzanit', timeAgo: '7 min temu'},
    {customerInitials: 'G.L.', city: 'Poznań', productName: 'Granaty rodolity', timeAgo: '10 min temu'},
    {customerInitials: 'K.J.', city: 'Gdańsk', productName: 'Rubinowe serce', timeAgo: '12 min temu'},
    {customerInitials: 'E.Z.', city: 'Wrocław', productName: 'Rodolit + tanzanit', timeAgo: '15 min temu'},
    {customerInitials: 'S.N.', city: 'Szczecin', productName: 'Granaty rodolity', timeAgo: '17 min temu'},
    {customerInitials: 'J.D.', city: 'Lublin', productName: 'Rubinowe serce', timeAgo: '20 min temu'},
    {customerInitials: 'T.B.', city: 'Białystok', productName: 'Rodolit + tanzanit', timeAgo: '22 min temu'},
    {customerInitials: 'W.M.', city: 'Katowice', productName: 'Granaty rodolity', timeAgo: '24 min temu'},
    {customerInitials: 'L.P.', city: 'Częstochowa', productName: 'Rubinowe serce', timeAgo: '26 min temu'},
    {customerInitials: 'K.O.', city: 'Radom', productName: 'Rodolit + tanzanit', timeAgo: '28 min temu'},
    {customerInitials: 'N.R.', city: 'Toruń', productName: 'Granaty rodolity', timeAgo: '30 min temu'},
    {customerInitials: 'P.Q.', city: 'Kielce', productName: 'Rubinowe serce', timeAgo: '32 min temu'},
    {customerInitials: 'M.F.', city: 'Rzeszów', productName: 'Rodolit + tanzanit', timeAgo: '34 min temu'},
    {customerInitials: 'A.T.', city: 'Olsztyn', productName: 'Granaty rodolity', timeAgo: '36 min temu'},
    {customerInitials: 'J.W.', city: 'Bielsko-Biała', productName: 'Rubinowe serce', timeAgo: '38 min temu'},
    {customerInitials: 'G.S.', city: 'Zielona Góra', productName: 'Rodolit + tanzanit', timeAgo: '40 min temu'},
    {customerInitials: 'K.U.', city: 'Opole', productName: 'Granaty rodolity', timeAgo: '42 min temu'},
    {customerInitials: 'E.V.', city: 'Elbląg', productName: 'Rubinowe serce', timeAgo: '44 min temu'},
    {customerInitials: 'S.Q.', city: 'Kalisz', productName: 'Rodolit + tanzanit', timeAgo: '46 min temu'},
    {customerInitials: 'J.M.', city: 'Legnica', productName: 'Granaty rodolity', timeAgo: '48 min temu'},
    {customerInitials: 'T.L.', city: 'Grudziądz', productName: 'Rubinowe serce', timeAgo: '50 min temu'},
    {customerInitials: 'W.D.', city: 'Słupsk', productName: 'Rodolit + tanzanit', timeAgo: '52 min temu'},
    {customerInitials: 'L.N.', city: 'Nowy Sącz', productName: 'Granaty rodolity', timeAgo: '54 min temu'},
    {customerInitials: 'K.C.', city: 'Gorzów Wielkopolski', productName: 'Rubinowe serce', timeAgo: '56 min temu'},
    {customerInitials: 'N.W.', city: 'Jelenia Góra', productName: 'Rodolit + tanzanit', timeAgo: '58 min temu'},
    {customerInitials: 'P.Z.', city: 'Tarnów', productName: 'Granaty rodolity', timeAgo: '60 min temu'},
    {customerInitials: 'M.B.', city: 'Kędzierzyn-Koźle', productName: 'Rubinowe serce', timeAgo: '62 min temu'},
    {customerInitials: 'A.K.', city: 'Koszalin', productName: 'Rodolit + tanzanit', timeAgo: '64 min temu'}
  ];


  productViews = new Map<number, number>([
    [1, 5],
    [2, 2],
    [3, 7]
  ]);

  getProductViews(productId: number): number {
    return this.productViews.get(productId) ?? 0;
  }

  ngOnInit() {
  }
}
