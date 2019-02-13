import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { AdministracionComponent } from './administracion.component';
import { JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations: [AdministracionComponent],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ],
  providers:[JwtHelperService]
})
export class AdministracionModule { }
