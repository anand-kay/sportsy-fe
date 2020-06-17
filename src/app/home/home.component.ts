import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredSubscription: Subscription;
  recommendedSubscription: Subscription;
  recentSubscription: Subscription;

  // isAuthenticated = false;  // TODO: Replace with actual check

  featuredTitle = 'Featured';
  featuredItems = [];
  recommendedTitle = 'Recommended';
  recommendedItems = [];
  recentTitle = 'Recents';
  recentItems = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.featuredSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getfeatured')
      .subscribe((res) => {

        res.forEach((product) => {
          this.featuredItems.push({
            id: product._id,
            price: 'US$ ' + product.price,
            imgUrl: product.image
          });

        });

      });

    this.recommendedSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getrecommended')
      .subscribe((res) => {

        res.forEach((product) => {
          this.recommendedItems.push({
            id: product._id,
            price: 'US$ ' + product.price,
            imgUrl: product.image
          });

        });

      });

    this.recentSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getrecent')
      .subscribe((res) => {

        if(res.isRecents)
        {
          this.recentTitle = 'Recents';
        }
        else
        {
          this.recentTitle = 'Badminton';
        }

        res.products.forEach((product) => {
          this.recentItems.push({
            id: product._id,
            price: 'US$ ' + product.price,
            imgUrl: product.image
          });

        });

      });

  }

}
