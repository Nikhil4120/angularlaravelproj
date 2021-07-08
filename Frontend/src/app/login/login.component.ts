import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal;
  @ViewChild('openmodal', { static: true }) openmodal;
  isloading = false;
  error = '';

  constructor(
    private AuthService: AuthService,
    private tokenservice: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalopen();
  }

  onSubmit(form: NgForm) {
    this.error = '';
    let authobs: Observable<any>;
    this.isloading = true;
     this.AuthService.login(form.value).subscribe(
      (data) => {
        this.isloading = false;

        form.reset();
        this.tokenservice.handle(data['token']);
        this.AuthService.changeAuthStatus(true);
        this.modal.nativeElement.click();
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error.error.message);
        this.isloading = false;
        this.error = error.error.message;
      }
    );
    
  }

  modalopen(){
    console.log(this.openmodal);        
  }

  modalclose() {
    this.modal.nativeElement.click();
  }
  
}
