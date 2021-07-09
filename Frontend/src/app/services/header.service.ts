import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private subcategory = "";
  obs = new Subject<any>();

  constructor() { }

  Storesubcategory(name){
    this.subcategory = name;
    this.obs.next(this.subcategory);
  }

  Getsubcategory(){
    
    return this.subcategory;
  }
}
