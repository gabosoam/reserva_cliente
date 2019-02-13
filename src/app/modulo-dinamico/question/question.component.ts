import { Component, OnInit, Input } from '@angular/core';
import { QuestionBase } from '../clases/question-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  
  get isValid() { return this.form.controls[this.question.key].valid; }

}
