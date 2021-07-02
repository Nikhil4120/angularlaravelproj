import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  success = "";
  error = "";
  constructor(private newsletterservice:NewsletterService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.success = "";
    this.error = ""
    if(!form.valid){
      return;
    }
    this.newsletterservice.NewsletterSubscribe(form.value.email).subscribe(data=>{
      if(data.success){
        this.success = data.message;
      }
      else{
        console.log(data.message);
        this.error = data.message.email;
      }
      form.reset();
    })
  }

}
