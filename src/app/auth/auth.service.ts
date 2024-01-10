import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticated = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticated.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) {}

  isAuthenticated() {
    return this.httpClient.get<boolean>('api/auth').pipe(
      tap((data) => {
        this.authenticated.next(data);
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }

  logout() {
    this.httpClient.post('api/auth/logout', {}).subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/login']);
    });
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return message;
    }
  }
}
