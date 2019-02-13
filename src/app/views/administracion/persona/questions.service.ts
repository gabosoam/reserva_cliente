import { Injectable } from '@angular/core';
import { QuestionBase } from '../../../modulo-dinamico/clases/question-base';
import { TextboxQuestion } from '../../../modulo-dinamico/clases/question-textbox';
import { DropdownQuestion } from '../../../modulo-dinamico/clases/question-dropdown';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  getQuestions() {
 
    let questions: QuestionBase<any>[] = [
 
     
      new TextboxQuestion({
        key: 'nombre',
        label: 'Nombre',
        value: '',
        required: true,
        order: 1
      }),

      new DropdownQuestion({
        key: 'estado',
        label: 'Estado',
        options: [
          {key: true,  value: 'Activo'},
          {key: false,  value: 'Inactivo'},
        ],
        value: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'identificacion',
        label: 'Identificación',
        value: '',
        required: true,
        order: 1
      }),

   

      new TextboxQuestion({
        key: 'direccion',
        label: 'Dirección',
        value: '',
        order: 1
      }),

      new TextboxQuestion({
        key: 'telefono',
        label: 'Teléfonos',
        value: '',
        order: 1
      }),

      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        value: '',
        order: 1,
        require: true
      }),

      new DropdownQuestion({
        key: 'es_admin',
        label: 'Administrador',
        options: [
          {key: true,  value: 'Si'},
          {key: false,  value: 'No'},
        ],
        value: true,
        order: 2
      }),

      new DropdownQuestion({
        key: 'es_guia',
        label: 'Guia',
        options: [
          {key: true,  value: 'Si'},
          {key: false,  value: 'No'},
        ],
        value: 'false',
        order: 2
      }),

      new DropdownQuestion({
        key: 'es_tourPlaning',
        label: 'Tour planing',
        options: [
          {key: true,  value: 'Si'},
          {key: false,  value: 'No'},
        ],
        value: 'false',
        order: 2
      }),
 
     
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }
}
