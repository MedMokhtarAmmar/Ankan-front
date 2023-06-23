import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../core/services/project.service";
import {Project} from "../../../core/models/Project";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/User";
import {PieceService} from "../../../core/services/piece.service";
import {Piece} from "../../../core/models/Piece";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DetailsPieceComponent} from "./details-piece/details-piece.component";
import {AjoutDocumentComponent} from "./ajout-document/ajout-document.component";
import {Storage} from "aws-amplify";
import {TokenStorageService} from "../../../core/services/authentification/token-storage.service";


@Component({
  selector: 'app-afficher-details-projet',
  templateUrl: './afficher-details-projet.component.html',
  styleUrls: ['./afficher-details-projet.component.scss']
})
export class AfficherDetailsProjetComponent implements OnInit {
  projectId: string;
  project: Project;
  courtierID: string;
  courtier: User;
  pieces: Piece[];
  projectForm: FormGroup;
  updatedProject: Project;
  selectedPiece: Piece;
  type: string = 'projet';
  listOfDocuments: any[];
  blob: Blob;
  role: string = '';
  private objectUrl: any;


  constructor(private  route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService, private pieceService: PieceService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.pieces = [];
    this.project = new Project();
    this.updatedProject = new Project();
    this.selectedPiece = new Piece();


  }

  ngOnInit(): void {

    this.role = this.tokenStorage.getAuthorities()
    this.projectId = this.route.snapshot.params.id;


    this.getProjectInfo().then(() => {
      this.courtierID = this.project.courtierID;
    }).then(() => {
      this.getCourtierInfo();

    }).finally(() => {
      this.updateLastConsultationDay();
    });
    this.listPieceProjets();

    this.listTest().then(() => {

      for (let i = 0; i < this.listOfDocuments.length; i++) {

        Storage.get(this.listOfDocuments[i].key,
          {}).then((result: any) => {


        }).then(() => {

        })
      }

    });
  }


  createForm() {

    this.projectForm = this.formBuilder.group({
      projectName: [this.project.projectName, Validators.required],
      status: [this.project.status, Validators.required],
      firstName: [this.courtier.firstName, ''],
      lastName: [this.courtier.lastName, ''],
      email: [this.courtier.email, ''],
      userPhone: [this.courtier.userPhone, Validators.required],
    })

  }

  getProjectInfo() {
    return new Promise<any>((resolve, reject) => {

      this.projectService.getProjectById(this.projectId).then((data: any) => {
        this.project = data.result;
        resolve(this.project);
      });
      return this.project;
    });
  }

  getCourtierInfo() {
    this.userService.getUser(this.courtierID).then((data: any) => {
      this.courtier = data.result;
      return this.courtier;
    });
  }


  listPieceProjets() {
    this.pieceService.getPiecesbyClientMailProjectID(localStorage.getItem('emailUser'),this.projectId).subscribe((data: any) => {
      this.pieces = data.result
    })
  }

  updateLastConsultationDay() {
    this.updatedProject.projectName = this.project.projectName;
    this.updatedProject.status = this.project.status;
    this.updatedProject.courtierID = this.project.courtierID;
    this.updatedProject.clientID = this.project.clientID;
    this.updatedProject.clientEmail=this.project.clientEmail;
    this.updatedProject.lastConsultationDay = Date.now().toString();

    this.projectService.modifierProject(this.projectId, this.updatedProject).then(() => {
      }
    )
  }


  openDialogDetailsPiece(piece: Piece) {
    this.selectedPiece = piece;

    const dialogRef = this.dialog.open(DetailsPieceComponent, {
      width: '800px',
      height: '800px',

      data: {piece: this.selectedPiece}

    }).afterClosed().subscribe(res => {
      this.initSelectedPiece();
      this.listPieceProjets();
    });

  }


  initSelectedPiece() {
    this.selectedPiece = new Piece();
  }


  openDialogAjoutDocument(piece: Piece) {
    this.selectedPiece = piece;

    const dialogRef = this.dialog.open(AjoutDocumentComponent, {
      width: '800px',
      height: '800px',

      data: {piece: this.selectedPiece}

    }).afterClosed().subscribe(res => {
      this.initSelectedPiece();
      this.listPieceProjets();
    });

  }

  listTest() {
    return new Promise<any>((resolve, reject) => {
      Storage.list('client.client/projet client', {
        level: 'public'
      }).then((data) => {
        console.log(data)
        this.listOfDocuments = data;
        resolve(this.listOfDocuments)
      }).catch(e => {
        console.log(e, 'error fetching image')
      });
      return this.listOfDocuments
    })
  }


  listDocument(username: string, projectName: string, pieceName: string, documentTitle: string, filename: string) {


    Storage.list(username + '/' + projectName + '/' + pieceName + '/' + documentTitle + '/' + filename, {
      level: 'public'
    }).then((data) => {
      console.log(data)

    }).catch(e => {
      console.log(e, 'error fetching image')
    });
  }

}
