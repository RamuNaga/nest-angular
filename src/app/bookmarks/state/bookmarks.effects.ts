import { Injectable } from '@angular/core';
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Appstate } from '../../store/app.state';
import { BookmarksGQL } from '../../../generated-types';
import { fetchBookmarks, fetchBookmarksSuccess } from './bookmarks.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/Shared/shared.action';

@Injectable()
export class BookmarksEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private store: Store<Appstate>,
    private readonly bookmarksGql: BookmarksGQL,
    private authService: AuthService,
  ) {}

  fetchBookmark$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBookmarks),
      exhaustMap((action) => {
        //console.log('fectBookmarks callling');
        return this.bookmarksGql.watch().valueChanges.pipe(
          map((result) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            return fetchBookmarksSuccess({ bookmarks: result.data.bookmarks });
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
            return of(setErrorMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });

  init$ = this.actions$.pipe(ofType<Action>(fetchBookmarks), tap(console.log));

  ngrxOnInitEffects(): Action {
    return { type: fetchBookmarks.type };
  }
}
