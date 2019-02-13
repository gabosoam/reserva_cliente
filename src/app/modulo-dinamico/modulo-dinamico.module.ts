import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloDinamicoComponent } from './modulo-dinamico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { NgbPaginationModule, NgbCollapseModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormularioComponent } from './formulario/formulario.component';
import { RouterModule } from '@angular/router';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [ModuloDinamicoComponent, QuestionComponent, FormularioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbAlertModule,
    RouterModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })

  ],
  exports: [
    ModuloDinamicoComponent,
    FormularioComponent
  ]
})
export class ModuloDinamicoModule { }
