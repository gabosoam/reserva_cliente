import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion.component';
import { EstaLogueadoGuard } from '../../guard/esta-logueado.guard';

const routes: Routes = [
  {
    path: '',
    component: AdministracionComponent, canActivate: [EstaLogueadoGuard],
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'prefix'},
      { path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule' },
      { path: 'persona', loadChildren: './persona/persona.module#PersonaModule', data: {title: 'Personas'} },
      { path: 'localidad', loadChildren: './localidad/localidad.module#LocalidadModule', data: {title: 'Localidad'} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
