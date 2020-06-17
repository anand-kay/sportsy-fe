import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  networkSubscription: Subscription;

  products;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    this.networkSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getrecommended')  // TODO: Change to get recommended
      .subscribe((res) => {

        this.products = res;

      });

  }

  onRecClicked(clickedId) {

    // console.log(clickedId);

    this.router.navigateByUrl(`product/${clickedId}`);

    scrollTo(0, 0);

  }

}
