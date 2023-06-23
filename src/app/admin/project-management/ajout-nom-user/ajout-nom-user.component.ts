import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/User";
import {Project} from "../../../core/models/Project";

@Component({
  selector: 'app-ajout-nom-user',
  templateUrl: './ajout-nom-user.component.html',
  styleUrls: ['./ajout-nom-user.component.scss']
})
export class AjoutNomUserComponent implements OnInit {

  @Input() project: Project;
  public user:User;
  public courtier:User;

  constructor(private userservice: UserService) {
    this.project = new Project();
    this.user = new User();

  }

  ngOnInit(): void {
    console.log(this.project.clientID)
    this.getuser();
  }

  getuser(){
    // this.userservice.getUser(this.project.clientID).then((data: any)=> {
    //   this.user= data.result;
    //   console.log(data);
    // })
  }


}

