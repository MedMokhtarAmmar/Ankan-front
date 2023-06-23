import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from "../../../../core/models/Project";
import {User} from "../../../../core/models/User";

@Component({
  selector: 'app-consult-projet-client',
  templateUrl: './consult-projet-client.component.html',
  styles: []
})
export class ConsultProjetClientComponent implements OnInit {


  @Input() project : Project;
  @Input() id : number;
  @Output() membre = new EventEmitter();

  constructor() {


  }

  ngOnInit() {
  }

  emitProject() {
    this.membre.emit(this.project);
  }


}
