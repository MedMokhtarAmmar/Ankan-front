import { Component } from '@angular/core';
import {Router} from "@angular/router";
import * as conf from '../config/config.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(private router: Router) {
  }
  ngOnInit(): void {
    localStorage.setItem("idTest" , conf.amplify.Auth.identityPoolId)
this.getBaseUrl()
  }
  getBaseUrl() {
    fetch('../../../config/config.json').then(res => {
      console.log(res)
      res.json().then((res) => {
        //console.log(res.apiUrl)
        localStorage.setItem('BASE_URL', res.apiUrl+'/');
      });
    });
  }

}
