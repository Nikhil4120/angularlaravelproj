import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChangepasswordService } from '../services/changepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  @ViewChild('modal', { static: true }) modal;
  olderror = "";
  error = "";
  isloading = false;
  userid = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user_id;
  constructor(private changepasswordservice:ChangepasswordService) { }

  ngOnInit(): void {
    console.log(this.userid)
  }

  onSubmit(form:NgForm){
    this.olderror = "";
    if(form.value.new_password != form.value.confirm_password){
      this.error  = "Confirm password not match";
    }
    else{
      this.isloading = true;
      this.error = "";
      this.changepasswordservice.PasswordChange({current_password:form.value.current_password,new_password:form.value.new_password,userid:this.userid}).subscribe(data=>{
        
        this.isloading = false;
        if(data.success){
          form.reset();
          this.modal.nativeElement.click();
        }
        else{
          this.olderror = "your old password is wrong";
        }
      })
    }

  }

}
