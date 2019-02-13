import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalidadRoutingModule } from './localidad-routing.module';
import { LocalidadComponent } from './localidad.component';
import { ModuloDinamicoModule } from '../../../modulo-dinamico/modulo-dinamico.module';
import { InformacionComponent } from './informacion/informacion.component';

@NgModule({
  declarations: [LocalidadComponent, InformacionComponent],
  imports: [
    CommonModule,
    LocalidadRoutingModule,
    ModuloDinamicoModule
  ]
})
export class LocalidadModule { }
