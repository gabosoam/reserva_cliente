import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioClienteComponent } from './inicio-cliente.component';

const routes: Routes = [
  {path: '', component: InicioClienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioClienteRoutingModule { }
