import { Routes } from '@angular/router';
import { ShoppingcartComponent } from './shoppingcart.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CartShellComponent } from './cart/cart-shell/cart-shell.component';

export const SHOPPING_ROUTES: Routes = [
  {
    path: '',
    component: ShoppingcartComponent,
    children: [
      {
        path: '',
        component: ProductsListComponent,
      },
      {
        path: 'cart',
        component: CartShellComponent,
      },
    ],
  },
];
