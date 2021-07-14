import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  Addreview(data){
    return this.http.post(environment.localapi+'/addreview',data
    );
  }

  Allreview(id){
    return this.http.get<Review[]>(environment.localapi+'/allreview/'+id);
  }


}
