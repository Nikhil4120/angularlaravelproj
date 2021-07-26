import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(private toastr:ToastrService,private tokenservice:TokenService,private Authservice:AuthService){

  }
  ngOnInit(){
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.autologin();
  }

  autologin(){

    const token = this.tokenservice.get();

    if(token){
      this.Authservice.Refreshtoken(token);
    }

    this.tokenservice.isvalid();
    

  }

  
}
