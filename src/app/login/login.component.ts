import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  networkSubscription: Subscription;

  @Output() loginCloseEvent = new EventEmitter<boolean>();
  @Output() authenticateLoginEvent = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  backdropClicked() {

    this.loginCloseEvent.emit(false);

  }

  onSubmit(form: NgForm) {

    this.networkSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/login', {
        email: form.value.email,
        password: form.value.password
      })
      .subscribe((res) => {

        localStorage.setItem('token', res.token);

        this.loginCloseEvent.emit(false);
        this.authenticateLoginEvent.emit(true);

        this.networkSubscription.unsubscribe();

      }, (err) => {

        alert('Login failed!');

        this.loginCloseEvent.emit(false);

      });

  }

}
