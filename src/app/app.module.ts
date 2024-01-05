import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpLink } from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
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
import { MyDialogModule } from './common/components/dialog/dialog.module';
import { BookmarksEffects } from './bookmarks/state/bookmarks.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects, BookmarksEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    AppRoutingModule,
    HeaderModule,
    LoginModule,
    SignUpModule,
    HttpClientModule,
    ApolloModule,
    MyDialogModule,
    BookmarkModule,
    MatProgressSpinnerModule,
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
