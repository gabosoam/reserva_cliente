import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any): any {
    return  moment.utc(value * 1000).format('HH:mm:ss');
  
  }

}