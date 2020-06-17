import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UpdateService {

  private updateSource = new BehaviorSubject(false);
  currentUpdate = this.updateSource.asObservable();

  constructor() { }

  changeUpdate(updateBool: boolean) {
    this.updateSource.next(updateBool);

  }

}