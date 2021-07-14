import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any, args: number): unknown {
    const previous = (args-1)*5;
    args = (args-1)*5  + 5;
    return value.slice(previous,args);
  }

}
