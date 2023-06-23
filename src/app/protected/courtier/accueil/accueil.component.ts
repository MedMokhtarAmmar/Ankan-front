import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../core/models/User";
import {Project} from "../../../core/models/Project";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../core/services/authentification/token-storage.service";
import {UserService} from "../../../core/services/user.service";
import {ProjectService} from "../../../core/services/project.service";
import Auth from "@aws-amplify/auth";
import {AjoutUtilisateurComponent} from "../../../admin/users-management/ajout-utilisateur/ajout-utilisateur.component";
import {ConsultProjetCourtierComponent} from "./consult-projet-courtier/consult-projet-courtier.component";
import {MatDialog} from "@angular/material/dialog";
import {ModifierUtilisateurComponent} from "../../../admin/users-management/modifier-utilisateur/modifier-utilisateur.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styles: []
})
export class AccueilComponent implements OnInit {


  user: User;
  users: User[];
  projects: any[];
  projects2: any[];
  khraa: any[];
  clients: User [] = [];
  project: Project;
  list: any[];
  courtierID: string;
  clientID: string;
  test: any[];
  public selectedProject: Project;
  ProjectByUser: {};
  public page = 1;
  public perPage = 1;
  current: number = 0;
  end: number = 5;
  test2: Project[];
  total: number=0;

  @Output() membre = new EventEmitter();
  private status: string;


  constructor(public router: Router,
              public tokenStorage: TokenStorageService,
              public userService: UserService,
              public projectService: ProjectService,
              public dialog: MatDialog) {

    this.projects = [];
    this.projects2 = [];
    this.clients = [];
    this.user = new User();
    this.project = new Project();
    this.list = [];
    this.test2=[];
  }

  ngOnInit() {
    this.users = [];
    //  this.initialiseUser();
    // this.loadProjects();
    this.global();
  }

  global() {
    this.initialiseUser().then(() => {
      if(this.status == 'new'){
        this.router.navigate(['courtier/profil'])
      }
      this.loadProjects(this.courtierID)
    });

  }

  initialiseUser() {

    return new Promise<any>((resolve, reject) => {
      let email =localStorage.getItem('emailUser')
        this.userService.loadUserByEmail(email).then((data: any) => {
          this.user = data;
          this.courtierID = data.result[0].id;
          this.status = data.result[0].status;
          resolve(this.courtierID);
        });
        return this.courtierID;

    })
  }

  loadProjects(id: string) {
    this.projectService.getProjectsbyCourtierID(id).then(async (data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.clientID = data[i].clientID;
        this.userService.getUser(this.clientID).then((data: any) => {
          let user = new User();
          user = data;
          this.list[i] = data as User[];
        })
      }

      this.projects = data as Project[];

      for (let i = 0; i < data.length; i++) {
        type MyArrayType = Array<{ pro: Project }> ;
        const arr: MyArrayType = [
          {pro: this.projects[i]},]

        // let concatObj = Object.assign(this.list[i], this.projects[i])
        this.test2=this.projects;
        this.total= Math.ceil(this.projects.length/5)
        // console.log(arr)
      }
      this.projects2=this.test2.slice(this.current, this.end)

    })
  }

  initSelectedproject() {
    this.selectedProject = new Project();
  }

  openDialogConsulterProjet(projet: Project) {
    this.selectedProject = projet;

    const dialogRef = this.dialog.open(ConsultProjetCourtierComponent, {
      width: '800px',
      data: {project: this.selectedProject}

    }).afterClosed().subscribe(res => {
      this.ngOnInit();
      this.initSelectedproject();

    });

  }

  nextPage() {
    if (this.end < this.test2.length) {
      this.perPage++;
      this.current = this.current + 5;
      this.end = this.end + 5;

      console.log(this.end)

      this.projects2 = this.test2.slice(this.current, this.end)
    }

  }


  previousPage() {
    if (this.current >= 5) {
      this.perPage--;
      this.current = this.current - 5;
      this.end = this.end - 5;

      console.log(this.current)

      this.projects2 = this.test2.slice(this.current, this.end)
    }

  }
}
