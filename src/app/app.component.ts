import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { DataService } from './services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UpdateService } from './services/update.service';
import { ReqinfoService } from './services/reqinfo.service';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;  // TODO: Replace with actual check

  networkSubscription: Subscription;

  isModalOpen = false;
  isLoginOpen = false;

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService,
    private updateService: UpdateService,
    private reqinfoService: ReqinfoService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {

    this.modalService.isModalOpen = false;

    if ( ! localStorage.getItem('token') )
    {
      this.isAuthenticated = false;
    }
    else
    {
      this.isAuthenticated = true;
    }

  }

  searchSubmit(searchText) {

    if (searchText != '' && searchText) {
      this.networkSubscription = this.httpClient
        .get<any>(`https://e-com-be.herokuapp.com/getsearch?q=${searchText}`)
        .subscribe((res) => {

          // console.log(searchText);

          this.reqinfoService.reqInfo = 'search';
          this.reqinfoService.page = 1;

          this.dataService.data = res;
          this.dataService.title = searchText;

          if (this.router.url == '/results') {
            this.updateService.changeUpdate(true);
          }
          else {
            this.router.navigateByUrl('/results');
          }

        });

    }

  }

  categoryClicked(categoryText) {

    this.networkSubscription = this.httpClient
      .get<any>(`https://e-com-be.herokuapp.com/getcategory?cat=${categoryText}`)
      .subscribe((res) => {

        this.reqinfoService.reqInfo = 'category';
        this.reqinfoService.page = 1;

        this.dataService.data = res;
        this.dataService.title = categoryText;

        if (this.router.url == '/results') {
          this.updateService.changeUpdate(true);
        }
        else {
          this.router.navigateByUrl('/results');
        }

      });

  }

  subcategoryClicked(subcategoryText) {

    this.networkSubscription = this.httpClient
      .get<any>(`https://e-com-be.herokuapp.com/getsubcategory?subcat=${subcategoryText}`)
      .subscribe((res) => {

        this.reqinfoService.reqInfo = 'subcategory';
        this.reqinfoService.page = 1;

        this.dataService.data = res;
        this.dataService.title = subcategoryText;

        if (this.router.url == '/results') {
          this.updateService.changeUpdate(true);
        }
        else {
          this.router.navigateByUrl('/results');
        }

      });

  }

  onModalOpen(isModalOpen) {

    if (isModalOpen)
    {
      this.isModalOpen = true;
    }

  }

  onModalClose(isModalOpen) {

    if (! isModalOpen)
    {
      this.isModalOpen = false;
    }

  }

  onLoginOpen(isLoginOpen) {

    if (isLoginOpen)
    {
      this.isLoginOpen = true;
    }

  }

  onLoginClose(isLoginOpen) {

    if (! isLoginOpen)
    {
      this.isLoginOpen = false;
    }

  }

  onAuthenticateEvent(isAuthenticated) {

    if (isAuthenticated) 
    {
      this.isAuthenticated = true;
    }

  }

}
