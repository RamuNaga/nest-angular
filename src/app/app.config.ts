import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, RouterStateSerializer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APOLLO_OPTIONS, provideApollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

import { appRoutes } from './app.routes';
import { appReducer } from './store/app.state';
import { CustomSerializer } from './store/router/custom-serializer';

// Import Effects
import { AuthEffects } from './auth/state/auth.effects';
import { BookmarksEffects } from './bookmarks/state/bookmarks/bookmarks.effects';
import { LinkEffects } from './bookmarks/state/links/links.effects';
import * as productEffects from './shoppingcart/state/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([])),
    provideAnimations(),
    provideApollo(() => ({
      cache: new InMemoryCache(),
    })),
    importProvidersFrom(HttpLink),

    // Provide Apollo GraphQL with proper HttpClient injection
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => {
        const httpClient = inject(HttpClient); // Inject HttpClient
        const httpLink = new HttpLink(httpClient); // Create HttpLink
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({ uri: 'api/graphql' }),
        };
      },
      deps: [HttpLink],
    },

    // Provide NgRx Store
    provideStore(appReducer),

    // Provide Effects
    provideEffects([
      AuthEffects,
      BookmarksEffects,
      LinkEffects,
      productEffects,
    ]),

    // Provide Store DevTools (Only in Development)
    provideStoreDevtools({ logOnly: !isDevMode() }),

    // Provide Router Store Serializer
    provideRouterStore(),
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
};
