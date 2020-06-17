import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() categoryEvent = new EventEmitter<string>();
  @Output() subcategoryEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onCategoryClicked(cat) {
    this.categoryEvent.emit(cat);
  }

  onSubcategoryClicked(subcat) {
    this.subcategoryEvent.emit(subcat);

    // console.log(subcat);
  }

}
