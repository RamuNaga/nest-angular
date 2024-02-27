import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProducts from './products.reducer';

export const selectProductsState =
  createFeatureSelector<fromProducts.ProductsState>(
    fromProducts.PRODUCT_FEATURE_KEY,
  );

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products,
);

export const selectIsLoading = createSelector(
  selectProductsState,
  (state) => state.isLoading,
);

export const selectSelectedId = createSelector(
  selectProductsState,
  (state) => state.selectedId,
);

export const selectSelectedScientist = createSelector(
  selectSelectedId,
  selectProducts,
  (selectedId, products) => products.find((p) => p.id === selectedId),
);
