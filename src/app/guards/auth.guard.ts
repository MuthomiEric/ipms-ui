import { Injectable,Inject, PLATFORM_ID  } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: any) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = null
if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token'); 
    }
    if (!token) {
      // If no token, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
