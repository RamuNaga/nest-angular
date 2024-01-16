import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Appstate } from '../../../store/app.state';
import { AuthService } from '../../../auth/auth.service';
import { LinksGQL } from '../../../../generated-types';
import { fetchLinksByUrls, fetchLinksByUrlsSuccess } from './links.action';
import { EMPTY, catchError, exhaustMap, map, switchMap } from 'rxjs';
import {
  setDialogPopup,
  setErrorMessage,
  setLoadingSpinner,
} from '../../../store/Shared/shared.action';
import { initialState } from './links.state';

@Injectable()
export class LinkEffects {
  constructor(
    private actions$: Actions,
    private store: Store<Appstate>,
    private authService: AuthService,
    private readonly linksGQL: LinksGQL,
  ) {}

  fetchlinksByUrls$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fetchLinksByUrls),
        switchMap((action) => {
          return this.linksGQL.watch({ urls: action.urls }).valueChanges.pipe(
            map((result) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setErrorMessage({ message: '' }));
              return fetchLinksByUrlsSuccess({
                links: result.data.links,
              });
            }),
            catchError((errResp) => {
              let errorMessage = '';
              if (errResp) {
                errorMessage = this.authService.getErrorMessage(
                  errResp.message,
                );
                this.store.dispatch(setErrorMessage({ message: errorMessage }));
              }
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.store.dispatch(setDialogPopup({ showDialog: true }));
              this.store.dispatch(
                fetchLinksByUrlsSuccess({ links: initialState.links }),
              );
              return EMPTY;
            }),
          );
        }),
      );
    },
    // { dispatch: false },
  );
}
