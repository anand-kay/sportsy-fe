import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-btn',
  templateUrl: './auth-btn.component.html',
  styleUrls: ['./auth-btn.component.css']
})
export class AuthBtnComponent implements OnInit {

  @Output() modalOpenEvent = new EventEmitter<boolean>();
  @Output() loginOpenEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onRegisterClicked() {
    
    this.modalOpenEvent.emit(true);

  }

  onLoginClicked() {

    this.loginOpenEvent.emit(true);

  }

}
