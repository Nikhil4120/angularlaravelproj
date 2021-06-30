import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isloading = false;
  error = "";
  constructor(private AuthService:AuthService,private tokenservice:TokenService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.error = "";
    let authobs:Observable<any>;
      this.isloading = true;
   authobs = this.AuthService.login(form.value);
   authobs.subscribe(data=>{
    this.isloading=false;
    console.log(data);
    form.reset();
    this.tokenservice.handle(data.token);
    this.AuthService.changeAuthStatus(true);
    this.router.navigate(['/userprofile']);

  },error=>{
    console.log(error.error.message);
    this.isloading=false;
    this.error = error.error.message;
  })

  }

  

}
