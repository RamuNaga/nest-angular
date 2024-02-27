import { Routes } from '@angular/router';
import { CartShellComponent } from './cart-shell/cart-shell.component';
import { ShoppingcartComponent } from '../shoppingcart.component';

export const CART_ROUTES: Routes = [
  {
    path: '',
    component: ShoppingcartComponent,
    children: [
      {
        path: '',
        component: CartShellComponent,
      },
    ],
  },
];
