import { Component, OnInit } from '@angular/core';

import { ApiBase } from '../../../../modulo-dinamico/clases/api-base';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../../../clases/persona';
import { ApiService } from '../../../../servicios/api.service';

@Component({
  selector: 'app-persona',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  apiBase: ApiBase = { url: 'persona' };
  persona: Persona = new Persona();
  questions: any[];
  id: string;

  constructor(
    service: QuestionsService,
    activateRoute: ActivatedRoute,
    private http: ApiService,
    private router: Router,
  ) {
    this.id = activateRoute.snapshot.paramMap.get('id');
    this.questions = service.getQuestions();
  }

  ngOnInit() {
    if (this.id != 'nuevo') {
      this.obtenerPersona();
    }
  }

  obtenerPersona() {
    this.http.get(this.apiBase.url + '/' + this.id, {}).subscribe(res => {
      this.persona = res;

    });
  }

  obtenerDatos(persona: Persona) {
    if (this.id == 'nuevo') {
      this.guardarPersona(persona);
    } else {
      this.modificarPersona(persona)
    }
  }

  guardarPersona(persona: Persona) {
    this.http.post(this.apiBase.url, persona).subscribe((res: Persona) => {
      alert('Persona guardada correctamente');
      this.router.navigate(['/admin/' + this.apiBase.url + '/' + res.id]);
      this.persona = res;
      this.id = res.id.toString();
    }, error => {
      alert('Existió un error al guardar la persona');

    });
  }

  modificarPersona(persona: Persona) {
    this.http.patch(this.apiBase.url + '/' + this.id, persona).subscribe((res: Persona) => {
      alert('Persona modificada correctamente');
      this.persona = res;
      this.id = res.id.toString();
    }, error => {
      alert('Existió un error al modificar la persona');

    });
  }



}
