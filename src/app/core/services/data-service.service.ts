import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private messageSource = new BehaviorSubject(true);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  HideShowSideBar(message: boolean){
    this.messageSource.next(message)


  }
}
