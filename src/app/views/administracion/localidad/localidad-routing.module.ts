import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalidadComponent } from './localidad.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
  {path: '', component: LocalidadComponent, data: {title: 'Localidad'}},
  {path: ':id', component: InformacionComponent, data: {title: 'Información'}},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalidadRoutingModule { }
