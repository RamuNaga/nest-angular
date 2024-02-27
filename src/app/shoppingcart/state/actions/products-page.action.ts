import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const productPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    load: emptyProps(),
    select: props<Product>(),
  },
});
