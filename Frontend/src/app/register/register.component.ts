import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checks = false;
  isshown = false;
  error = "";
  @ViewChild('authForm',{static:false}) regform:NgForm;
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.error = ""; 
    console.log(form.value);
    if(form.value.agree){
      this.AuthService.signup(form.value);
    }
    else{
      this.error = "please Agree with Terms and Condition";
    }
  }
  
  showtextbox(e){
    
    if(e.target.checked){
      
      this.isshown = true;
    }
    else{
      this.isshown = false;
    }
  }
  onclear(){
    this.regform.reset();
  }
}
