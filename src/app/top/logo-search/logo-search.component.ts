import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-search',
  templateUrl: './logo-search.component.html',
  styleUrls: ['./logo-search.component.css']
})
export class LogoSearchComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;

  searchText;

  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearchSubmit() {
    this.searchEvent.emit(this.searchText);

    this.searchInput.nativeElement.blur();

  }

  onLogoClicked() {
    this.router.navigateByUrl('');

    this.searchInput.nativeElement.value = '';
  }

}
