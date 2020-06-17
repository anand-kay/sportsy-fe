import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  networkSubscription: Subscription;

  @Output() modalCloseEvent = new EventEmitter<boolean>();
  @Output() authenticateEvent = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  backdropClicked() {
    
    this.modalCloseEvent.emit(false);

  }

  onSubmit(form: NgForm) {

    this.networkSubscription = this.httpClient
      .post<any>('https://e-com-be.herokuapp.com/signup', {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name
      })
      .subscribe((res) => {

        localStorage.setItem('token', res.token);

        this.modalCloseEvent.emit(false);
        this.authenticateEvent.emit(true);

        this.networkSubscription.unsubscribe();

      }, (err) => {

        alert('Signup failed!');

        this.modalCloseEvent.emit(false);

      });

  }

}
