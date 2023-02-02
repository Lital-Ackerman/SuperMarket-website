import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highLighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: any,type:string): unknown {
    console.log(args)
    console.log(type)
    if(!args) return value;
    if(type==='full'){
      const re = new RegExp("\\b("+args+"\\b)", 'igm');
      value= value.replace(re, '<span class="highlighted-text">$1</span>');
    }
    else{
      const re = new RegExp(args, 'igm');
      console.log(re)
      value= value.replace(re, '<span class="highlighted-text">$&</span>');
    }

      return value;
  }

}
