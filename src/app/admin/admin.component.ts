import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {LoadStylesAndScripts} from '../core/services/loadStylesAndScripts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
  , encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit , OnDestroy {

  constructor(public loadStylesAndScripts: LoadStylesAndScripts) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }


}
