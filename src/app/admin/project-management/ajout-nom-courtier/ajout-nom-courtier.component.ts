import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {Project} from "../../../core/models/Project";
import {User} from "../../../core/models/User";

@Component({
  selector: 'app-ajout-nom-courtier',
  templateUrl: './ajout-nom-courtier.component.html',
  styleUrls: ['./ajout-nom-courtier.component.scss']
})
export class AjoutNomCourtierComponent implements OnInit {
  @Input() project: Project;
  public courtier:User;


  constructor(private userservice: UserService) {
    this.project = new Project();
    this.courtier = new User();
  }

  ngOnInit(): void {
    this.getcourtier();
  }
  getcourtier(){
    this.userservice.getUser(this.project.courtierID).then((data: any)=> {
      this.courtier= data.result;
      console.log(data);
    })
  }

}
