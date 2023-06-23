import {Component, OnInit, Output} from '@angular/core';
import {DataServiceService} from "../../../core/services/data-service.service";

@Component({
  selector: 'app-sidebar-client',
  templateUrl: './sidebar-client.component.html',
  styles: [],

})
export class SidebarClientComponent implements OnInit {

  statusProjet: boolean;
  statusPiece: boolean;
  status: boolean = false;
  show: boolean;

  constructor(private dataService: DataServiceService) {
    this.statusProjet = false;

  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe((m) => {
      this.show = m;
    });
    console.log(this.statusProjet)
  }

  setstatusProjet() {
    this.statusProjet = this.statusProjet != true;

    console.log(this.statusProjet)
  }

  clickEvent(input: string) {
    if (input === "partner") {
      this.status = !this.status;
      this.statusProjet = false;
      this.statusPiece = false;
    } else if (input === "project") {
      this.statusProjet = !this.statusProjet;
      this.status = false;
      this.statusPiece = false;
    } else if (input === "piece") {
      this.statusPiece = !this.statusPiece;
      this.statusProjet = false;
      this.status = false;

    }
  }


}
