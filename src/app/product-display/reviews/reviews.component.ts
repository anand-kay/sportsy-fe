import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit, OnChanges {

  networkSubscription: Subscription;

  authTokenOptions = {
    headers: new HttpHeaders({
      'x-auth': localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  @Input() product;

  // isReviewsVisible = true;

  showReviewModal = false;

  one = true;
  two = true;
  three = true;
  four = true;
  five = true;

  @Output() reviewSubmittedEvent = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    console.log(this.product);

  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(this.product);

  }

  onSubmit(form: NgForm) {

    let star = 5;

    if (this.five)
    {
      star = 5;
    }
    else if (this.four)
    {
      star = 4;
    }
    else if (this.three)
    {
      star = 3;
    }
    else if (this.two)
    {
      star = 2;
    }
    else if (this.one)
    {
      star = 1;
    }

    this.networkSubscription = this.httpClient
      .post<any>(`https://e-com-be.herokuapp.com/newreview?id=${this.router.url.split('/')[2]}`, {
        star: star,
        review: form.value.review
      }, this.authTokenOptions)
      .subscribe((response) => {

        console.log(response);

        this.showReviewModal = false;

        this.reviewSubmittedEvent.emit(true);

      }, (err) => {

        console.log('err');

        this.showReviewModal = false;

      });

  }

  isAuthenticated() {

    return localStorage.getItem('token') ? true : false;

  }

  writeReviewClicked() {
    this.showReviewModal = true;
  }

  backdropClicked() {
    this.showReviewModal = false;
  }

  onStarOne() {
    this.one = true;
    this.two = false;
    this.three = false;
    this.four = false;
    this.five = false;
  }

  onStarTwo() {
    this.one = true;
    this.two = true;
    this.three = false;
    this.four = false;
    this.five = false;
  }
  
  onStarThree() {
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = false;
    this.five = false;
  }

  onStarFour() {
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = true;
    this.five = false;
  }

  onStarFive() {
    this.one = true;
    this.two = true;
    this.three = true;
    this.four = true;
    this.five = true;
  }

}
