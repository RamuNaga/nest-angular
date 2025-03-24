import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { CreateUserInput } from '../../../generated-types';
import { Store } from '@ngrx/store';
import { Appstate } from '../../store/app.state';
import { loginStart } from '../state/auth.action';
import { setLoadingSpinner } from '../../store/Shared/shared.action';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router,
    private store: Store<Appstate>,
  ) {}

  ngOnInit(): void {}

  login(createUserData: CreateUserInput) {
    // this.loginService.login(createUserData).subscribe(() => {
    //   this.router.navigate(['/']);
    // });
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart(createUserData));
  }
}
