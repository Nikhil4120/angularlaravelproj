import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ChangepasswordService } from '../services/changepassword.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit , OnDestroy {

  isloading = false;
  error = "";
  phase = 1;
  otp = "";
  starttime:number = 0;
  minutes =0;
  seconds = 0;
  cleartime;
  email = "";
  newpassword = {type:'password'};
  confirmpassword = {type:'password'};
  @ViewChild('modal', { static: true }) modal;

  @ViewChild('forgetForm',{static:false}) forgetform;
  constructor(private changepasswordservice:ChangepasswordService,private AuthService:AuthService,private tokenservice:TokenService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    this.error = "";
    this.isloading = true;
    this.changepasswordservice.PasswordForget(form.value).subscribe(data=>{
      this.isloading = false;
      if(data.success){
        this.email = form.value.email;
        form.reset();
        this.phase = 2
        this.otp = data.data;
        this.starttime = new Date().getTime();
        console.log(this.starttime);
        this.cleartime = setInterval(()=>{this.Timecount(this.starttime)},1000)
      }
      else{
        this.error = data.data;
      }
    })

  }

  resetall(){
    this.forgetform.reset();
    this.error = "";
    this.phase = 1;
    this.ngOnDestroy();
  }

  otpSubmit(form:NgForm){
    this.error = "";
    if(form.value.otp == this.otp){
      form.reset();
      this.phase = 3;
    }
    else{
      this.error = "Otp is invalid or expired";
    }

  }

  passwordSubmit(form:NgForm){
    this.error = "";
    if(form.value.password != form.value.confirmpassword){
      this.error = "Confirm Password is not match";
    }
    else{
      this.isloading = true;
    this.changepasswordservice.PasswordReset({password:form.value.password,email:this.email}).subscribe(data=>{
      
      this.AuthService.login({email:this.email,password:form.value.password}).subscribe(data=>{
        this.isloading = false;
        this.tokenservice.handle(data['token']);
        this.AuthService.changeAuthStatus(true);
        this.modal.nativeElement.click();
        this.toastr.success("Password Changed Successfully");
      })
    })
    }
    
  }

  Timecount(starttime){
    
    let date = new Date().getTime();
    
    let diff = date - starttime;
    
    if(diff <= 15*60*1000){
      let time_diff = 15*60*1000 - diff;
      let seconds = time_diff/1000;
      this.minutes = Math.floor(seconds/60);
      this.seconds = Math.floor(seconds % 60);
    }
    else{
      this.otp = "";
      clearInterval(this.cleartime);
    }

  }

  typechange(e,name){
    
    
    
    if(name == "newpassword"){
      if(this.newpassword.type == "password"){
        this.newpassword.type = "text";
      }
      else{
        this.newpassword.type = "password";
      }
    }
    else if(name == "confirmpassword"){
      if(this.confirmpassword.type == "password"){
        this.confirmpassword.type = "text";
      }
      else{
        this.confirmpassword.type = "password";
      }
    }
  
  
    
  
}

skippassword(){
 this.changepasswordservice.Skippassword({email:this.email}).subscribe(data=>{
        this.tokenservice.handle(data['token']);
        this.AuthService.changeAuthStatus(true);
        this.modal.nativeElement.click();   
        console.log(data);
 })
}


  ngOnDestroy(){

  }

}
