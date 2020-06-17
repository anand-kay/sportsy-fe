import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from "lodash";
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() sortBy;

  @Input() p;
  @Input() total;

  tempDefaultData;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

    this.data = this.dataService.data;

    this.tempDefaultData = _.cloneDeep(this.data);

  }

  ngOnChanges(changes: SimpleChanges) {

    // console.log(this.total);

    if (!('sortBy' in changes)) {
      this.data = this.dataService.data;
    }
    else {
      // if (!changes.sortBy.firstChange) {
        if (changes.sortBy.currentValue == 'default') {
          console.log('def');

          this.data = _.cloneDeep(this.tempDefaultData);

          // this.data = this.dataService.data;

        }
        else if (changes.sortBy.currentValue == 'highprice') {
          console.log('high price');
          // console.log(changes.sortBy);

          this.data.products.sort((a, b) => {

            if ((a.price - (a.price * (a.discount / 100))) < (b.price - (b.price * (b.discount / 100)))) {
              return 1;
            }
            else if ((a.price - (a.price * (a.discount / 100))) > (b.price - (b.price * (b.discount / 100)))) {
              return -1;
            }
            else {
              return 0;
            }

          });

        }
        else if (changes.sortBy.currentValue == 'lowprice') {
          console.log('low price');

          this.data.products.sort((a, b) => {

            if ((a.price - (a.price * (a.discount / 100))) > (b.price - (b.price * (b.discount / 100)))) {
              return 1;
            }
            else if ((a.price - (a.price * (a.discount / 100))) < (b.price - (b.price * (b.discount / 100)))) {
              return -1;
            }
            else {
              return 0;
            }

          });

        }
        else if (changes.sortBy.currentValue == 'highrating') {
          console.log('high rating');
          // console.log(this.data.products);

          this.data.products.sort((a, b) => {

            if (a.rating < b.rating) {
              return 1;
            }
            else if (a.rating > b.rating) {
              return -1;
            }
            else {
              return 0;
            }

          });

        }
        else if (changes.sortBy.currentValue == 'lowrating') {
          console.log('low rating');

          this.data.products.sort((a, b) => {

            if (a.rating > b.rating) {
              return 1;
            }
            else if (a.rating < b.rating) {
              return -1;
            }
            else {
              return 0;
            }

          });

        }

      // }

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

  onProductClicked(clickedId) {

    // console.log(clickedId);

    this.router.navigateByUrl(`product/${clickedId}`);

  }

}
