import { createReducer, on } from '@ngrx/store';
import { productsActionAPI } from './actions/products.action';
import { productPageActions } from './actions/products-page.action';
import { Product } from '../models/product';

export const PRODUCT_FEATURE_KEY = 'productsFeature';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  selectedId: number | null;
}

export const initialState: ProductsState = {
  products: [],
  isLoading: false,
  selectedId: null,
};

export const productsReducer = createReducer(
  initialState,
  on(productPageActions.load, (state) => ({ ...state, isLoading: true })),
  on(productPageActions.select, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(productsActionAPI.loadProudctsSuccess, (state, { products }) => ({
    ...state,
    products,
    isLoading: false,
  })),
  on(productsActionAPI.loadProductsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
);
