import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Appstate } from '../../../store/app.state';
import { BookmarksGQL } from '../../../../generated-types';
import {
  fetchBookmarks,
  fetchBookmarksInit,
  fetchBookmarksSuccess,
} from './bookmarks.action';
import { EMPTY, catchError, exhaustMap, filter, map, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../../store/Shared/shared.action';

@Injectable()
export class BookmarksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<Appstate>,
    private readonly bookmarksGql: BookmarksGQL,
    private authService: AuthService,
  ) {}

  fetchBookmark$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fetchBookmarks),
        exhaustMap(() => {
          console.log('fectBookmarks callling');
          return this.bookmarksGql.watch().valueChanges.pipe(
            map((result) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              return fetchBookmarksSuccess({
                bookmarks: result.data.bookmarks,
              });
            }),
            catchError((errResp) => {
              let errorMessage = '';
              if (errResp && errResp.error && errResp.error.message) {
                errorMessage = this.authService.getErrorMessage(
                  errResp.error.message,
                );
                this.store.dispatch(setErrorMessage({ message: errorMessage }));
              }
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return EMPTY;
            }),
          );
        }),
      );
    },
    // { dispatch: false },
  );

  // init$ = this.actions$.pipe(
  //   ofType<Action>(fetchBookmarksInit),
  //   tap(console.log),
  // );

  // ngrxOnInitEffects(): Action {
  //   return { type: fetchBookmarksInit.type };
  // }
}
