import { Component, OnInit, AfterViewChecked, DoCheck, OnChanges, AfterContentChecked, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { DataService } from '../services/data.service';
import { UpdateService } from '../services/update.service';
import { HttpClient } from '@angular/common/http';
import { ReqinfoService } from '../services/reqinfo.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  networkSubscription;

  @ViewChild('sortselect') sortSelect: ElementRef;

  data;
  title;

  p: number = 1;
  total: number;
  loading: boolean;

  sort = 'default';

  constructor(
    private httpClient: HttpClient,
    private dataService: DataService,
    private updateService: UpdateService,
    private reqinfoService: ReqinfoService
  ) { }

  ngOnInit() {

    this.setData(this.dataService.data);

    this.updateService.currentUpdate.subscribe((updateBool) => {

      if (updateBool) {
        this.setData(this.dataService.data);

        this.sortSelect.nativeElement.value = 'default';
      }

    });

  }

  setData(data) {

    // console.log(data);

    this.data = data;
    this.title = this.dataService.title;

    this.total = this.dataService.data.count;

    // this.sort = 'default';

  }

  onSortChange(val) {

    this.sort = val;

    // if (val == 'default')
    // {

    // }
    // else if (val == 'highprice')
    // {

    // }
    // else if (val == 'lowprice')
    // {

    // }
    // else if (val == 'highrating')
    // {

    // }
    // else if (val == 'lowrating')
    // {

    // }

  }

  getPage(page: number) {

    let url;

    if (this.reqinfoService.reqInfo == 'search')
    {
      url = `https://e-com-be.herokuapp.com/getsearch?q=${this.dataService.title}&page=${page}`;
    }
    else if (this.reqinfoService.reqInfo == 'category')
    {
      url = `https://e-com-be.herokuapp.com/getcategory?cat=${this.dataService.title}&page=${page}`;
    }
    else if (this.reqinfoService.reqInfo == 'subcategory')
    {
      url = `https://e-com-be.herokuapp.com/getsubcategory?subcat=${this.dataService.title}&page=${page}`;
    }

    this.loading = true;

    this.networkSubscription = this.httpClient
      .get<any>(url)
      .subscribe((res) => {

        // console.log(res.count);

        this.reqinfoService.page = page;

        this.dataService.data = res;

        this.total = res.count;
        this.p = page;
        this.loading = false;

        this.sortSelect.nativeElement.value = 'default';

      });

  }

}
