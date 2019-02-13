import { Component, OnInit } from '@angular/core';
import { ApiBase } from '../../../modulo-dinamico/clases/api-base';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  apiBase: ApiBase = {url: 'persona'}
  
  questions: any[];

  constructor(service: QuestionsService) {
    this.questions = service.getQuestions();
  }

  ngOnInit() {
  }

}
