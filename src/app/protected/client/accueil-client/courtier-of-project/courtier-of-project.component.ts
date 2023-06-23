import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../core/models/Project';
import {User} from '../../../../core/models/User';
import {UserService} from '../../../../core/services/user.service';

@Component({
  selector: 'app-courtier-of-project',
  templateUrl: './courtier-of-project.component.html',
  styleUrls: ['./courtier-of-project.component.scss']
})
export class CourtierOfProjectComponent implements OnInit {

  @Input() project: Project;
  user: User;

  constructor(private userService: UserService) {
    this.project = new Project();
    this.user = new User();

  }

  ngOnInit(): void {
    this.getUserPerProject().then(() => {
      }
    );
  }

  getUserPerProject() {
    return new Promise<any>((resolve, reject) => {
      this.userService.getUser(this.project.courtierID).then((data: any) => {
        this.user = data.result;
        resolve(this.user);
        return this.user;
      });
    });
  }

}
