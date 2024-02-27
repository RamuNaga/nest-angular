import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLink } from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpModule } from './auth/sign-up/sign-up.module';
import { LoginModule } from './auth/login/login.module';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkModule } from './bookmarks/bookmark/bookmark.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyCommonModule } from './common/common.module';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { BookmarksEffects } from './bookmarks/state/bookmarks/bookmarks.effects';
import { LinkEffects } from './bookmarks/state/links/links.effects';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { HeaderComponent } from './header/header.component';
import * as productEffects from './shoppingcart/state/products.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderComponent,
    LoginModule,
    SignUpModule,
    HttpClientModule,
    ApolloModule,
    BookmarkModule,
    MyCommonModule,
    MatProgressSpinnerModule,
    ShoppingcartComponent,
    EffectsModule.forRoot([
      AuthEffects,
      BookmarksEffects,
      LinkEffects,
      productEffects,
    ]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'api/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
