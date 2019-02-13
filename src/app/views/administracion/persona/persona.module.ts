import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaComponent } from './persona.component';
import { ModuloDinamicoModule } from '../../../modulo-dinamico/modulo-dinamico.module';
import { InformacionComponent } from './informacion/informacion.component';

@NgModule({
  declarations: [PersonaComponent, InformacionComponent],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    ModuloDinamicoModule
  ]
})
export class PersonaModule { }
