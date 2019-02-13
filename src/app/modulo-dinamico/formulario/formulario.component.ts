import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from '../clases/question-base';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../servicios/question-control.service';
import { ApiBase } from '../clases/api-base';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [QuestionControlService]
})
export class FormularioComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() apiBase: ApiBase = { url: '', irInformacion: false };
  @Input() id;
  form: FormGroup;
  @Output() guardar = new EventEmitter<any>();

  constructor(private qcs: QuestionControlService, private apiService: ApiService) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    if (this.id != 'nuevo') {
      this.obtenerDatos();
    }

  }

  obtenerDatos() {

    this.apiService.get(this.apiBase.url + '/' + this.id, {}).subscribe(res => {
      if (res) {
        var coso = {}
        this.questions.forEach(question => {
          coso[question.key] = res[question.key]
        });
        this.form.setValue(coso);
      }
    })


  }

  editar() {
    this.guardar.emit(this.form.value);
  }

}
