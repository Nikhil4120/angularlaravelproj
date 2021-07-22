import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converter'
})
export class ConverterPipe implements PipeTransform {

  transform(value: number, args: string): any {
    if(args == 'inr'){
      return value;
    }
    else{
      return value/70;
    }
  }

}
