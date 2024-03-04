import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../cart/cart';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Manage state with signals
  cartItems = signal<CartItem[]>([]);

  // Total up the extended price for each item
  subTotal = computed(() =>
    this.cartItems().reduce(
      (a, b) => a + b.quantity * Number(b.product.price),
      0,
    ),
  );

  // Delivery is free if spending more than 100,000 credits
  deliveryFee = computed(() =>
    this.subTotal() > 1000 ? this.subTotal() / 500 : this.subTotal() / 200,
  );

  // Tax could be based on shipping address zip code
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);

  // Total price
  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax(),
  );

  // Add the Product to the cart
  // If the item is already in the cart, increase the quantity
  addToCart(product: Product): void {
    const index = this.cartItems().findIndex(
      (item) => item.product.id === product.id,
    );
    if (index === -1) {
      // Not already in the cart, so add with default quantity of 1
      this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
    } else {
      // Already in the cart, so increase the quantity by 1
      this.cartItems.update((items) => [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1),
      ]);
    }
  }

  // Remove the item from the cart
  removeFromCart(cartItem: CartItem): void {
    // Update the cart with a new array containing
    // all but the filtered out deleted item
    this.cartItems.update((items) =>
      items.filter((item) => item.product.id !== cartItem.product.id),
    );
  }

  updateInCart(cartItem: CartItem, quantity: number) {
    // Update the cart with a new array containing
    // the updated item and all other original items
    this.cartItems.update((items) =>
      items.map((item) =>
        item.product.title === cartItem.product.title
          ? { product: cartItem.product, quantity }
          : item,
      ),
    );
  }
}
