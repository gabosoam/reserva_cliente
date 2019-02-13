import { Component, OnInit } from '@angular/core';
import { ApiBase } from '../../../modulo-dinamico/clases/api-base';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.scss']
})
export class LocalidadComponent implements OnInit {


  apiBase: ApiBase = { url: 'localidad' };

    questions: any[];

  constructor(service: QuestionsService) {
    this.questions = service.getQuestions();
  }

  ngOnInit() {
  }
}
