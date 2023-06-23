import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {AppInfoService} from '../core/services/app-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './public.component.html',
  styles: []
})
export class PublicComponent implements OnInit {

  version: string;

  constructor(private userService: UserService, private appInfoService: AppInfoService) {
  }

  ngOnInit() {
    this.getVersion();

  }

  getVersion() {
    this.appInfoService.getCurrentVersion().then((data: any) => {
      this.version = data.version;
    });
  }



}
