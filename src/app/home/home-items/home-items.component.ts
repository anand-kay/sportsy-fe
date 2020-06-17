import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-items',
  templateUrl: './home-items.component.html',
  styleUrls: ['./home-items.component.css']
})
export class HomeItemsComponent implements OnInit {

  @Input() title;
  @Input() items;

  @ViewChild('itemsul', { read: ElementRef }) itemsUl: ElementRef<any>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  scrollRight() {
    this.itemsUl.nativeElement.scrollTo({
      left: (this.itemsUl.nativeElement.scrollLeft + this.itemsUl.nativeElement.clientWidth + 12),
      behavior: 'smooth'
    });
  }

  scrollLeft() {
    this.itemsUl.nativeElement.scrollTo({
      left: (this.itemsUl.nativeElement.scrollLeft - this.itemsUl.nativeElement.clientWidth - 12),
      behavior: 'smooth'
    });
  }

  onItemClicked(clickedId) {

    // console.log(clickedId);

    this.router.navigateByUrl(`product/${clickedId}`);

  }

}
