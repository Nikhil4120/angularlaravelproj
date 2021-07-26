import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
})
export class ContactusComponent implements OnInit {
  isloading:boolean = false;
  constructor(
    private contactservice: ContactService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isloading = true;
    this.contactservice.Contactus(form.value).subscribe(
      (data) => {
        this.isloading = false;
        form.reset();
        this.toastr.success('Mail Sent Successfully');
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
