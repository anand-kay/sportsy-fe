import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  networkSubscription: Subscription;

  authTokenOptions = {
    headers: new HttpHeaders({
      'x-auth': localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  wishlistItems;

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit() {

    scrollTo(0, 0);

    this.networkSubscription = this.httpClient
      .get<any>('https://e-com-be.herokuapp.com/getwishlist', this.authTokenOptions)
      .subscribe((response) => {

        console.log(response);

        this.wishlistItems = response.body;

      });

  }

  onItemClicked(wishlistItem) {

    this.router.navigateByUrl(`product/${wishlistItem.product._id}`);

  }

}
