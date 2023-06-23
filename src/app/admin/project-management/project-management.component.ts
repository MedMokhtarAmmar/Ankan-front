import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../core/services/project.service";
import {Project} from "../../core/models/Project";
import {UserService} from "../../core/services/user.service";
import {User} from "../../core/models/User";
import {Piece} from "../../core/models/Piece";
import {ModifierUtilisateurComponent} from "../users-management/modifier-utilisateur/modifier-utilisateur.component";
import {MatDialog} from "@angular/material/dialog";
import {PieceService} from "../../core/services/piece.service";
import {RequiredPiecesComponent} from "./required-pieces/required-pieces.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  public page = 1;
  public perPage = 5;
  public maxPage: number;
  public projects: Project[];
  public user: User;
  public suivant: boolean;
  public selectedProject: Project;
  public project: Project;

  constructor(public dialog: MatDialog, private projectservice: ProjectService,
              private userservice: UserService, private pieceservice: PieceService,private router:Router) {
    this.selectedProject = new Project();
  }

  ngOnInit(): void {
    this.listProjects(this.page, this.perPage);
  }

  listProjects(page: number, perPage: number) {
    this.projectservice.getProject(page, perPage).subscribe((data: any) => {
      this.projects = data;
    }, error => {
    }, () => {
      if (this.projects.length === this.perPage) {
        this.suivant = true;
      } else {
        this.suivant = false;
      }
      console.log(this.projects)
    })
  }

  getuser(clientID: string) {
    this.userservice.getUser(clientID).then((data: any) => {
      this.user = data;
      console.log(data);
    })
  }

  firstPage() {
    this.listProjects(1, this.perPage);
    if (this.projects.length === this.perPage) {
      this.suivant = true;
    } else {
      this.suivant = false;
    }
    this.page = 1;
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.listProjects(this.page, this.perPage);
    } else {
    }
  }

  nextPage() {
    if (this.suivant) {
      this.page = this.page + 1;
      this.listProjects(this.page, this.perPage);
    }
  }

  optionOne() {
    this.perPage = 5;
    this.page = 1;
    this.listProjects(this.page, 5);

  }

  optionTwo() {
    this.perPage = 10;
    this.page = 1;
    this.listProjects(this.page, 10);

  }

  optionThree() {
    this.perPage = 20;
    this.page = 1;
    this.listProjects(this.page, 20);

  }

  openDialogShowPieces(project: Project) {

    this.selectedProject = project;

    const dialogRef = this.dialog.open(RequiredPiecesComponent, {
        width: '800px',
        data: {project: this.selectedProject},
      }
    );
  }

  changepage(id: any) {
    this.router.navigate(['/admin/piecesManagement/' + id])
  }


}

