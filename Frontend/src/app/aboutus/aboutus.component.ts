import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  about = '';
  constructor(
    private aboutservice: AboutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.aboutservice.GetAbout().subscribe(
      (data) => {
        this.about = data['content'];
      },
      (error) => {
        this.toastr.error('Something went wrong!!!');
      }
    );
  }
}
