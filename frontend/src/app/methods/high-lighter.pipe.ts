import { Pipe, PipeTransform } from '@angular/core';

/**
 * When added to the HTML- the text can be highlighted according to the search input text.
 */

@Pipe({
  name: 'highLighter'
})
export class HighlighterPipe implements PipeTransform {

  transform(value: any, args: any, type:string): unknown {
    if(!args) return value;
    if(type==='full'){
      const re = new RegExp("\\b("+args+"\\b)", 'igm');
      value= value.replace(re, '<span class="highlighted-text">$1</span>');
    }
    else{
      const re = new RegExp(args, 'igm');
      value= value.replace(re, '<span class="highlighted-text">$&</span>');
    }
      return value;
  }

}
