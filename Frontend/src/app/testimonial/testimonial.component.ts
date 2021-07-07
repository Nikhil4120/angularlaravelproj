import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TestimonialService } from '../services/testimonial.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  envimage = environment.image;
  customOptions:OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  testimonials = [];

  constructor(private testimonialservice:TestimonialService) { }

  ngOnInit(): void {
    this.testimonialservice.Gettestimonial().subscribe(data=>{
      this.testimonials = data.data.splice(0,4);
    });
  }

}
