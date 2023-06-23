import {Component, Input, OnInit} from '@angular/core';
import {DataServiceService} from "../../../core/services/data-service.service";

@Component({
  selector: 'app-sidebar-courtier',
  templateUrl: './sidebar-courtier.component.html',
  styles: []
})
export class SidebarCourtierComponent implements OnInit {
  statusProjet: boolean;
  statusPiece: boolean;
  statusList: boolean;
  status: boolean = false;
  show: boolean;

  @Input() event: Event;

  constructor(private dataService: DataServiceService) {
    this.statusProjet = false;
    this.statusList = false;

  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe((m) => {
      this.show = m;
    })

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
      this.statusList = false

    } else if (input === "project") {
      this.statusProjet = !this.statusProjet;
      this.status = false;
      this.statusPiece = false;
      this.statusList = false

    } else if (input === "piece") {
      this.statusPiece = !this.statusPiece;
      this.statusProjet = false;
      this.status = false;
      this.statusList = false

    } else if (input === "list") {
      this.statusList = !this.statusList;
      this.statusProjet = false;
      this.status = false;
      this.statusPiece = false
    }
  }


}
