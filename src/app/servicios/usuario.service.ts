import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario = new Usuario;
  private usuarioSubject = new BehaviorSubject(this.usuario);


  obtenerUsuario(): Observable<Usuario> {
    return this.usuarioSubject.asObservable();
  }

  private refresh() {
    this.usuarioSubject.next(this.usuario);
  }

  crearUsuario(usuario: Usuario) {
    /**
    * Evitar hacer this.user.push() pues estaríamos modificando los valores directamente,
    * se debe generar un nuevo array !!!!.
    */
    this.usuario = usuario
    this.refresh();
  }

  constructor() { }
}
