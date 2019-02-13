import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../clases/usuario';
import { ApiService } from '../../servicios/api.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  usuario: Usuario = { email: 'gasalazaror@gmail.com', password: '12345' }
  constructor(private servicio: LoginService, private router: Router) { }


  login() {
    this.servicio.login(this.usuario)
  }



}
