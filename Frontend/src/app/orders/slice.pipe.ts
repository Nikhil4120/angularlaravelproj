import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    return value.substring(0,30);
  }

}
