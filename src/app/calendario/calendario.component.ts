import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK,
  CalendarMonthViewDay
} from 'angular-calendar';
import { ApiService } from '../servicios/api.service';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  constructor(private modal: NgbModal, private http: ApiService) { }

  @ViewChild('modalContent') modalContent: TemplateRef<any>;


  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  @Input() draggable: boolean;
  @Output() hourSelection = new EventEmitter();

  users = [

  ];

  startOfDay = '8';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [

  ];

  activeDayIsOpen = true;

  excludeDays: number[] = [0];

  weekStartsOn = DAYS_OF_WEEK.MONDAY;


  ngOnInit() {
    this.obtenerOperadores();
  }

  obtenerOperadores() {
    this.http.get('persona', { es_empleado: true }).subscribe((res: any[]) => {
      this.users.push({ id: '', name: '00 Sin asignar', color: colors.red })
      res.forEach(element => {
        this.users.push({ id: element.id, name: element.nombre, color: colors.blue })
        this.obtenerDatos();
      });
    });
  }

  ver(event) {
    this.hourSelection.emit(event);
  }

  obtenerDatos() {
    this.http.get('asignacion/vista', {}).subscribe((res: any[]) => {
      this.events = [];
      res.forEach((elemento) => {

        var user;

        if (elemento.id_persona) {
          user = this.users.find(us => us.id == elemento.id_persona)
        } else {
          user = this.users[0]
        }

        this.events.push({
          id: elemento.id,
          title: elemento.producto,
          start: new Date(elemento.hora_inicio),
          end: new Date(elemento.hora_fin),
          color: colors.blue,
          draggable: this.draggable,

          meta: { user: user, info: elemento },
          resizable: {
            beforeStart: false,
            afterEnd: false
          }
        });


        this.refresh.next();
      });
    });
  }

  hourSegmentModifier(segment) {

    segment.body.hourGrid.forEach(grid => {
      grid.segments.forEach(segment => {
        if (new Date(segment.date).getHours() > 12 && new Date(segment.date).getHours() < 15) {

          segment.cssClass = 'cal-disabled';
        }
      });
    });
  }

  hourSegmentModifierMonth(segment) {
 

    segment.hourColumns.forEach(grid => {
      grid.hours.forEach(hour => {
       hour.segments.forEach(segment => {
        if (new Date(segment.date).getHours() > 12 && new Date(segment.date).getHours() < 15) {

          segment.cssClass = 'cal-disabled';
        }
       });
      });
     
    });
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  seleccionar(action: string, event: CalendarEvent): void {

    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    var t = new Date(event.start);
    var e = t.setSeconds(t.getSeconds() + event.meta.info.tiempo_estandar);

    event.end = new Date(e)

    if (event.meta.user.id == "") {
      this.http.patch('asignacion/' + event.id, { operador: null, hora_inicio: this.dateTOString(event.start) }).subscribe(res => {
      });
    } else {
      this.http.patch('asignacion/' + event.id, { operador: event.meta.user.id, hora_inicio: this.dateTOString(event.start) }).subscribe(res => {
      });
    }


  }

  dateTOString(date: Date): string {

    const year = date.getFullYear().toString();
    const month = date.getMonth() + 1;

    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + seconds;
  }






  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  userChanged({ event, newUser }) {
    event.meta.user = newUser;
    this.events = [...this.events];

    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }




}
