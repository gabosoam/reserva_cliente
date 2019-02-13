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

      new TextboxQuestion({
        key: 'ubicacion',
        label: 'Ubicación',
        value: '',
        required: true,
        order: 1
      }),


      new TextboxQuestion({
        key: 'descripcion',
        label: 'Descripción',
        value: '',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'foto',
        label: 'Foto',
        type: 'text',
        value: '',
        required: true,
        order: 1
      }),
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }
}
