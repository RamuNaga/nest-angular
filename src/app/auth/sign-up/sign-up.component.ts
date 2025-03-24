import { Component, Inject, OnInit } from '@angular/core';
import { CreateUserGQL, CreateUserInput } from '../../../generated-types';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { concat, concatMap } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    standalone: false
})
export class SignUpComponent implements OnInit {
  constructor(
    private readonly createUserGql: CreateUserGQL,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {}

  signUp(createUserData: CreateUserInput) {
    console.log(createUserData, this.createUserGql);
    this.createUserGql
      .mutate({ createUserData })
      .pipe(
        concatMap(() => {
          return this.loginService.login(createUserData);
        }),
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
