import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './persona.component';
import { InformacionComponent } from './informacion/informacion.component';

const routes: Routes = [
  {path: '', component: PersonaComponent, data: {title: 'Personas'}},
  {path: ':id', component: InformacionComponent, data: {title: 'Información Personas'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
