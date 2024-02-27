import { createActionGroup, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const productsActionAPI = createActionGroup({
  source: 'Products API',
  events: {
    'Load Proudcts Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  },
});
