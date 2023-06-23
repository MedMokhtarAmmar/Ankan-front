import { Component, OnInit } from '@angular/core';
import { navItems } from './../nav';

@Component({
  selector: 'app-sidebar-project',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( ) { }

  public sidebarMinimized = false;
  public navItems = navItems;


  ngOnInit(): void {
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

}
