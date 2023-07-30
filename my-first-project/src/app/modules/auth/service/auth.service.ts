import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../model/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) {}

  SignUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCTS5bIIEOBWo9ZbHa3gVWbpwU2TsREEuE',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthantication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  Login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCTS5bIIEOBWo9ZbHa3gVWbpwU2TsREEuE',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleAuthError),
        tap((resData) => {
          this.handleAuthantication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logOut() {
    localStorage.removeItem('userData');
    // this.router.navigate(['/auth'])
    this.user.next(null);
    window.location.href = '/auth';
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    console.log(userData);
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    this.user.next(loadedUser);
  }

  private handleAuthantication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = {
      email,
      userId,
      token,
      expirationDate,
    };
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleAuthError(errorRes: HttpErrorResponse) {
    let errMessage = 'An Unknown Error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email exists already';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'The password is invalid';
        break;
      case 'USER_DISABLED':
        errMessage = 'The user account has been disabled by an administrator';
        break;
    }
    return throwError(errMessage);
  }
}
