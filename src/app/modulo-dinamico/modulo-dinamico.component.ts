import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionBase } from './clases/question-base';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionControlService } from './servicios/question-control.service';
import { ApiBase } from './clases/api-base';
import { ApiService } from '../servicios/api.service';
import { TextboxQuestion } from './clases/question-textbox';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MensajesService } from '../servicios/mensajes.service';



@Component({
  selector: 'app-modulo-dinamico',
  templateUrl: './modulo-dinamico.component.html',
  styleUrls: ['./modulo-dinamico.component.scss'],
  providers: [QuestionControlService, MensajesService]
})
export class ModuloDinamicoComponent {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() apiBase: ApiBase = { url: '', irInformacion: false };


  formBusqueda: FormGroup = new FormGroup({})


  filtroBusqueda = ''

  form: FormGroup;
  payLoad = '';

  data = []
  collectionSize: number = 0;
  limite = '10'
  pagina = 1;

  error: string = ''

  public isCollapsed = true;




  constructor(
    private qcs: QuestionControlService,
    private apiService: ApiService,
    private modalService: NgbModal,
    private router: Router,
    private mensajesService: MensajesService
  ) {


  }

  ngOnInit() {
    this.questions.forEach(question => {
      if (question.controlType == 'dropdown') {
        this.formBusqueda.setControl(question.key, new FormControl('todos'))
      }
    })

    this.form = this.qcs.toFormGroup(this.questions);


    this.obtenerDatos()
  }

  nuevo() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  open(content) {
    this.modalService.open(content)
  }



  obtenerDatos() {
    const busqueda = this.filtroBusqueda.trim()
    const parametros: { limit?: number, skip?: number, sort?: string, where?: string } = {}

    const or = [];
    const and = [];

    this.questions.forEach(question => {
      if (question.controlType == 'textbox') {


        const textbox = new TextboxQuestion(question)
        if (textbox.type != 'number') {
          or.push({ [question.key]: { contains: busqueda } })
        }

  

      }
    });

    for (const key in this.formBusqueda.value) {
      if (this.formBusqueda.value[key] != 'todos') {
        and.push({ [key]: this.formBusqueda.value[key] })
      }
    }

    parametros.where = JSON.stringify({ or: or, and: and });

    if (this.limite != 'todos') {
      parametros.limit = parseInt(this.limite);
      parametros.skip = (this.pagina * parseInt(this.limite)) - parseInt(this.limite);
    }


    this.apiService.get(this.apiBase.url + '/count', { where: parametros.where }).subscribe((res: any) => {

      this.collectionSize = res.count;

    })


    this.apiService.get(this.apiBase.url, parametros).subscribe((res: any) => {

      this.data = res



    }, error => {

    })


  }

  guardarDatos() {

    this.apiService.post(this.apiBase.url, this.form.value).subscribe((res: any) => {
      this.data.splice(0, 0, res)
      this.collectionSize++
      this.modalService.dismissAll()

      this.isCollapsed = true;
      this.form.reset()
      this.mensajesService.mostrarMensaje('success', 'Elemento guardado', '')
      if (this.apiBase.irInformacion) {

      }
    }, error => {

      this.error = 'Existió un error'



      //this.mensajesService.mostrarMensaje('error', 'Existió un error', 'cedula repetida jovencito')
    })
  }

  cambiarUrl(id) {

    this.router.navigate([this.router.url + '/' + id])
  }

  editarElemento(elemento) {
    var coso = {}
    this.questions.forEach(question => {
      coso[question.key] = elemento[question.key]
    });
    this.form.setValue(coso);
    this.isCollapsed = false
  }

  eliminarElemento(elemento, indice) {

    this.apiService.delete(this.apiBase.url + '/' + elemento.id).subscribe(res => {
     this.obtenerDatos()
    })
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }
}
