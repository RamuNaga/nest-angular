import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartheaderComponent } from './cartheader/cartheader.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FilterComponent } from './filter/filter.component';

import { RouterModule, Routes } from '@angular/router';

const shoppingRoutes: Routes = [
  {
    path: '',
  },
];

@Component({
    selector: 'app-shoppingcart',
    imports: [
        CartheaderComponent,
        ProductsListComponent,
        FilterComponent,
        RouterModule,
    ],
    templateUrl: './shoppingcart.component.html',
    styleUrl: './shoppingcart.component.scss'
})
export class ShoppingcartComponent {}
