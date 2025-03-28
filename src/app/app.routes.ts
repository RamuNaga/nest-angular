import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { BookmarkComponent } from './bookmarks/bookmark/bookmark.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./shoppingcart/shopping-routes').then(
        (shopping) => shopping.SHOPPING_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shoppingcart/cart/cart-routes').then(
        (cart) => cart.CART_ROUTES,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'bookmarks',

    loadComponent: () =>
      import('./bookmarks/bookmarks.component').then(
        (c) => c.BookmarksComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'bookmarks/details/:id',
    component: BookmarkComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
