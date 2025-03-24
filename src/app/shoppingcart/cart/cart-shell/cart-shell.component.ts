import { Component } from '@angular/core';

import { CartListComponent } from '../cart-list/cart-list.component';
import { CartTotalComponent } from '../cart-total/cart-total.component';

@Component({
    imports: [CartListComponent, CartTotalComponent],
    styleUrl: './cart-shell.component.scss',
    template: `
    <div class="cartContainer">
      <app-cart-list />
      <app-cart-total />
    </div>
  `
})
export class CartShellComponent {}
