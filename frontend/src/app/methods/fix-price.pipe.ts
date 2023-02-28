import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixPrice'
})
export class FixPricePipe implements PipeTransform {

  transform(value: number): unknown {
    // Convert to String
   const numStr = String(value);
   // String Contains Decimal
   if (numStr.includes('.')) {
      const afterPointLength= numStr.split('.')[1].length;
      if(afterPointLength==1)
          return (value+'0') 
   };
   // String Does Not Contain Decimal
   return value.toFixed(2);
  }

}
