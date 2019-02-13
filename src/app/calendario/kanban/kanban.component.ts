import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  tareas: any[];

  constructor(private api: ApiService) { }

  ngOnInit() {
this.obtenerTareas();

  }

  obtenerTareas() {
    this.api.get('asignacion/vista', {}).subscribe((res: any[]) => {
      this.tareas = res;

    })
  }

}
