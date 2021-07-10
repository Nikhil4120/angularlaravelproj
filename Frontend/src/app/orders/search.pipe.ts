import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?:string ): any {
   if(!value)return null;
   if(!args)return value;
   args = args.toLowerCase();
   return value.filter(m=>m.product_name.toLowerCase().includes(args));
  }

}
