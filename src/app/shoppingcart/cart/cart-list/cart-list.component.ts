import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, NgFor, NgIf],
  templateUrl: 'cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  pageTitle = 'Cart Items';

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
}
