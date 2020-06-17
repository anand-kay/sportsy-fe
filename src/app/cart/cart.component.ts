import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  networkSubscription: Subscription;

  authTokenOptions = {
    headers: new HttpHeaders({
      'x-auth': localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  cartItems;

  totalPrice = 0;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    this.fetchItems();

  }

  onRemoveClicked(prodid) {

    // console.log(prodid);

    this.networkSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/removecart', { prodid }, this.authTokenOptions)
      .subscribe((response) => {

        console.log('status', response.status);

        this.fetchItems();

      });

  }

  fetchItems() {

    this.networkSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getcart', this.authTokenOptions)
      .subscribe((response) => {

        // console.log(response.body);

        this.cartItems = response.body;

        this.cartItems.forEach((cartItem) => {

          this.totalPrice += cartItem.product.price;

        });

      });

  }

  onChange(value, prodid) {

    console.log(value, prodid);

    let newquantity = 1;

    switch (value) {
      case "one":
        newquantity = 1;
        break;
      case "two":
        newquantity = 2;
        break;
      case "three":
        newquantity = 3;
        break;
      case "four":
        newquantity = 4;
        break;
      case "five":
        newquantity = 5;
        break;
      default:
        newquantity = 1;
    }

    this.networkSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/editcart', { prodid, newquantity }, this.authTokenOptions)
      .subscribe((response) => {

        console.log(response);

      });

  }

  onPayClicked() {

    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_wUHlkqeY22BZc9ouCcTh49wV00ms2uFGI5',
      locale: 'auto',
      token: (token) => {
        console.log(token);

        this.networkSubscription = this.httpClient
          .post<any>('https://e-com-be.herokuapp.com/payment', { token: token.id }, this.authTokenOptions)
          .subscribe((response) => {

            console.log(response);

            let purchases = [];

            this.cartItems.forEach((cartItem) => {

              purchases.push({
                prodid: cartItem.product._id,
                price: cartItem.product.price,
                quantity: cartItem.quantity
              });

            });

            this.httpClient
              .post<any>('https://e-com-be.herokuapp.com/addpurchase', { purchases }, this.authTokenOptions)
              .subscribe((response) => {

                console.log(response);

                this.router.navigateByUrl('');

              });

          });

      }
    });

    handler.open({
      name: 'Sportsy',
      amount: this.totalPrice * 100
    });

  }

}
