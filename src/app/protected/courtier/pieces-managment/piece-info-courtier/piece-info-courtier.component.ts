import {Component, OnInit} from '@angular/core';
import {Piece} from "../../../../core/models/Piece";
import {Project} from "../../../../core/models/Project";
import {Categorie} from "../../../../core/models/Categorie";
import {ActivatedRoute} from "@angular/router";
import {PieceService} from "../../../../core/services/piece.service";
import {ProjectService} from "../../../../core/services/project.service";
import {CategorieService} from "../../../../core/services/categorie.service";
import {DocumentService} from "../../../../core/services/document.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../../../core/models/User";
import {ConfirmationComponenetComponent} from "../../../../admin/users-management/confirmation-componenet/confirmation-componenet.component";
import {ConfirmerValidationModalComponent} from "../confirmer-validation-modal/confirmer-validation-modal.component";
import {Document} from "../../../../core/models/Document";
import {Storage} from "aws-amplify";
import {FileS3} from "../../../../core/models/FileS3";
import {UserService} from "../../../../core/services/user.service";
import {async} from "@angular/core/testing";
import {DocumentInfoComponent} from "../../../client/pieces-managment/document-info/document-info.component";
import {DocumentInfoCourtierComponent} from "../document-info/document-info.component";

@Component({
  selector: 'app-piece-info-courtier',
  templateUrl: './piece-info-courtier.component.html',
  styleUrls: ['./piece-info-courtier.component.scss']
})
export class PieceInfoCourtierComponent implements OnInit {

  idPiece: string;
  idProject: string;
  idCategorie: string;
  piece: Piece;
  project: Project;
  categorie: Categorie;
  documents: Document[];
  selectedPiece: Piece;
  selectedDocuments: Document[];
  type: string = 'piece';
  fileURL: any[];
  file: FileS3;
  idClient: string;
  username: string;
  model: String | Object;
  selecteddocument: Document;
  newDocument: Document;


  constructor(private  route: ActivatedRoute,
              private pieceService: PieceService,
              private  projectService: ProjectService,
              private categorieService: CategorieService,
              private  documentService: DocumentService,
              public dialog: MatDialog,
              private userService: UserService) {
    this.idPiece = route.snapshot.params.id;
    this.documents = [];
    this.fileURL = [];
    this.newDocument = new Document();
  }

  ngOnInit(): void {
    this.global()
  }

  global() {
    this.getDetailsPieces().then(() => {
      this.getProjectPiece(this.idProject);
      this.getCategorie(this.idCategorie);


    }).then(() => {
      this.getModel(this.piece.modelPiece);

    })
  }

  getDetailsPieces() {
    return new Promise<any>((resolve, reject) => {

      this.pieceService.getPiece(this.idPiece).subscribe((data: any) => {
        this.piece = data.result;
        this.idCategorie = this.piece.categorieID;
        this.idProject = this.piece.projetID;

        resolve(this.piece)
      })
      return this.piece;
    })

  }

  getModel(modelPath: string) {

    Storage.get(modelPath,
      {
        level: 'public'
      }).then((data) => {
      this.model = data

    }).catch(e => {
      console.log(e, 'error fetching image')
    });

  }

  getProjectPiece(id: string) {
    return new Promise<any>((resolve, reject) => {
      this.projectService.getProjectById(id).then((data: any) => {
        this.project = data.result;
        // this.idClient = this.project.clientID;
        this.getClient(this.idClient)
        this.getDocumentofPiece2(this.idPiece)

        resolve(this.idClient)

      })
      return (this.idClient)
    })
  }

  getCategorie(id: string) {
    this.categorieService.getCategorie(id).subscribe((data: any) => {
      this.categorie = data.result
    })
  }


  getDocumentOfPiece(id: string) {
    this.documentService.getDocumentByPieceID(id).then((data: any) => {
      this.documents = data.result


    })
  }

  OpenDialogConfirmation(piece: Piece, document: Document[]) {
    this.selectedPiece = piece;
    this.selectedDocuments = document
    const dialogRef = this.dialog.open(ConfirmerValidationModalComponent, {
      width: '750px',
      data: {
        piece: this.selectedPiece,
        documents: this.selectedDocuments
      }

    }).afterClosed().subscribe(res => {
      this.global();

    });
  }

  async getDocumentofPiece2(id: string) {


    this.documentService.getDocumentByPieceID(id).then((data: any) => {
      this.documents = data.result

      for (let i = 0; i < this.documents.length; i++) {
        console.log(this.username + '/' + this.documents[i].documentPath)
        Storage.get(this.username + '/' + this.documents[i].documentPath,
          {
            level: 'public'
          }).then((data) => {
          this.fileURL[i] = [new FileS3(data, this.documents[i].documentTitle, this.documents[i].extension)];
        }).catch(e => {
          console.log(e, 'error fetching image')
        })

      }
      //console.log(this.fileURL);
    })

  }

  getClient(id: string) {
    return new Promise<any>((resolve, reject) => {

      this.userService.getUser(id).then((data: any) => {
        this.username = data.result.username;
        resolve(this.username)
      })
      return this.username
    })
  }


  openDialogDetailsDocumentCourtier(document: Document) {
    this.selecteddocument = document;

    const dialogRef = this.dialog.open(DocumentInfoCourtierComponent, {
      width: '800px',
      height: '800px',

      data: {document: this.selecteddocument}

    }).afterClosed().subscribe(res => {
      this.initSelectedDocument();
      // this.getDocumentOfPiece(this.idPiece);
    });

  }

  initSelectedDocument() {
    this.selecteddocument = new Document();
  }


  confirmerDocument(document: Document, confirm: boolean) {
    if (confirm === true) {
      this.newDocument.documentTitle = document.documentTitle;
      this.newDocument.uploaderID = document.uploaderID;
      this.newDocument.documentPath = document.documentPath;
      this.newDocument.documentDescription = document.documentDescription;
      this.newDocument.pieceID = document.pieceID;
      this.newDocument.extension = document.extension;
      this.newDocument.documentStatus = "VERIFIED";
      this.documentService.modifierDocument(document.id, this.newDocument).then(() => {

        this.getDocumentofPiece2(document.pieceID)
      })

    } else {
      this.newDocument.documentTitle = document.documentTitle;
      this.newDocument.uploaderID = document.uploaderID;
      this.newDocument.documentPath = document.documentPath;
      this.newDocument.documentDescription = document.documentDescription;
      this.newDocument.pieceID = document.pieceID;
      this.newDocument.extension = document.extension;
      this.newDocument.documentStatus = "WAITING";
      this.documentService.modifierDocument(document.id, this.newDocument).then(() => {

        this.getDocumentofPiece2(document.pieceID)
      })

    }

  }

}
