import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogoSearchComponent } from './top/logo-search/logo-search.component';
import { AuthBtnComponent } from './top/auth-btn/auth-btn.component';
import { CartAccComponent } from './top/cart-acc/cart-acc.component';
import { NavComponent } from './top/nav/nav.component';
import { HomeItemsComponent } from './home/home-items/home-items.component';
import { DataService } from './services/data.service';
import { UpdateService } from './services/update.service';
import { ResultsComponent } from './results/results.component';
import { ProductListComponent } from './results/product-list/product-list.component';
import { ReqinfoService } from './services/reqinfo.service';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { RightInfoComponent } from './product-display/right-info/right-info.component';
import { ReviewsComponent } from './product-display/reviews/reviews.component';
import { RecommendationsComponent } from './product-display/recommendations/recommendations.component';
import { SignupComponent } from './signup/signup.component';
import { ModalService } from './services/modal.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogoSearchComponent,
    AuthBtnComponent,
    CartAccComponent,
    NavComponent,
    HomeItemsComponent,
    ResultsComponent,
    ProductListComponent,
    ProductDisplayComponent,
    RightInfoComponent,
    ReviewsComponent,
    RecommendationsComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    WishlistComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }, DataService, UpdateService, ReqinfoService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
