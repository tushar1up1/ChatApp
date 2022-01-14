import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './models/Message';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
 
  transform(value: Message, ...args: any[]): any {

    let date = new Date(value.timeStamp);
       
    return date.toLocaleString();
  }

}
