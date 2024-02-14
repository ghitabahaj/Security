import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const userRoles = this.authService.getUserRoles();
      if (userRoles.includes('ROLE_ADMIN') || userRoles.includes('MANAGER')|| userRoles.includes('ROLE_USER')) {
        return true;
      } else {
        this.router.navigateByUrl('/notAuthorized');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
