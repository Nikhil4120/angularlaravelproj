import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
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
  usercreated = false;
  checked = [];
  isLoading = false;
  @ViewChild('authForm',{static:false}) regform:NgForm;
  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }
  checkboxchange(e,name:string){
    if(e.target.checked){
      this.checked.push(name);
      console.log(this.checked);

    }
    else{
      this.checked.splice(this.checked.indexOf(name),1);
      console.log(this.checked);
    }

  }
  onSubmit(form:NgForm){
    this.error = ""; 
    console.log(form.value);
    if(form.value.agree){
      if(form.value.all){
        this.checked = ['men','women','kids'];
      }
      if(form.value.other){
        this.checked.push(form.value.otheri);
      }
      let authobs:Observable<any>;
      this.isLoading = true;
      
      authobs = this.AuthService.signup(form.value,this.checked);
      authobs.subscribe(data=>{
        this.isLoading=false;
        this.usercreated = true;
        this.regform.reset();    
      })
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
