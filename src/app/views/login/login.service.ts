import { Injectable } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private api: ApiService, private router: Router, private usuarioService: UsuarioService) { }

  login(usuario: Usuario) {

    this.api.post('login', usuario).subscribe((res: any) => {
      localStorage.setItem('access-token', res.token)
      localStorage.setItem('usuario', JSON.stringify(res.user));

      console.log(res)
      
      this.router.navigate(["/admin/"]);
  
    }, error => {
      console.log(error)
    })
  }
}
