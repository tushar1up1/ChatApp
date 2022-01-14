import { Pipe, PipeTransform } from '@angular/core';
import { User } from './models/User';

@Pipe({
  name: 'firstletter'
})
export class FirstletterPipe implements PipeTransform {

  transform(value: User, ...args: any[]): any {
    return value.userName.charAt(0).toUpperCase();
  }

}
