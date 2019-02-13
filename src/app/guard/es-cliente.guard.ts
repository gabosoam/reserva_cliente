import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class EsClienteGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      const usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));

   

      if (usuario.persona.es_cliente) {
        return true;
      } else {
        
        this.router.navigate(['/login']);
        return false;
      }
  }
}
