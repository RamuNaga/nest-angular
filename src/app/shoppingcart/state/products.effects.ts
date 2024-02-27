import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { productPageActions } from './actions/products-page.action';
import { catchError, concatMap, map, of } from 'rxjs';
import { productsActionAPI } from './actions/products.action';

export const loadProducts = createEffect(
  (actions$ = inject(Actions), productService = inject(ProductService)) => {
    return actions$.pipe(
      ofType(productPageActions.load),
      concatMap(() =>
        productService.productlist$.pipe(
          map((products) => {
            return productsActionAPI.loadProudctsSuccess({ products });
          }),
          catchError((error) =>
            of(productsActionAPI.loadProductsFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
