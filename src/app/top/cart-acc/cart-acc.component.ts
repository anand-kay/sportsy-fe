import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-acc',
  templateUrl: './cart-acc.component.html',
  styleUrls: ['./cart-acc.component.css']
})
export class CartAccComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAccountClicked() {

    this.router.navigateByUrl('user');

  }

  onCartClicked() {

    this.router.navigateByUrl('cart');

  }

}
