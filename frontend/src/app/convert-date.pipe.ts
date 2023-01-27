import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertDate'
})
export class ConvertDatePipe implements PipeTransform {

  transform(date: Date): string {
    let dt= new Date(date).toLocaleString('en-GB').substring(0,10);
    return dt;
  }

}
