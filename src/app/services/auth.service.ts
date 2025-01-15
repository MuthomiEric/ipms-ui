import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginDto, RegistrationDto, TokenResponse } from '../models/auth.models';
import { isPlatformBrowser } from '@angular/common';
import { catchError ,tap} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'token';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Exposing the observable

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  login(loginDto: LoginDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, loginDto).pipe(
      catchError(this.handleError),
      tap((response) => {
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(registerDto: RegistrationDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/register`, registerDto).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value; // Return the current login status
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY); // Remove token from localStorage
      this.isLoggedInSubject.next(false); // Update the login state
    }
  }

  private checkLoginStatus(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.TOKEN_KEY); // Check token in localStorage only in the browser
    }
    return false; // Return false on the server side
  }

  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
