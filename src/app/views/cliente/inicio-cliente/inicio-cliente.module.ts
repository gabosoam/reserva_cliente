import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioClienteRoutingModule } from './inicio-cliente-routing.module';
import { InicioClienteComponent } from './inicio-cliente.component';

@NgModule({
  declarations: [InicioClienteComponent],
  imports: [
    CommonModule,
    InicioClienteRoutingModule
  ]
})
export class InicioClienteModule { }
