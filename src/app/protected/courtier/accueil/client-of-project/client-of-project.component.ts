import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../core/models/Project";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../core/models/User";

@Component({
  selector: 'app-client-of-project',
  templateUrl: './client-of-project.component.html',
  styleUrls: ['./client-of-project.component.scss']
})
export class ClientOfProjectComponent implements OnInit {

  @Input() project: Project;
  user: User;

  constructor(private userService: UserService) {
this.project=new Project();
    this.user = new User();

  }

  ngOnInit(): void {
    console.log("this.user")

    this.getUserPerProject().then(() => {
        console.log(this.user)

      }
    )
  }

  getUserPerProject() {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser(this.project.clientID[0]).then((data:any) => {
        this.user = data.result;
        resolve(this.user);
        return this.user;
      })
    })
  }
}
