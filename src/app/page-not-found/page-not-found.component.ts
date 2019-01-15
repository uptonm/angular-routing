import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  errorCode: string;
  errorMessage: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.errorCode = this.route.snapshot.data['errorCode'];
    this.errorMessage = this.route.snapshot.data['errorMessage'];
    this.route.data.subscribe((data: Data) => {
      this.errorCode = data['errorCode'];
      this.errorMessage = data['errorMessage'];
    });
  }
}
