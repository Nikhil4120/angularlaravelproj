import { Component, OnInit } from '@angular/core';
import { About } from '../models/about.model';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  about = "";
  constructor(private aboutservice:AboutService) { }

  ngOnInit(): void {

    this.aboutservice.GetAbout().subscribe(data=>{
      this.about = data['content'];
    })

  }



}
