import { Component, OnInit } from '@angular/core';
import { ApiBase } from '../../../../modulo-dinamico/clases/api-base';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../servicios/api.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss']
})
export class InformacionComponent implements OnInit {

  apiBase: ApiBase = { url: 'localidad' };
  localidad: any = {}
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
      this.obtenerLocalidad();
    }
  }

  obtenerLocalidad() {
    this.http.get(this.apiBase.url + '/' + this.id, {}).subscribe(res => {
      console.log(res)
      this.localidad = res;

    });
  }

  obtenerDatos(localidad:any) {
    if (this.id == 'nuevo') {
      this.guardarLocalidad(localidad);
    } else {
      this.modificarLocalidad(localidad)
    }
  }

  guardarLocalidad(localidad:any) {
    this.http.post(this.apiBase.url, localidad).subscribe((res: any) => {
      alert('localidad guardada correctamente');
      this.router.navigate(['/admin/' + this.apiBase.url + '/' + res.id]);
      this.localidad = res;
      this.id = res.id.toString();
    }, error => {
      console.log(error)
      alert('Existió un error al guardar la localidad');

    });
  }

  modificarLocalidad(localidad) {
    this.http.patch(this.apiBase.url + '/' + this.id, localidad).subscribe((res: any) => {
      alert('localidad modificada correctamente');
      this.localidad = res;
      this.id = res.id.toString();
    }, error => {
      alert('Existió un error al modificar la localidad');

    });
  }


}
