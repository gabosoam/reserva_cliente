import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter, CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { registerLocaleData } from '@angular/common';
import localesEC from '@angular/common/locales/es-EC';
import { DayViewSchedulerComponent } from './day-view-scheduler/day-view-scheduler.component';
import { RouterModule } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';

registerLocaleData(localesEC);



@NgModule({
  declarations: [CalendarioComponent, DayViewSchedulerComponent, KanbanComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  exports: [CalendarioComponent, KanbanComponent]
})
export class CalendarioModule { }
