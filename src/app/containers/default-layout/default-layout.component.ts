import { Component, OnDestroy } from '@angular/core';
import { navItems } from './../../_nav';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  private usuario: Usuario = JSON.parse(localStorage.getItem('usuario'));
  constructor() {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });


  }

  cerrarSesion(){
    localStorage.removeItem("access-token");
    localStorage.removeItem("usuario")
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
