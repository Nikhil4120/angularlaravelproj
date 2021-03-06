import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }
  getstate(){
    return this.http.get<State[]>(environment.localapi+'/state');
  }
}
