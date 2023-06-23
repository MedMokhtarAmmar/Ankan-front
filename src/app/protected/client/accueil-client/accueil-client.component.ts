import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../../../core/services/project.service';
import {TokenStorageService} from '../../../core/services/authentification/token-storage.service';
import {User} from '../../../core/models/User';
import {Project} from '../../../core/models/Project';
import {UserService} from '../../../core/services/user.service';
import {ModalJwtComponent} from './modal-jwt/modal-jwt.component';
import {MatDialog} from '@angular/material/dialog';
import Auth from "@aws-amplify/auth";
import {Storage} from 'aws-amplify';
import {strict} from "assert";
import {Piece} from "../../../core/models/Piece";


@Component({
  selector: 'app-accueil-client',
  templateUrl: './accueil-client.component.html',
  styles: []
})
export class AccueilClientComponent implements OnInit {

  clientID: string;
  courtierID: string;

  user: User;
  users: User[];
  projects: Project[];
  projects2: Project[];
  courtiers: User [] = [];
  project: Project;
  list: any[] = [];
  role: string = '';

  public page = 1;
  public perPage = 1;
  current: number = 0;
  end: number = 5;
  test: Project[];
  total: number = 0;

  @Output() membre = new EventEmitter();


  constructor(public router: Router,
              public tokenStorage: TokenStorageService,
              public userService: UserService,
              public projectService: ProjectService,
              public dialog: MatDialog) {

    this.projects = [];
    this.projects2 = [];
    this.courtiers = [];
    this.user = new User();
    this.project = new Project();
    this.test = [];

  }

  ngOnInit() {

    this.role = this.tokenStorage.getAuthorities();
    this.global();
    //console.log(this.projects)
    this.tokenStorage.getAuthorities()
  }

  openDialogJwtToken() {
    const dialogRef = this.dialog.open(ModalJwtComponent, {
      width: '750px',
      data: {token: this.tokenStorage.getToken()}
    });
  }

  global() {
    this.initialiseUser().then(() => {
      this.loadProjects(this.clientID)
    });

  }


  initialiseUser() {

    return new Promise<any>((resolve, reject) => {
      let email = localStorage.getItem('emailUser')

      this.userService.loadUserByEmail(email).then((data: any) => {
        this.user = data;
        this.clientID = data.result[0].id;
        localStorage.setItem('id', this.clientID);

        resolve(this.clientID);

      });
      return this.clientID;

    })
  }


  loadProjects(id: string) {
    this.projectService.getProjectsbyClientID(id).then(async (data: any) => {
      for (let i = 0; i < data.result.length; i++) {
        this.courtierID = data.result[i].courtierID;
        this.userService.getUser(this.courtierID).then((data: any) => {
          let user = new User();
          user = data.result;
          this.list[i] = data.result as User[];
        })
      }

      this.projects = data.result as Project[];
      console.log(this.projects)
      console.log(this.list)
      for (let i = 0; i < data.result.length; i++) {
        type MyArrayType = Array<{ pro: Project }> ;
        const arr: MyArrayType = [
          {pro: this.projects[i]},]

        // let concatObj = Object.assign(this.list[i], this.projects[i])
        // console.log(arr)
        this.test = this.projects;
        this.total = Math.ceil(this.projects.length / 5)

      }
      this.projects2 = this.test.slice(this.current, this.end)

    })
  }


  navigate(id: string) {
    this.router.navigate(['/client/project-info', id])
  }



  nextPage() {
    if (this.end < this.test.length) {
      this.perPage++;
      this.current = this.current + 5;
      this.end = this.end + 5;

      console.log(this.end)

      this.projects2 = this.test.slice(this.current, this.end)
    }

  }


  previousPage() {
    if (this.current >= 5) {
      this.perPage--;
      this.current = this.current - 5;
      this.end = this.end - 5;

      console.log(this.current)

      this.projects2 = this.test.slice(this.current, this.end)
    }

  }




}
