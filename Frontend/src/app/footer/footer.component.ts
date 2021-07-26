import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  success:string = "";
  error:string = "";
  constructor(private newsletterservice: NewsletterService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.success = "";
    this.error = ""
    if (!form.valid) {
      return;
    }
    this.newsletterservice.NewsletterSubscribe(form.value.email).subscribe(data => {
      if (data.success) {
        this.success = data.message;
      }
      else {
        
        this.error = data.message.email;
      }
      form.reset();
    },(error) => {
      this.toastr.error('Something went wrong!!!');
    })
  }

}
