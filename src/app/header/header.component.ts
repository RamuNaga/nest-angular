import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private readonly authService: AuthService) {
    this.isLoggedIn$ = this.authService.authenticated$;
  }
  logOut() {
    this.authService.logout();
  }
}
