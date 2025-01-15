import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor.service'; 

@Injectable({
  providedIn: 'root', 
})
export class AppService {
  static configureHttpInterceptor() {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    };
  }
}
