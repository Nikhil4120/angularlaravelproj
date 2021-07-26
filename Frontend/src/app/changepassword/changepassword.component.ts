import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChangepasswordService } from '../services/changepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: ElementRef;
  olderror: string = '';
  error: string = '';
  isloading: boolean = false;
  userid: number = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    .user_id;
  oldpassword = { type: 'password' };
  newpassword = { type: 'password' };
  confirmpassword = { type: 'password' };
  constructor(
    private changepasswordservice: ChangepasswordService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.olderror = '';
    if (form.value.new_password != form.value.confirm_password) {
      this.error = 'Confirm password not match';
    } else {
      this.isloading = true;
      this.error = '';
      this.changepasswordservice
        .PasswordChange({
          current_password: form.value.current_password,
          new_password: form.value.new_password,
          userid: this.userid,
        })
        .subscribe(
          (data) => {
            this.isloading = false;
            if (data.success) {
              form.reset();
              this.modal.nativeElement.click();
              this.toastr.success('Your Password hasbeen Changed');
            } else {
              this.olderror = 'Your password is wrong';
            }
          },
          (error) => {
            this.toastr.error('Something went wrong!!!');
          }
        );
    }
  }

  typechange(e, name) {
    if (name == 'oldpassword') {
      if (this.oldpassword.type == 'password') {
        this.oldpassword.type = 'text';
      } else {
        this.oldpassword.type = 'password';
      }
    } else if (name == 'newpassword') {
      if (this.newpassword.type == 'password') {
        this.newpassword.type = 'text';
      } else {
        this.newpassword.type = 'password';
      }
    } else if (name == 'confirmpassword') {
      if (this.confirmpassword.type == 'password') {
        this.confirmpassword.type = 'text';
      } else {
        this.confirmpassword.type = 'password';
      }
    }
  }
}
