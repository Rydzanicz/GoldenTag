import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    imports: [
        CommonModule
    ],
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
    product: any = null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.product = {
                id: +this.route.snapshot.paramMap.get('id')!,
                name: params['name'] || null,
                description: params['description'] || null,
                descriptionDetails: params['descriptionDetails'] || null,
                price: params['price'] || null,
                image: params['image'] || null,
            };

        });
    }

    formatCurrency(price: number): string {
        return new Intl.NumberFormat('pl-PL', {
            style: 'currency',
            currency: 'PLN',
            currencyDisplay: 'symbol',
        })
            .format(price)
            .replace(' zł', '');
    }
}
