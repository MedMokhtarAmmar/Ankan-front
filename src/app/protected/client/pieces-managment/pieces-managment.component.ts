import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {PieceService} from '../../../core/services/piece.service';
import {Piece} from '../../../core/models/Piece';
import {ProjectService} from "../../../core/services/project.service";
import {AjoutDocumentComponent} from "../afficher-details-projet/ajout-document/ajout-document.component";
import Auth from "@aws-amplify/auth";
import {Project} from "../../../core/models/Project";
import {UserService} from "../../../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pieces-managment',
  templateUrl: './pieces-managment.component.html',
  styleUrls: ['./pieces-managment.component.scss']
})
export class PiecesManagmentComponent implements OnInit {

  public pieces: Piece[];
  public page = 1;
  public perPage = 1;
  public maxPage: number;
  current: number = 0;
  end: number = 5;
  test: Piece[];

  public precedent: boolean;
  public suivant: boolean;

  public selectedPiece: Piece;
  selecteddocument: Document;
  myProjects: Project[];
  ProjectsID: string[];
  allPieces: Piece[];
  allPieces2: Piece[];
  newClientProjects: Project[];
  updatedProject: Project;
  private status: string;

  constructor(private toastrService: ToastrService,
              public userService: UserService,
              private pieceService: PieceService,
              private projectService: ProjectService,
              public router: Router,) {
    this.pieces = [];
    this.selectedPiece = new Piece();
    this.myProjects = [];
    this.ProjectsID = [];
    this.allPieces = [];
    this.allPieces2 = [];
    this.test = [];
    this.newClientProjects = [];
    this.updatedProject = new Project();

  }

  ngOnInit(): void {
    this.initialiseUser();
    this.global(localStorage.getItem('id'))

  }
  initialiseUser() {

    return new Promise<any>((resolve, reject) => {
      let email =localStorage.getItem('emailUser')
      this.userService.loadUserByEmail(email).then((data: any) => {
        this.status = data.result[0].status;
        if(this.status=='new'){
          this.router.navigate(['client/profil'])
        }
        resolve(this.status);
      });
      return this.status;

    })

  }
  global(id: string) {
    this.checkProjects().then(() => {
      this.listMyProject(id).then(() => {
        this.listMyPiece()

      })
    })

  }


  listMyProject(id: string) {
    return new Promise(resolve => {
      this.projectService.getProjectsbyClientID(id).then((data: any) => {
        this.myProjects = data.result;
        for (let i = 0; i < this.myProjects.length; i++) {
          this.ProjectsID[i] = this.myProjects[i].id
        }

        resolve(this.ProjectsID)
      });
      return this.ProjectsID
    })
  }

  listMyPiece() {
    for (let i = 0; i < this.ProjectsID.length; i++) {
      this.pieceService.getPiecesbyClientMailProjectID(localStorage.getItem('emailUser'),this.ProjectsID[i]).subscribe((data: any) => {
        this.pieces = data.result;
        for (let j = 0; j < this.pieces.length; j++) {
          this.allPieces.push(this.pieces[j])
        }
        this.allPieces.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
        this.test = this.allPieces;
        this.page = Math.ceil(this.test.length / 5);
        this.allPieces2 = this.test.slice(this.current, this.end);
      })
      // console.log(this.pieces)
    }


  }


  initSelectedUser() {
    this.selectedPiece = new Piece();
  }

  nextPage() {
    if (this.end < this.test.length) {
      this.perPage++;
      this.current = this.current + 5;
      this.end = this.end + 5;


      this.allPieces2 = this.test.slice(this.current, this.end)
    }

  }


  previousPage() {
    if (this.current >= 5) {
      this.perPage--;
      this.current = this.current - 5;
      this.end = this.end - 5;

      console.log(this.current)

      this.allPieces2 = this.test.slice(this.current, this.end)
    }

  }

  checkProjects() {
    return new Promise(resolve => {

      this.projectService.getProjectsbyClientEmail(localStorage.getItem('emailUser')).then((data: any) => {
        this.newClientProjects = data;
        console.log(this.newClientProjects);

        for (let i = 0; i < this.newClientProjects.length; i++) {
          if( ! this.newClientProjects[i].clientID.includes(localStorage.getItem('id')) ){
          this.updatedProject.projectName = this.newClientProjects[i].projectName;
          this.updatedProject.clientEmail = this.newClientProjects[i].clientEmail;
          this.updatedProject.courtierID = this.newClientProjects[i].courtierID;
          this.updatedProject.lastConsultationDay = this.newClientProjects[i].lastConsultationDay;
          this.updatedProject.status = this.newClientProjects[i].status;
          this.updatedProject.clientID = this.newClientProjects[i].clientID.concat([localStorage.getItem('id')]);
          this.projectService.modifierProject(this.newClientProjects[i].id, this.updatedProject).then((data) => {
            console.log(data)
            console.log('project added')
          })
        }
        }
        resolve(this.updatedProject)
      })
    })
  }


}
