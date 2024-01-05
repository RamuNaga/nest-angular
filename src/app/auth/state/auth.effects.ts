import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store/app.state';
import { Router } from '@angular/router';
import { loginStart, loginSuccess } from './auth.action';
import { EMPTY, catchError, exhaustMap, map, of, tap } from 'rxjs';
import {
  setDialogPopup,
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/Shared/shared.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private authService: AuthService,
    private store: Store<Appstate>,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        const loginRequest = { email: action.email, password: action.password };
        return this.loginService.login(loginRequest).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.store.dispatch(setDialogPopup({ showDialog: false }));
            return loginSuccess({ user: data, redirect: true });
          }),
          catchError((errResp) => {
            let errorMessage = '';
            if (errResp && errResp.error && errResp.error.message) {
              errorMessage = this.authService.getErrorMessage(
                errResp.error.message,
              );
              this.store.dispatch(setErrorMessage({ message: errorMessage }));
            }
            this.store.dispatch(setDialogPopup({ showDialog: true }));
            return EMPTY; //of(setErrorMessage({ message: errorMessage }));
          }),
        );
      }),
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/home']);
          }
        }),
      );
    },
    { dispatch: false },
  );
}
