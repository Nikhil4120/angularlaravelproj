import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private currency = "inr";
  obs = new BehaviorSubject("inr");
  constructor(private locationservice:LocationService) { 
    this.locationservice.Getlocation().subscribe(data=>{
      if(data['country']!='India'){
        this.currency = 'usd';
      }
      else{
        this.currency = 'inr';
      }
      this.obs.next(this.currency);
    });
  }

  

  

  Storecurrency(name){
    this.currency = name;
    this.obs.next(this.currency);
  }

  Getcurrency(){
    
    return this.currency;
  }

}
