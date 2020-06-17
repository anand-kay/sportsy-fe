import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  networkSubscription: Subscription;

  product;

  constructor(private router: Router, private httpClient: HttpClient) {

    router.events.subscribe((e) => {

      if (e instanceof NavigationEnd) {
        
        this.fetchProduct();

      }

    });

  }

  ngOnInit() {

    this.fetchProduct();

    scrollTo(0, 0);

  }

  onReviewSubmitted(isSubmitted) {

    if (isSubmitted)
    {
      this.fetchProduct();
    }

  }

  fetchProduct() {

    const prodId = this.router.url.split('/')[2];

    this.networkSubscription = this.httpClient
      .get<any>(`https://e-com-be.herokuapp.com/product/${prodId}`)
      .subscribe((res) => {

        console.log(res);

        this.product = res;

      }, (err) => {
        console.log(err);
      });

  }

}
