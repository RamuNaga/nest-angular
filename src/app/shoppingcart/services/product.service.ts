import { Injectable, inject, signal } from '@angular/core';
import { delay, of } from 'rxjs';
import { products } from '../data-access/db-data';
import { Store } from '@ngrx/store';
import * as productsSelector from '../state/products.selector';

import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  productlist$ = of(products).pipe(delay(1500));

  store = inject(Store);
  products$ = this.store.select(productsSelector.selectProducts);

  // Expose signals from this service
  products = toSignal(this.products$, { initialValue: [] as Product[] });
  selectedProduct = signal<Product | undefined>(undefined);

  constructor() {}

  productSelected(id: number) {
    const foundVehicle = this.products().find((p) => p.id === id);
    this.selectedProduct.set(foundVehicle);
  }
}
