import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  networkSubscription: Subscription;
  purchaseSubscription: Subscription;
  addressSubscription: Subscription;

  authTokenOptions = {
    headers: new HttpHeaders({
      'x-auth': localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  user;
  purchases;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    this.networkSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/user', this.authTokenOptions)
      .subscribe((response) => {
        
        console.log(response.body);

        this.user = response.body;

      });

    this.purchaseSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getpurchase', this.authTokenOptions)
      .subscribe((response) => {

        // console.log(response.body);

        this.purchases = response.body;

      });

  }

  purchaseItemClicked(prodId) {

    this.router.navigateByUrl(`product/${prodId}`);

    scrollTo(0, 0);

  }

  onSubmit(form: NgForm) {

    console.log(form.value);

    this.addressSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/setaddress', form.value, this.authTokenOptions)
      .subscribe((response) => {
        console.log(response);
      });

  }

  onWishlistClicked() {

    this.router.navigateByUrl('wishlist');

  }

  onCartClicked() {

    this.router.navigateByUrl('cart');
    
  }

  onLogoutClicked() {
    localStorage.removeItem('token');
  }

}
