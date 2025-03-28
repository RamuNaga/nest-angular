import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Product } from '../models/product';
import { ProductCardComponent } from './product-card/product-card.component';
import { Store } from '@ngrx/store';
import * as productsSelector from '../state/products.selector';
import { productPageActions } from '../state/actions/products-page.action';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  standalone: true,
})
export class ProductsListComponent implements OnInit {
  store = inject(Store);
  productService = inject(ProductService);
  cartService = inject(CartService);
  products = this.productService.products;
  //products$ = this.store.select(productsSelector.selectProducts);

  ngOnInit(): void {
    this.store.dispatch(productPageActions.load());
  }

  onProductSelected(product: Product) {
    this.productService.productSelected(product.id);
    this.cartService.addToCart(product);
  }
}
