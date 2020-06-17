import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-info',
  templateUrl: './right-info.component.html',
  styleUrls: ['./right-info.component.css']
})
export class RightInfoComponent implements OnInit, OnChanges {

  networkSubscription: Subscription;

  authTokenOptions = {
    headers: new HttpHeaders({
      'x-auth': localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  @ViewChild('quantity') quantity: ElementRef;

  @Input() product;

  doesExist = false;
  wishlistText = 'Add to wishlist';

  isDiscountZero = true;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    this.networkSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getwishlist', this.authTokenOptions)
      .subscribe((response) => {

        console.log(response);

        response.body.forEach((wishlistEntry) => {

          if (wishlistEntry.product._id == this.router.url.split('/')[2]) {
            this.doesExist = true;
          }

        });

        if (this.doesExist) {
          this.wishlistText = 'Remove from wishlist';
        }
        else {
          this.wishlistText = 'Add to wishlist';
        }

      });

  }

  ngOnChanges() {

    // console.log(this.product);

    if (this.product && 'discount' in this.product)
    {
      if (this.product.discount != 0)
      {
        this.isDiscountZero = false;
      }
      else
      {
        this.isDiscountZero = true;
      }

    }
    else
    {
      this.isDiscountZero = true;

    }

  }

  wishlistClicked() {

    if (this.doesExist) {
      this.networkSubscription = this.httpClient
        .post<any>('https://e-com-be.herokuapp.com/removewishlist', { prodid: this.router.url.split('/')[2] }, this.authTokenOptions)
        .subscribe((response) => {

          if (response.status == 200) {
            this.doesExist = false;

            this.wishlistText = 'Add to wishlist';
          }

        });

    }
    else {
      this.networkSubscription = this.httpClient
        .post<any>('https://e-com-be.herokuapp.com/addwishlist', { prodid: this.router.url.split('/')[2] }, this.authTokenOptions)
        .subscribe((response) => {

          if (response.status == 200) {
            this.doesExist = true;

            this.wishlistText = 'Remove from wishlist';
          }

        });

    }

  }

  calcPrice(discount, initialPrice) {

    if (discount == 0) {
      return initialPrice;
    }
    else {
      return (initialPrice - (initialPrice * (discount / 100)));
    }

  }

  isAuthenticated() {
    return localStorage.getItem('token') ? true : false;
  }

  onAddCartClicked() {

    let quantity = 1;

    switch (this.quantity.nativeElement.value) 
    {
      case "one":
        quantity = 1;
        break;
      case "two":
        quantity = 2;
        break;
      case "three":
        quantity = 3;
        break;
      case "four":
        quantity = 4;
        break;
      case "five":
        quantity = 5;
        break;
      default:
        quantity = 1;
    }

    this.networkSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/addcart', {
        prodid: this.router.url.split('/')[2],
        quantity: quantity
      }, this.authTokenOptions)
      .subscribe((response) => {
        
        this.router.navigateByUrl('cart');

      });

  }

}
