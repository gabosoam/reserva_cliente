import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root',
})


export class EstaLogueadoGuard implements CanActivate {

  constructor(public jwtHelper: JwtHelperService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!localStorage.getItem('access-token')) {
      this.router.navigate(['/login']);
      return false
    }
    const token = localStorage.getItem('access-token')

    if (!this.jwtHelper.isTokenExpired(token)) {

      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }



  }


}
